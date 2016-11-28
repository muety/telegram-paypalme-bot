'use strict';

const Telegram = require('telegram-node-bot');
const PAYPAL_ME_LINK_TEMPLATE = 'https://www.paypal.me/$username$/$amount$';

class InlineModeController extends Telegram.TelegramBaseInlineQueryController {
    handle($) {
        if (!$.inlineQuery.query) return;
        let amount = parseFloat($.inlineQuery.query.split(' ')[0]).toFixed(2);
        if (isNaN(amount)) return;

        $.answer([new Telegram.Models.InlineQueryResultArticle('article', '1', `Request ${amount} €`, new Telegram.Models.InputTextMessageContent(this._buildLink('foo', amount)))]);
    }

    chosenResult(result) {

    }

    _buildLink(userName, amount) {
        return PAYPAL_ME_LINK_TEMPLATE.replace('$username$', userName).replace('$amount$', amount);
    }
}

module.exports = InlineModeController;