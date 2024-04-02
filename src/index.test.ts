import app from './index';
import testsRunning from "./utils/testsRunning";
import getEnv from "./utils/getEnv";

describe('app', () => {
    it('runs on test with test env', async () => {
        await app;
        expect(testsRunning()).toBe(true);
        expect(getEnv()).not.toBe("production");
    });
});
