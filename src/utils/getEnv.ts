const getEnv = (): string => {
    const isProd: boolean = process.env.NODE_ENV === "prod";

    return `${process.cwd()}/${isProd ? "prod" : "test"}.env`;
};

export default getEnv;