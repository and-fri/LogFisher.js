// SETTINGS (please configurate this file)

// ------------------------------------------------------
var config = {
        
        // the ADDRESS of your baywatch server
        HOST: 'localhost',
        // the PORT your baywatch server is listening for
        PORT: 3000,
        // the API router path
        PATH: '/api/logs/insert',
        // the X-Auth-Token
        AUTH_TOKEN: 'logs@baywatch007',
        // the FILES the log fisher should watch for...
        LOGS: [
                {
                  // System- / Log- tag for identification on Baywatch for parsing purposes
                  tag : 'Sidekiq',
                  // the path to this file
                  path : './tests/test_logs.log'
                },
                {
                  tag : 'Mediabutler',
                  path : './tests/test_logs2.log'
                }
              ]
};

// ------------------------------------------------------

module.exports = config;