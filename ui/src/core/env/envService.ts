function getEnvVar(name: string): string {
    const envVar: string | undefined = process.env[`REACT_APP_${name}`];
    if (envVar === undefined) {
        throw new Error(`Missing environment variable '${name}'`);
    } else {
        return envVar;
    }
}

const env: {baseUrl: string} = {
    baseUrl: getEnvVar('BASE_URL'),
};

export function getEnv(): {baseUrl: string} {
    return env;
}
