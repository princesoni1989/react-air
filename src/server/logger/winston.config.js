const winstonConf = {};

function _define(config, name, value) {
    Object.defineProperty(config, name, {
        value: value,
        enumerable: true,
        writable: false,
        configurable: false
    });
}

_define(winstonConf, 'config', {
    defaults: {
        levels: {
          error: 0,
          warn: 1,
          info: 2,
          verbose: 3,
          debug: 4,
          data: 5,
          input: 6,
          prompt: 7,
          silly: 8,
          help: 9
        },
        colors: {
            debug: 'blue',
            info: 'green',
            help: 'cyan',
            warn: 'yellow',
            error: 'red',
            data: 'grey',
            input: 'grey',
            verbose: 'cyan',
            prompt: 'grey',
            silly: 'magenta'
        }
    },
    env: {
        production: {
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        },
        development: {
            level: 'debug',
            handleExceptions: false,
            json: false,
            colorize: true
        },
      test: {
        level: 'error',
        silent: true
      }
    }
});

export default winstonConf.config;
