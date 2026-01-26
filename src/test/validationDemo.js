import { loginSchema, signinSchema, userIdSchema } from '../validators/userValidators.js';
import { newFreeGamesSchema } from '../validators/botCmdValidators.js';
import logger from '../utils/logger.js';

const runTests = () => {
    console.log('--- Testing Login Schema ---');
    const validLogin = { email: 'test@example.com', password: 'password123' };
    const invalidLogin = { email: 'notanemail', password: '' };

    console.log('Valid Login:', loginSchema.validate(validLogin).error ? 'FAIL' : 'PASS');
    console.log('Invalid Login:', loginSchema.validate(invalidLogin).error ? 'PASS (Expected Error)' : 'FAIL');

    console.log('\n--- Testing Signin Schema ---');
    const validSignin = { email: 'new@example.com', password: 'securepassword', name: 'John' };
    const invalidSignin = { email: 'test', password: '123' }; // Check password length

    console.log('Valid Signin:', signinSchema.validate(validSignin).error ? 'FAIL' : 'PASS');
    console.log('Invalid Signin:', signinSchema.validate(invalidSignin).error ? 'PASS (Expected Error)' : 'FAIL');

    console.log('\n--- Testing UserID Schema ---');
    const validId = { id: '507f1f77bcf86cd799439011' };
    const invalidId = { id: '12345' };

    console.log('Valid UserID:', userIdSchema.validate(validId).error ? 'FAIL' : 'PASS');
    console.log('Invalid UserID:', userIdSchema.validate(invalidId).error ? 'PASS (Expected Error)' : 'FAIL');

    console.log('\n--- Testing BotCmd Schema ---');
    const validCmd = { id: '12345' };
    const invalidCmd = { id: 12345 };

    console.log('Valid Cmd:', newFreeGamesSchema.validate(validCmd).error ? 'FAIL' : 'PASS');
};

runTests();
