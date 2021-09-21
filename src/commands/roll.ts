import { Command, CommandContext } from '../../deps.ts';

export default class RollCommand extends Command {
    name = 'roll'
    aliases = [ 'random', 'rand' ]
    usage = ['', '<max-value>']
    examples = ['', '100', '500']
    description = 'random number in range `1 <= x <= 100`'
    category = 'utility'

    execute(ctx: CommandContext): void {
        let max = 100;

        if ( ctx.rawArgs.length === 1 ) {
            max = Number.parseInt(ctx.rawArgs[0])
        }

        const choice = Math.floor(Math.random() * max) + 1

        ctx.message.reply(`**${ctx.author.nickMention} rolls ${choice}** (1-${max})`)
    }
}