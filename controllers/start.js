'use strict';

const Telegram = require('telegram-node-bot')
    , store = require('./../store');

class StartController extends Telegram.TelegramBaseController {
    handleStart($) {
        $.runMenu({
            message: 'Welcome! If you contacted me for the first time, please set your PayPal.me username first before you can start.',
            options: {
                parse_mode: 'Markdown'
            },
            'Set my PayPal.me username': {
                message: 'Please give me your PayPal.me user name now. You can find it at [PayPal.me](https://paypal.me)',
                options: {
                    parse_mode: 'Markdown',
                    disable_web_page_preview: true
                },
                resizeKeyboard: true,
                'anyMatch': ($) => {
                    let username = $.message.text.split(' ')[0];
                    if (!username) return $.sendMessage('Sorry, please pass a username.');
                    username = username.replace(/"/g, '').replace(/;/g).replace(/\\/g, '').replace(/,/g, '');

                    store.set($.userId, username).then(() => {
                        $.sendMessage(`Successfully set your PayPal.me name to ${username}.`);
                    });
                }
            },
            'Request money': {

            },
            'anyMatch': () => { //will be executed at any other message

            }
        });
    }

    get routes() {
        return {
            'startCommand': 'handleStart'
        };
    }
}

module.exports = StartController;