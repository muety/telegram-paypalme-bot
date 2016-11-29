'use strict';

const Telegram = require('telegram-node-bot')
    , store = require('./../store')
    , constants = require('./../constants');

const replyKeyboard1 = new Telegram.Models.ReplyKeyboardMarkup([
    [new Telegram.Models.KeyboardButton(constants.TEXT_COMMAND_SET_PAYPAL)],
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

            store.set($.userId, result.username).then(() => {
                $.sendMessage(constants.TEXT_SET_FORM_RESULT1.replace('$username$', result.username), {parse_mode: 'markdown'});
            });
        });
    }

    handleRequest($) {
        store.get($.userId).then(username => {
            if (username) {
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
            'requestTextCommand': 'handleRequest'
        };
    }
}

module.exports = StartController;