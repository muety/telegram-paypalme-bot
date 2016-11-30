'use strict';

const Telegram = require('telegram-node-bot'),
    path = require('path'),
    store = require('./store'),
    constants = require('./constants'),
    tg = new Telegram.Telegram(constants.TOKEN, {
        workers: 1
    });

const InlineModeController = require('./controllers/inline_mode')
    , OtherwiseController = require('./controllers/otherwise')
    , UserController = require('./controllers/user')
    , StartController = require('./controllers/start');

const userCtrl = new UserController(),
    startCtrl = new StartController();

tg.router.inlineQuery(new InlineModeController())
    .when(new Telegram.TextCommand(constants.COMMAND_START, 'startCommand'), startCtrl)
    .when(new Telegram.TextCommand(constants.COMMAND_SET, 'setCommand'), userCtrl)
    .when(new Telegram.TextCommand(constants.COMMAND_GET, 'getCommand'), userCtrl)
    .when(new Telegram.TextCommand(constants.COMMAND_CURRENCY, 'currencyCommand'), userCtrl)
    .when(new Telegram.TextCommand(constants.TEXT_COMMAND_SET_PAYPAL, 'setTextCommand'), startCtrl)
    .when(new Telegram.TextCommand(constants.TEXT_COMMAND_SET_CURRENCY, 'currencyTextCommand'), startCtrl)
    .when(new Telegram.TextCommand(constants.TEXT_COMMAND_REQUEST_MONEY, 'requestTextCommand'), startCtrl)
    .otherwise(new OtherwiseController());

store.init(path.normalize(__dirname + constants.FILE_PATH_STORE));

setInterval(() => {
    store.flush();
}, constants.FLUSH_INTERVAL);

function exitHandler(exitCode) {
    store.flush();
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));