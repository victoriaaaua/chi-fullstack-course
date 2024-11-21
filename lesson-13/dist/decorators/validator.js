"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateArgs = ValidateArgs;
const routing_controllers_1 = require("routing-controllers");
function ValidateArgs() {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.log(args);
            if (typeof args[1].user !== 'string') {
                throw new routing_controllers_1.HttpError(400, 'User must be string');
            }
            if (args[1].user.length < 2) {
                throw new routing_controllers_1.HttpError(400, 'User name must be at least 2 characters long');
            }
            if (typeof args[1].email !== 'string') {
                throw new routing_controllers_1.HttpError(400, 'Email must be string');
            }
            if (!args[1].email.includes('@')) {
                throw new routing_controllers_1.HttpError(400, 'The email address must contain "@" symbol');
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
