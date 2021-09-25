import { Args, Command, CommandContext, parseArgs } from '../deps.ts';

export class RollCommand extends Command {
    name = 'roll'
    aliases = [ 'random', 'rand' ]
    usage = ['', '<max-value>']
    description = 'roll a random number'
    category = 'utility'
    commandArgs: Args[] = [
        {
            name: 'max',
            match: 'rest',
            defaultValue: '100'
        }
    ]

    async execute(ctx: CommandContext): Promise<void> {
        const parsed = await parseArgs(this.commandArgs, ctx.rawArgs, ctx.message)
        const maxValue = Number.parseInt(parsed?.max as unknown as string)

        const choice = Math.floor(Math.random() * maxValue) + 1

        ctx.message.reply(`**${ctx.author.nickMention} rolls ${choice}** (1-${maxValue})`)
    }
}