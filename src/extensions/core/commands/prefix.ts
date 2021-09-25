import { Args, Command, CommandContext, OmegaDB, parseArgs, checkPermissions } from '../deps.ts';

export class PrefixCommand extends Command {
    name = 'prefix'
    category = 'configuration'
    commandArgs: Args[] = [
        {
            name: 'prefix',
            match: 'rest'
        }
    ]

    async execute(ctx: CommandContext): Promise<void> {
        const parsed = await parseArgs(this.commandArgs, ctx.rawArgs, ctx.message)
        const desiredPrefix = parsed?.prefix as unknown as string
        const guildId = ctx.guild?.id as string
        
        if (!desiredPrefix) {
            const prefix = OmegaDB.getGuildPrefix(guildId)
            ctx.message.reply(`Current prefix is \`${prefix}\``)
        } else if (await checkPermissions(ctx, true)) {
            OmegaDB.setGuildPrefix(guildId, desiredPrefix)
            ctx.message.reply(`Prefix is now \`${desiredPrefix}\``)
        }
    }
}