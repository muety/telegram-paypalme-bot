'use strict';

module.exports = {
    // globals
    TOKEN: '295822875:AAFdsSSUBn2Et_n6EDGZAKln4yEyRRxEeQE',
    BOT_NAME: '@PayPalMeBot',
    PAYPAL_LINK_TEMPLATE: 'https://www.paypal.me/$username$/$amount$',
    FILE_PATH_STORE: '/data/store.json',
    USER_UNKNOWN: 'Unknown',

    // commands
    COMMAND_GET: '/get',
    COMMAND_SET: '/set',
    COMMAND_START: '/start',

    // text commands
    TEXT_COMMAND_SET_PAYPAL: '👤 Set PayPal.me username',
    TEXT_COMMAND_REQUEST_MONEY: '💵 Request money',

    // controllers
    TEXT_START: '🙋 Welcome! I can help you *requesting money* from your friends *more easily*. I generate and send PayPal.me links for that.\n\nIf you contacted me for the first time, please *set your PayPal.me username* first before you can start.\n\nYou can either use *commands* or the *buttons* below to tell me what to do.\n\nThe fastest way to request money is using the *inline mode*. Just start typing @PayPalMeBot in any chat!',
    TEXT_SELECT_CONTACT_BUTTON: '👥 Select contact',
    TEXT_SET_FORM_VALID1: '💬 Fine! Please send me your PayPal.me user name, now.',
    TEXT_SET_FORM_ERROR1: '😣 Sorry, that\'s not a valid user name',
    TEXT_SET_FORM_RESULT1: '✅ Alright! I set your PayPal.me name to *$username$*.',
    TEXT_REQUEST_MONEY_INLINE_FORM: '💬 Sure! Please click the button below to select a contact you want to request money from. 🔽',
    TEXT_REQUEST_MONEY_INLINE_FORM_ERROR: '😣 Sorry, you need to tell me your PayPal.me user name first. You can get it at PayPal.me.',
    TEXT_INLINE_DEFAULT: '1.0',
    TEXT_SET_USERNAME: '😣 Sorry, please pass a username.',
    TEXT_GET_USERNAME: '👥 Your PayPal.me user name is *$username$*.',
    TEXT_OTHERWISE: '😣 Sorry, I don\'t understand.',
    TEXT_INLINE_NO_USERNAME: 'No username specified. Try the /set command in @PayPalMeBot.',
    TEXT_INLINE_DEFAULT_LINK: 'https://paypal.me',
    TEXT_INLINE_REQUEST: 'Request $amount$ €',
    TEXT_HAS_REQUESTED: '💵 *$firstName$* has requested *$amount$ €* via PayPal. Click [🔗 this link]($link$) to send it.',

    DESCRIPTION: 'This bot helps you requesting money from friends more easily by generating and sending PayPal.me links. It works with inline mode from any chat, assumed both of you have a PayPal account.',
    ABOUT: 'Bot to request money from friends using PayPal.me links. Created by @n1try (ferdinand-muetsch.de).'
};