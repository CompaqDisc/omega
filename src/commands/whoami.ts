import { Command, CommandContext, Embed, User } from '../../deps.ts';

export default class RollCommand extends Command {
    name = 'whoami'
    aliases = [ 'whois' ]
    description = 'displays information about a user'
    category = 'utility'

    async execute(ctx: CommandContext): Promise<void> {
        // TODO: Doesn't work fully when passing a user as argument

        let user = ctx.author;

        if ( ctx.rawArgs.length === 1 ) {
            user = new User(ctx.client, await ctx.client.rest.endpoints.getUser(ctx.rawArgs[0].replace(/<?@?!?(\d+)>?/g, '$1')))
        }

        const embed = new Embed()
            .setAuthor({
                name: 'Omega',
                url: 'https://theomega.zone/',
                icon_url: 'https://cdn.discordapp.com/avatars/747551324849307810/fb85aa37b55ef67efdf45df0322a5a2d.png'
            })
            .setTitle(`Information for user, ${user.tag}`)
            .setDescription(`Snowflake: \`${user.id}\``)
            .setThumbnail(user.avatarURL('png'))
            .setColor(0x3498DB)

        const memberFromUser = await ctx.guild?.members.get(user.id)
        if (memberFromUser !== undefined) {
            const rolesArray = await memberFromUser.roles.array()
            const roleNamesArray: string[] = []
            rolesArray.forEach(role => {
                if (!role.name.match(/everyone/))
                roleNamesArray.push(role.name)
            })
            embed.addField('Roles', `${roleNamesArray.join(', ')}`, false)
        }
        
        ctx.message.reply(embed)
    }
}