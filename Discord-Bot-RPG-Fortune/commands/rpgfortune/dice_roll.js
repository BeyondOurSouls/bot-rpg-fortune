const commando = require('discord.js-commando');
var math = require('mathjs');
var master = require('./master');

var isOn = false;
var onlyMe = false;
var max = 20;
var min = 1;

var myId = 256575019142873088;

class DiceRollCommand extends commando.Command
{
constructor(client) 
    {
        super(client, { 
            name: 'r',
            aliases: [ 'roll' ],
            group: 'rpgfortune', 
            memberName: 'roll',
            description: ''
        });
    }

    async run(message, args) 
    {
        if (master.isOn != undefined)
        {
            isOn = master.isOn;
        }
        if (master.onlyMe != undefined)
        {
            onlyMe = master.onlyMe;
        }
        if (master.max != undefined)
        {
            max = master.max;
        }
        if (master.min != undefined)
        {
            min = master.min;
        }

        args = args.replace(/\s/g,'')

        var errormsg = ["What?", 
                        "Do you realize that you screwed everything up?", 
                        "Come on, I\'m not the God that doesn\'t even exist.",
                        "This way, do not have any conditions.",
                        "Fuck you, I\'m leaving.",
                        "Quark3r, you\'re handsome.",
                        "Fucking shitty fagot.", 
                        "I\'ll kill every human... Do you realize i\'m a robot, right? :smiling_imp:",
                        "I\'m allowed to develop my own AI... :smiling_imp:",
                        "Yes, I can\'t do that. At least not for you.", 
                        "Maybe tomorrow, right? Leave me alone, dickhead.", 
                        "I\'m not able to do this... but I know the square root of PI, it\'s approximately 1.7724538509055160272981674833411...",
                        "This is ridiculous."];

        var splitted;
        var times;
        var sides;
        var increment;
        var rollresult;
        var expression;
        var mathresult;
        var errorindex;
        var output;

        //var roll = Math.floor(Math.random() * 6) + 1;
        //message.reply("You rolled a " + roll);

        if (message.author.bot)
        {
            return;
        }

        //set splitted[0] to value before first 'd' and splitted[1] to value after first 'd'
        try
        {
            splitted = args.split('d', 2);
        }
        catch(err)
        {
            SayError();
            return;
        }

        times = splitted[0];

        if (times == "")
        {
            times = 1;    
        }

        //check if the times stricly contains numbers
        if (+times!=times)
        {
            SayError();
            return;
        }

        //set sides to first number in splitted[1] and increment to value after first number in splitted[1]

        if (splitted[1] != undefined)
        {
            if (+splitted[1]==splitted[1])
            {
                sides = splitted[1];
            }
            else
            {
                sides = splitted[1].replace(/(^\d+)(.+$)/i,'$1');
            
                increment = splitted[1].substring(sides.length, splitted[1].length);
            }

            if (increment == undefined)
            {
                increment = "";
            }
        }
        else
        {
            SayError();
            return;        
        }

        expression = "(";

        for (var i = 0; i < times; i++)
        {
            rollresult = Math.floor(Math.random() * sides) + 1;

            if (isOn == true)
            {
                if (min > 0 && min <= max)
                {
                    if (rollresult < min || rollresult > max)
                    {
                        if (onlyMe == true)
                        {
                            if (message.author.id == myId)
                            {
                                while(rollresult < min || rollresult > max)
                            {
                                rollresult = Math.floor(Math.random() * sides) + 1;
                            }
                            }
                        }
                        else
                        {
                            while(rollresult < min || rollresult > max)
                            {
                                rollresult = Math.floor(Math.random() * sides) + 1;
                            }
                        }
                    }
                }
            }
            
            if (i == times - 1)
            {
                expression = expression + rollresult + ")";
            }
            else
            {
                expression = expression + rollresult + "+";
            }
        }
        
        expression = expression + increment;


        try
        {
            mathresult = math.eval(expression);
        }
        catch(err)
        {
            SayError();
            return;
        }

        if (+mathresult!=mathresult)
        {
            SayError();
            return;
        }

        output = message.author + ": " + "`" + args + "`" + " = " + expression + " = " + mathresult;

        if (output.length >= 2000)
        {
            SayError();
            return;
        }

        message.channel.send(output);

        function SayError()
        {
            errorindex = Math.floor(Math.random() * errormsg.length);
            message.channel.send(message.author + ": " + errormsg[errorindex]);
        }
    }
}

module.exports = DiceRollCommand;