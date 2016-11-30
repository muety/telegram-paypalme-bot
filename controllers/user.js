'use strict';

const Telegram = require('telegram-node-bot')
    , constants = require('./../constants')
    , store = require('./../store');

class UserController extends Telegram.TelegramBaseController {
    handleSet($) {
        let username = $.message.text.split(' ')[1];
        if (!username) return $.sendMessage(constants.TEXT_SET_USERNAME);
        username = username.replace(/"/g, '').replace(/;/g).replace(/\\/g, '').replace(/,/g, '');

        store.get($.userId).then(userData => {
            userData.u = username;
            store.set($.userId, userData).then(() => {
                $.sendMessage(constants.TEXT_SET_FORM_RESULT1.replace('$username$', username), { parse_mode: 'markdown' });
            });
        });
    }

    handleCurrency($) {
        let currency = $.message.text.split(' ')[1];
        if (!currency) return store.get($.userId).then(userData => {
            $.sendMessage(constants.TEXT_CURRENCY_GET.replace('$currency$', userData.c));
        });
        else if (!constants.REGEX_CURRENCY.test(currency)) return $.sendMessage(constants.TEXT_CURRENCY_INVALID);

        store.get($.userId).then(userData => {
            userData.c = currency;
            store.set(`${$.userId}`, userData).then(() => {
                $.sendMessage(constants.TEXT_CURRENCY_VALID.replace('$currency$', currency), { parse_mode: 'markdown' });
            });
        });
    }

    handleGet($) {
        store.get($.userId).then(userData => {
            if (userData && typeof (userData) === 'object' && userData.u) $.sendMessage(constants.TEXT_GET_USERNAME.replace('$username$', userData.u), { parse_mode: 'markdown' });
            else $.sendMessage(constants.TEXT_REQUEST_MONEY_INLINE_FORM_ERROR);
        });
    }

    get routes() {
        return {
            'setCommand': 'handleSet',
            'getCommand': 'handleGet',
            'currencyCommand': 'handleCurrency'
        };
    }
}

module.exports = UserController;