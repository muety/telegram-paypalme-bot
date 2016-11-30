'use strict';

const Telegram = require('telegram-node-bot')
    , constants = require('./../constants')
    , store = require('./../store');

class InlineModeController extends Telegram.TelegramBaseInlineQueryController {
    handle($) {
        if (!$.inlineQuery.query) return;
        let amount = parseFloat($.inlineQuery.query.split(' ')[0]).toFixed(2);
        if (isNaN(amount)) return;
        let username;
        let currency;

        store.get($.userId)
            .then(userData => {
                if (!userData || !userData.u) $.answer([new Telegram.Models.InlineQueryResultArticle('article', '1', constants.TEXT_INLINE_NO_USERNAME, new Telegram.Models.InputTextMessageContent(constants.TEXT_INLINE_DEFAULT_LINK))]);
                else {
                    username = userData.u;
                    currency = userData.c || constants.DEFAULT_CURRENCY;
                    return $.getChat();
                }
            })
            .then(c => {
                let firstName = c.firstName || constants.USER_UNKNOWN;
                $.answer([new Telegram.Models.InlineQueryResultArticle('article', '1', constants.TEXT_INLINE_REQUEST.replace('$amount$', amount).replace('$currency$', currency),
                    new Telegram.Models.InputTextMessageContent(constants.TEXT_HAS_REQUESTED
                        .replace('$firstName$', firstName)
                        .replace('$amount$', amount)
                        .replace('$currency$', currency)
                        .replace('$link$', this._buildLink(username, amount)),
                        'markdown', true)
                )]);
            });
    }

    chosenResult(result) {
    }

    _buildLink(userName, amount) {
        return constants.PAYPAL_LINK_TEMPLATE.replace('$username$', userName).replace('$amount$', amount);
    }
}

module.exports = InlineModeController;