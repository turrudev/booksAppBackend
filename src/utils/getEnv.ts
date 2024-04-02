import testsRunning from "./testsRunning";

const getEnv = (): string => {
    const isProd: boolean = process.env.NODE_ENV === "production" && !testsRunning();

    return `${process.cwd()}/${isProd ? "production" : "test"}.env`;
};

export default getEnv;