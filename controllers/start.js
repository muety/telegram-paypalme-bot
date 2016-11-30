'use strict';

const Telegram = require('telegram-node-bot')
    , store = require('./../store')
    , constants = require('./../constants');

const replyKeyboard1 = new Telegram.Models.ReplyKeyboardMarkup([
    [new Telegram.Models.KeyboardButton(constants.TEXT_COMMAND_SET_PAYPAL)],
    [new Telegram.Models.KeyboardButton(constants.TEXT_COMMAND_SET_CURRENCY)],
    [new Telegram.Models.KeyboardButton(constants.TEXT_COMMAND_REQUEST_MONEY)]
], true, false);

const inlineKeyboard1 = new Telegram.Models.InlineKeyboardMarkup([[
    new Telegram.Models.InlineKeyboardButton(constants.TEXT_SELECT_CONTACT_BUTTON, null, null, constants.TEXT_INLINE_DEFAULT)
]]);

class StartController extends Telegram.TelegramBaseController {
    handleStart($) {
        $.sendMessage(constants.TEXT_START, {
            parse_mode: 'markdown',
            reply_markup: JSON.stringify(replyKeyboard1.toJSON())
        });
    }

    handleSet($) {
        const form = {
            username: {
                q: constants.TEXT_SET_FORM_VALID1,
                error: constants.TEXT_SET_FORM_ERROR1,
                validator: (message, callback) => {
                    if (message.text && message.text.indexOf(' ') === -1) {
                        callback(true, message.text);
                        return;
                    }
                    callback(false);
                }
            }
        };

        $.runForm(form, (result) => {
            result.username = result.username.replace(/"/g, '').replace(/;/g).replace(/\\/g, '').replace(/,/g, '');

            store.get($.userId).then(userData => {
                userData.u = result.username;
                store.set($.userId, userData).then(() => {
                    $.sendMessage(constants.TEXT_SET_FORM_RESULT1.replace('$username$', result.username), { parse_mode: 'markdown' });
                });
            });
        });
    }

    handleCurrency($) {
        const form = {
            currency: {
                q: constants.TEXT_SET_FORM_VALID2,
                error: constants.TEXT_SET_FORM_ERROR2,
                validator: (message, callback) => {
                    if (message.text && constants.REGEX_CURRENCY.test(message.text)) {
                        callback(true, message.text);
                        return;
                    }
                    callback(false);
                }
            }
        };

        $.runForm(form, (result) => {
            result.currency = result.currency.replace(/"/g, '').replace(/;/g).replace(/\\/g, '').replace(/,/g, '');

            store.get($.userId).then(userData => {
                userData.c = result.currency;
                store.set($.userId, userData).then(() => {
                    $.sendMessage(constants.TEXT_SET_FORM_RESULT2.replace('$currency$', result.currency), { parse_mode: 'markdown' });
                });
            });
        });
    }

    handleRequest($) {
        store.get($.userId).then(userData => {
            if (userData && userData.u) {
                $.sendMessage(constants.TEXT_REQUEST_MONEY_INLINE_FORM, {
                    reply_markup: JSON.stringify(inlineKeyboard1.toJSON())
                });
            }
            else {
                $.sendMessage(constants.TEXT_REQUEST_MONEY_INLINE_FORM_ERROR);
            }
        });
    }

    get routes() {
        return {
            'startCommand': 'handleStart',
            'setTextCommand': 'handleSet',
            'currencyTextCommand': 'handleCurrency',
            'requestTextCommand': 'handleRequest'
        };
    }
}

module.exports = StartController;