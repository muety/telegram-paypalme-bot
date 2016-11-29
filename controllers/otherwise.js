'use strict';

const Telegram = require('telegram-node-bot')
    , constants = require('./../constants');

class OtherwiseController extends Telegram.TelegramBaseController {
    handle($) {
        $.sendMessage(constants.TEXT_OTHERWISE);
    }
}

module.exports = OtherwiseController;