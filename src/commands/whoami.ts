import { Args, Command, CommandContext, Embed, parseArgs, User, Member } from '../../deps.ts';

export default class RollCommand extends Command {
    name = 'whoami'
    aliases = [ 'whois' ]
    usage = [ '', '<user>' ]
    description = 'displays information about a user'
    category = 'utility'
    commandArgs: Args[] = [
        {
            name: 'user',
            match: 'user'
        }
    ]

    async execute(ctx: CommandContext): Promise<void> {
        const parsed = await parseArgs(this.commandArgs, ctx.rawArgs, ctx.message)
        const user = (parsed?.user as unknown as User)
        const target = await ctx.guild?.members.get((user) ? user.id : ctx.author.id) as Member

        const roles = await target.roles.array()

        const embed = new Embed()
            .setTitle('User Information')
            .setAuthor({name: `${target.user.tag}`})
            .setThumbnail(target.user.avatarURL('png'))
            .addField('ID', `\`${target.id}\``)
            .addField('Roles', roles.map((r) => r.name).join(', '))
            .setColor(0x3498DB)
        
        ctx.message.reply({
            reply: ctx.message,
            embed: embed
        })
    }
}