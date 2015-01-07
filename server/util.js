module.exports = {
    env: {
        loggingIsVerbose: process.env.VERBOSE && process.env.VERBOSE !== 'false',
        serverPort: parseInt(process.env.PORT) || 80,
        sessionSecret: process.env.SESSION_SECRET || 'NO_SESSION_SECRET',
        dbConnString: process.env.DB || 'postgres://root:root@127.0.0.1:5432/tudev-site-prod',
        isResettingDb: process.env.RESET_DB || false
    }
}