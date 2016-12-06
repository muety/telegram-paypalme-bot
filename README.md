# telegram-paypalme-bot
This is a bot for the [Telegram](https://telegram.org/) messaging app using their [bot platform](https://core.telegram.org/bots). The code is open-source and consequently anybody could set up an own instance of the bot. To learn how to do so, see [this section](#how-to-host-it-myself). The official hosted version is available as [@PayPalMeBot](https://telegram.me/PayPalMeBot). This bot uses the [telegram-node-bot](https://github.com/Naltox/telegram-node-bot) framework.

![](https://anchr.io/i/gRuMx.png)

## What does it do?
This bot helps people requesting money from friends more easily by generating and sending PayPal.me links. It works with inline mode from any chat, assumed both partners have a PayPal account.

## How to host it myself?
### Prerequisites
In order to host this bot on your own, you need a few things.
* Server to run the bot on (since the bot uses the long polling method to [get updates](https://core.telegram.org/bots/api/#getupdates) instead of the web-hook one, you don't need HTTPS certificates or ports to be exposed)
* Node.js (preferbly at the latest version)
* A bot token, which you get from registering a new bot to the [@BotFather](https://telegram.me/BotFather)

### Configuration
To configure your bot, clone this repository and then edit `constants.js` file.
* `_TOKEN`: the token you got from the _BotFather_
* `BOT_NAME`: the bot's name, e.g. _"PayPalMeBot"_ in my case
* `FILE_PATH_STORAGE`: the path of a json file where to persist data to, e.g. `./data/store.json`
**IMPORTANT**: Don't forget to create that file, doing (e.g.) `touch ./data/store.json`

### Run
```bash
$ npm start
```

## License
MIT @ [Ferdinand Mütsch](https://ferdinand-muetsch.de)