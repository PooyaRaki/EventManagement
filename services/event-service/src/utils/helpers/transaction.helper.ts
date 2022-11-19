import { DataSource, QueryRunner } from 'typeorm';
import { SystemMessage } from '@utils/enums';
import { InternalServerErrorException } from '@utils/helpers/exceptions';

/**
 * Creates a database transaction
 *
 * @param  {DataSource} dataSource Data source object
 * @param  {Function} successCallback The function to try to execute
 * @param  {string} errorText? The text to return if an error ocurred
 *
 * @returns {Promise<T>} Returns the returned data from success callback
 */
export const Transaction = async <T>(
    dataSource: DataSource,
    successCallback: Function,
    errorText?: string,
): Promise<T> => {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        return await tryTransaction(queryRunner, successCallback);
    } catch (error: unknown) {
        throw await rollbackException(queryRunner, errorText);
    }
}

/**
 * Try block of a transaction
 *
 * @param  {QueryRunner} queryRunner Query runner
 * @param  {Function} successCallback Success Callback
 * 
 * @returns {Promise<T>} Returns the requested data
 */
const tryTransaction = async <T>(queryRunner: QueryRunner, successCallback: Function): Promise<T> => {
    const result = await successCallback(queryRunner.manager);

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return result;
}

/**
 * Rollbacks a transaction
 *
 * @param  {QueryRunner} queryRunner Query runner
 * @param  {string} errorText? Error text to be thrown in the error
 *
 * @returns {Promise<InternalServerErrorException>} Returns an error to be thrown
 */
const rollbackException = async (
    queryRunner: QueryRunner,
    errorText?: string,
): Promise<InternalServerErrorException> => {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();

    return new InternalServerErrorException(errorText ?? SystemMessage.UNKNOWN_ERROR);
}