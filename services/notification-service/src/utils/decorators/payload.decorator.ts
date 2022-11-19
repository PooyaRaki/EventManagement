import { Payload } from '@nestjs/microservices';
import { applyDecorators } from '@nestjs/common'

/**
 * Returns data from microservice message
 *
 * @param  {string} property? Property name
 * 
 * @returns {<TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>)}
 */
export const MessagePayload: any = (property?: string): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void => {
    return applyDecorators(
        <PropertyDecorator> Payload(property ?? 'data'),
    );
}