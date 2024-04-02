const testsRunning = (): boolean => {
    return process.env.NODE_ENV === 'test';
};

export default testsRunning;