import { HttpError } from "routing-controllers";
import { User } from "../interfaces/User";

function ValidateArgs() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: User[]) {

            if (args[1] && typeof args[1].user !== 'string') {
                throw new HttpError(400, 'User must be string');
            }

            if (args[1] && args[1].user.length < 2) {
                throw new HttpError(400, 'User name must be at least 2 characters long');
            }

            if (args[1] && typeof args[1].email !== 'string') {
                throw new HttpError(400, 'Email must be string');
            }

            if (args[1] && !args[1].email.includes('@')) {
                throw new HttpError(400, 'The email address must contain "@" symbol');
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

export { ValidateArgs };