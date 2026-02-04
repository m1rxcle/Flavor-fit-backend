import {
    ValidatorConstraint,
    type ValidationArguments,
    type ValidatorConstraintInterface,
} from 'class-validator';

import { NewPasswordInput } from '../inputs/new-password.input';

@ValidatorConstraint({ name: 'IsPasswordMatching', async: false })
export class IsPasswordMatching implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments): boolean {
        const object = args.object as NewPasswordInput;

        return object.newPassword === confirmPassword;
    }

    defaultMessage(): string {
        return 'Пароли не совпадают';
    }
}
