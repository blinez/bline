
function getEnvVar(name: string): string {
    const envVar = process.env[`REACT_APP_${name}`];
    if (envVar === undefined) {
        throw new Error(`Missing environment variable '${name}'`);
    } else {
        return envVar;
    }
}

const env = {
    baseUrl: getEnvVar('BASE_URL')
};

export function getEnv() {
    return env;
}
