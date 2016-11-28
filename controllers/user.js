'use strict';

const Telegram = require('telegram-node-bot');

class UserController extends Telegram.TelegramBaseController {
    handleSet($) {
        let username = $.message.text.split(' ')[1];
        if (!username) return $.sendMessage('Sorry, please pass a username.');
        username = username.replace(/"/g, '').replace(/;/g).replace(/\\/g, '').replace(/,/g, '');

        $.setUserSession('username', username).then(() => {
            $.sendMessage(`Successfully set your PayPal.me name to ${username}.`);
        });
    }

    handleGet($) {
        $.getUserSession('username').then(username => {
            if (username && typeof(username) === 'string') $.sendMessage(`Your PayPal.me user name is ${username}.`);
            else $.sendMessage(`You haven't set a PayPal.me user name, yet. You can do this using the /set command.`);
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