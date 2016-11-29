'use strict';

const Telegram = require('telegram-node-bot')
, constants = require('./../constants')
, store = require('./../store');

class UserController extends Telegram.TelegramBaseController {
    handleSet($) {
        let username = $.message.text.split(' ')[1];
        if (!username) return $.sendMessage(constants.TEXT_SET_USERNAME);
        username = username.replace(/"/g, '').replace(/;/g).replace(/\\/g, '').replace(/,/g, '');

        store.set($.userId, username).then(() => {
            $.sendMessage(constants.TEXT_SET_FORM_RESULT1.replace('$username$', username), {parse_mode: 'markdown'});
        });
    }

    handleGet($) {
        store.get($.userId).then(username => {
            if (username && typeof(username) === 'string') $.sendMessage(constants.TEXT_GET_USERNAME.replace('$username$', username), {parse_mode: 'markdown'});
            else $.sendMessage(constants.TEXT_REQUEST_MONEY_INLINE_FORM_ERROR);
        });
    }

    get routes() {
        return {
            'setCommand': 'handleSet',
            'getCommand': 'handleGet'
        };
    }
}

module.exports = UserController;