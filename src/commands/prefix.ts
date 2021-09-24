import { Args, Command, CommandContext, Embed, OmegaDB, parseArgs } from '../../deps.ts';

export default class RollCommand extends Command {
    name = 'prefix'
    category = 'configuration'
    commandArgs: Args[] = [
        {
            name: 'prefix',
            match: 'rest'
        }
    ]

    beforeExecute(ctx: CommandContext) {
        // check perms
        const guildOwnerId = ctx.message.guild?.ownerID as string
        const authorId = ctx.message.author.id

        return guildOwnerId === authorId
    }

    async execute(ctx: CommandContext): Promise<void> {
        const parsed = await parseArgs(this.commandArgs, ctx.rawArgs, ctx.message)
        const desiredPrefix = parsed?.prefix as unknown as string
        const guildId = ctx.guild?.id
        
        if (!desiredPrefix) {
            const prefix = OmegaDB.getGuildPrefix(guildId)
            const embed = new Embed()
                .setTitle('Prefix')
                .addField('Current Prefix', `\`${prefix}\``)
                .setColor(0x1ABC9C)

            ctx.message.reply(embed)
        } else {
            OmegaDB.setGuildPrefix(guildId, desiredPrefix)
            const embed = new Embed()
                .setTitle('Prefix')
                .addField('New Prefix', `\`${desiredPrefix}\``)
                .setColor(0x1ABC9C)

            ctx.message.reply(embed)
        }
    }
}