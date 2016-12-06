'use strict';

module.exports = {
    // globals
    TOKEN: '',
    BOT_NAME: '@PayPalMeBot',
    PAYPAL_LINK_TEMPLATE: 'https://www.paypal.me/$username$/$amount$',
    FILE_PATH_STORE: '/data/store.json',
    USER_UNKNOWN: 'Unknown',
    FLUSH_INTERVAL: 3600000,
    REGEX_CURRENCY: /[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/,
    DEFAULT_CURRENCY: '€',

    // commands
    COMMAND_GET: '/get',
    COMMAND_SET: '/set',
    COMMAND_CURRENCY: '/currency',
    COMMAND_START: '/start',

    // text commands
    TEXT_COMMAND_SET_PAYPAL: '👤 Set PayPal.me username',
    TEXT_COMMAND_SET_CURRENCY: '💲 Set currency',
    TEXT_COMMAND_REQUEST_MONEY: '💵 Request money',

    // controllers
    TEXT_START: '🙋 Welcome! I can help you *requesting money* from your friends *more easily*. I generate and send PayPal.me links for that.\n\nIf you contacted me for the first time, please *set your PayPal.me username* first before you can start.\n\nYou can either use *commands* or the *buttons* below to tell me what to do.\n\nThe fastest way to request money is using the *inline mode*. Just start typing @PayPalMeBot in any chat!',
    TEXT_SELECT_CONTACT_BUTTON: '👥 Select contact',
    TEXT_SET_FORM_VALID1: '💬 Fine! Please send me your PayPal.me user name, now.',
    TEXT_SET_FORM_ERROR1: '😣 Sorry, that\'s not a valid user name',
    TEXT_SET_FORM_RESULT1: '✅ Alright! I set your PayPal.me name to *$username$*.',
    TEXT_SET_FORM_VALID2: '💬 Fine! Please tell me your currency (the symbol, e.g. € or $), now.',
    TEXT_SET_FORM_ERROR2: '😣 Sorry, that\'s not a valid currency symbol',
    TEXT_SET_FORM_RESULT2: '✅ Alright! I set your currency to *$currency$*.',
    TEXT_REQUEST_MONEY_INLINE_FORM: '💬 Sure! Please click the button below to select a contact you want to request money from. 🔽',
    TEXT_REQUEST_MONEY_INLINE_FORM_ERROR: '😣 Sorry, you need to tell me your PayPal.me user name first. You can get it at PayPal.me.',
    TEXT_INLINE_DEFAULT: '1.0',
    TEXT_SET_USERNAME: '😣 Sorry, please pass a username.',
    TEXT_GET_USERNAME: '👥 Your PayPal.me user name is *$username$*.',
    TEXT_OTHERWISE: '😣 Sorry, I don\'t understand.',
    TEXT_INLINE_NO_USERNAME: 'No username specified. Try the /set command in @PayPalMeBot.',
    TEXT_INLINE_DEFAULT_LINK: 'https://paypal.me',
    TEXT_INLINE_REQUEST: 'Request $amount$ $currency$',
    TEXT_HAS_REQUESTED: '💵 *$firstName$* has requested *$amount$ $currency$* via PayPal. Click [🔗 this link]($link$) to send it.',
    TEXT_CURRENCY_INVALID: '😣 Sorry, that\'s not a valid currency symbol.',
    TEXT_CURRENCY_VALID: '✅ Alright! I set your currency to *$currency$*.',
    TEXT_CURRENCY_GET: 'Your currency is set to $currency$.',

    DESCRIPTION: 'This bot helps you requesting money from friends more easily by generating and sending PayPal.me links. It works with inline mode from any chat, assumed both of you have a PayPal account.',
    ABOUT: 'Bot to request money from friends using PayPal.me links. Created by @n1try (ferdinand-muetsch.de).',
    COMMAND_DESCRIPTION_GET: 'get - Get your PayPal.me user name',
    COMMAND_DESCRIPTION_SET: 'set - Set your PayPal.me user name',
    COMMAND_DESCRIPTION_CURRENCY: 'currency - Set your preferred currency',
    COMMAND_DESCRIPTION_START: 'start - Show intro & menu buttons',
};