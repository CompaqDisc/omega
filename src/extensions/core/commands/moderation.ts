import { addPrivilegedRole, removePrivilegedRole, Args, Command, CommandContext, Guild, Role, parseArgs, checkPermissions } from '../deps.ts';

export class RolesCommand extends Command {
    name = 'roles'
    category = 'moderation'
    commandArgs: Args[] = [
        {
            name: 'doAdd',
            match: 'flag',
            flag: 'add',
            defaultValue: false
        },
        {
            name: 'doRemove',
            match: 'flag',
            flag: 'remove',
            defaultValue: false
        },
        {
            name: 'role',
            match: 'role'
        }
    ]

    beforeExecute(ctx: CommandContext): Promise<boolean> {
        return checkPermissions(ctx, true)
    }

    async execute(ctx: CommandContext): Promise<void> {
        const parsed = await parseArgs(this.commandArgs, ctx.rawArgs, ctx.message)
        const doAdd = parsed?.doAdd as unknown as boolean
        const doRemove = parsed?.doRemove as unknown as boolean
        const role = parsed?.role as unknown as Role
        const guild = ctx.guild as Guild

        if (doAdd && doRemove) return
        if (role && doAdd) {
            addPrivilegedRole(guild, role)
            ctx.message.reply(`Added <@&${role.id}> to the privileged list!`)
        } else if (role && doRemove) {
            removePrivilegedRole(guild, role)
            ctx.message.reply(`Removed <@&${role.id}> from the privileged list!`)
        }
    }
}