'use strict';

const Telegram = require('telegram-node-bot')
    , PAYPAL_ME_LINK_TEMPLATE = 'https://www.paypal.me/$username$/$amount$'
    , store = require('./../store');

class InlineModeController extends Telegram.TelegramBaseInlineQueryController {
    handle($) {
        if (!$.inlineQuery.query) return;
        let amount = parseFloat($.inlineQuery.query.split(' ')[0]).toFixed(2);
        if (isNaN(amount)) return;
        let username;

        store.get($.userId)
            .then(u => {
                if (!u || typeof (u) !== 'string') $.answer([new Telegram.Models.InlineQueryResultArticle('article', '1', `No username specified. Try the /set command in @PayPalMeBot.`, new Telegram.Models.InputTextMessageContent('https://paypal.me'))]);
                else {
                    username = u;
                    return $.getChat();
                }
            })
            .then(c => {
                let firstName = c.firstName || 'Unknown';
                $.answer([new Telegram.Models.InlineQueryResultArticle('article', '1', `Request ${amount} €`,
                    new Telegram.Models.InputTextMessageContent(`*${firstName}* has requested *${amount} €* via PayPal. Click [HERE](${this._buildLink(username, amount)}) to send it.`, 'markdown', true)
                )]);
            });
    }

    chosenResult(result) {
    }

    _buildLink(userName, amount) {
        return PAYPAL_ME_LINK_TEMPLATE.replace('$username$', userName).replace('$amount$', amount);
    }
}

module.exports = InlineModeController;