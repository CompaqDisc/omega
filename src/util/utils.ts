import { CommandContext, Embed as _Embed, Guild, Role, OmegaDB } from '../../deps.ts'

export async function checkPermissions(ctx: CommandContext, replyOnError: boolean): Promise<boolean> {
    const guild = ctx.message.guild as Guild
    const author = ctx.message.author
    const authorRoles = await ctx.message.member?.roles.array() as Role[]
    const roleIDs = authorRoles.map((r) => {return r.id}).concat()

    let matchedRole = false
    const privilegedRoles = OmegaDB.getGuildPrivilegedRoles(guild.id)

    privilegedRoles.forEach((role) => {
        if (roleIDs.includes(role)) {
            matchedRole = true
        }
    })

    const allowable = (author.id === guild.ownerID) || matchedRole
    if (!allowable && replyOnError) {
        ctx.message.reply('**You do not have permission to do that!**')
    }

    return allowable
}

export function addPrivilegedRole(guild: Guild, role: Role) {
    OmegaDB.addGuildPrivilegedRole(guild.id, role.id)
}

export function removePrivilegedRole(guild: Guild, role: Role) {
    const roles = OmegaDB.getGuildPrivilegedRoles(guild.id)
    const index = roles.indexOf(role.id)
    if (index > -1) roles.splice(index, 1)
    OmegaDB.setGuildPrivilegedRoles(guild.id, roles)
}

export function generateWelcomeEmbed() {

}