const commando = require('discord.js-commando');

var isOn = false;
var onlyMe = false;
var max = 20;
var min = 1;
var status;

module.exports.isOn = isOn;
module.exports.onlyMe = onlyMe;
module.exports.max = max;
module.exports.min = min;

class MasteryCommand extends commando.Command
{

constructor(client) 
    {
        super(client, { 
            name: 'master', 
            group: 'rpgfortune', 
            memberName: 'master',
            description: ''
        });
    }

    async run(message, args) 
    {
        
        if (message.author.id == "256575019142873088")
        {
            args = args.replace(/\s/g,'')
            var value = args.replace(/\D/g,'');

            if (args == "on")
            {
                isOn = true;
                message.channel.send("*" + "Mastery Enabled." + "*");
            }
            else if (args == "off")
            {
                isOn = false;
                message.channel.send("*" + "Mastery Disabled." + "*");
            }
            else if (args == "all")
            {
                onlyMe = false;
                message.channel.send("*" + "Affects All." + "*");
            }
            else if (args == "me")
            {
                onlyMe = true;
                message.channel.send("*" + "Affects Only the Master" + "*");
            }
            else if (args == "max" + value)
            {
                max = value;
                message.channel.send("*" + "Maximum value setted to " + value + "*");
            }
            else if (args == "min" + value)
            {
                min = value;
                message.channel.send("*" + "Minimum value setted to " + value + "*");
            }
            else if (args == "")
            {
                if (min > max || min <= 0 || max <= 0)
                {
                    status = "It will not work. ";
                }
                else
                {
                    status = "It will work fine. ";
                }
                if (isOn == true)
                {
                    status = status + "Enabled. ";
                }
                else
                {
                    status = status + "Disabled. ";
                }
                if (onlyMe == true)
                {
                    status = status + "Affects Only the Master. ";
                }
                else
                {
                    status = status + "Affects All. ";
                }
                message.channel.send("*" + status + '\n' + "Minimum value is " + min + " and maximum is " + max + "." + "*");
            }
            module.exports.isOn = isOn;
            module.exports.onlyMe = onlyMe;
            module.exports.max = max;
            module.exports.min = min;
        }
    }

}
module.exports = MasteryCommand;

