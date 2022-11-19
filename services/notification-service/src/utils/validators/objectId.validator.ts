import { ObjectId } from 'bson'
import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
} from 'class-validator';

export const IsMongoObjectId = (validationOptions?: ValidationOptions): Function => {
   return (object: Object, propertyName: string): void => {
        registerDecorator({
            constraints: [],
            name: 'IsMongoObjectId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any): boolean
                {
                    return ObjectId.isValid(value);
                },
                defaultMessage(argument: ValidationArguments): string
                {
                    return `${argument.property} is not a valid ObjectId`;
                },
            },
        });
   };
}
