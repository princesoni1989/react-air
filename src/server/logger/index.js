import winston from "winston";
import config from "./winston.config";

winston.emitErrs = true;

//initialize new logger object
var logger = new winston.Logger({
    level: 'silly',
    levels: config.defaults.levels,
    handleExceptions: true,
    transports: [
        new winston.transports.Console(config.env[process.env.NODE_ENV] || config.env.development)
    ],
    exitOnError: false
});

//add color property to object
winston.addColors(config.defaults.colors)

export default logger;
