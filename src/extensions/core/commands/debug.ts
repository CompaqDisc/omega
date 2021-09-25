import { Args, Command, CommandContext, Embed, parseArgs, OmegaDB } from '../deps.ts';

export class DebugCommand extends Command {
    name = 'debug'
    category = 'developer'
    commandArgs: Args[] = [
        {
            name: 'feature',
            match: 'rest'
        }
    ]

    beforeExecute(ctx: CommandContext): boolean {
        return ctx.author.id === '280259505709645826'
    }

    async execute(ctx: CommandContext): Promise<void> {
        const parsed = await parseArgs(this.commandArgs, ctx.rawArgs, ctx.message)
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
        } else if (feature === 'p_roles') {
            const guildID = ctx.guild?.id as string
            const result = `\`${JSON.stringify(OmegaDB.getGuildPrivilegedRoles(guildID))}\``
            const embed = new Embed()
                .setTitle('Debug Privileged Roles')
                .addField('Guild ID', `\`${guildID}\``)
                .addField('Role IDs', result)
            
            ctx.message.reply(embed)
        } else {
            const embed = new Embed()
                .addField('Available Tests', '`perms`, `p_roles`')
            
            ctx.message.reply(embed)
        }
    }
}