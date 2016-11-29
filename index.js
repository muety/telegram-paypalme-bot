'use strict';

const Telegram = require('telegram-node-bot'),
    PersistentMemoryStorage = require('./adapters/PersistentMemoryStorage'),
    path = require('path'),
    store = require('./store'),
    storage = new PersistentMemoryStorage(
        `${__dirname}/data/userStorage.json`,
        `${__dirname}/data/chatStorage.json`
    ),
    tg = new Telegram.Telegram('295822875:AAFdsSSUBn2Et_n6EDGZAKln4yEyRRxEeQE', {
        workers: 1,
        storage: storage
    });

const InlineModeController = require('./controllers/inline_mode')
    , OtherwiseController = require('./controllers/otherwise')
    , UserController = require('./controllers/user');

const userCtrl = new UserController();

tg.router.inlineQuery(new InlineModeController())
    .when(new Telegram.TextCommand('/set', 'setCommand'), userCtrl)
    .when(new Telegram.TextCommand('/get', 'getCommand'), userCtrl)
    .otherwise(new OtherwiseController());

store.init(path.normalize(__dirname + '/data/store.json'));

function exitHandler(exitCode) {
    storage.flush();
    store.flush();
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));