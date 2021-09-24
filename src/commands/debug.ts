import { Args, Command, CommandContext, Embed, parseArgs } from '../../deps.ts';

export default class DebugCommand extends Command {
    name = 'debug'
    category = 'developer'
    args: Args[] = [
        {
            name: 'feature',
            match: 'rest'
        }
    ]

    async execute(ctx: CommandContext): Promise<void> {
        const parsed = await parseArgs(this.args, ctx.rawArgs, ctx.message)
        const feature = parsed?.feature as unknown as string

        if (feature === 'perms') {
            const guildOwnerId = ctx.message.guild?.ownerID as string
            const authorId = ctx.message.author.id
            ctx.message.reply({
                embed: new Embed()
                    .setTitle('Debug Permissions Test')
                    .addField('AuthorID', `\`${authorId}\``)
                    .addField('OwnerID', `\`${guildOwnerId}\``)
                    .addField('Author is Owner?', `\`${JSON.stringify(guildOwnerId==authorId)}\``)
            })
        }
    }
}