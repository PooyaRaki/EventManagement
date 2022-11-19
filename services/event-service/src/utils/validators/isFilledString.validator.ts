import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
} from 'class-validator';

export const IsFilledString = (validationOptions?: ValidationOptions): Function => {
   return (object: Object, propertyName: string): void => {
        registerDecorator({
            constraints: [],
            name: 'IsFilledString',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any): boolean
                {
                    return value && value !== '';
                },
                defaultMessage(argument: ValidationArguments): string
                {
                    return `${argument.property} must not be empty`;
                },
            },
        });
   };
}