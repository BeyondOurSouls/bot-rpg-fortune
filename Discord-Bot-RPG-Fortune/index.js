const commando = require('discord.js-commando');
const bot = new commando.Client({ owner: '256575019142873088', commandPrefix: '/', unknownCommandResponse: false });

bot.registry.registerGroup('rpgfortune', 'rpgfortune');
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login('Mzk4MzcyODcyNDM2OTczNTcy.DS9lQQ.r-JYtOGOnxv6xoMvsclQCGBy6u8');
