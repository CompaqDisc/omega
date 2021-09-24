import { Args, Command, CommandContext, Embed, OmegaDB } from '../../deps.ts';

export default class WelcomeCommand extends Command {
    name = 'welcome'
    description = 'welcomes a user to the guild'
    category = 'general'
    commandArgs: Args[] = [
        {
            name: 'user',
            match: 'user'
        }
    ]

    execute(ctx: CommandContext): void {
        const guildId = ctx.message.guild?.id
        const welcomeUrl = OmegaDB.getGuildWelcomeUrl(guildId)
        const footerString = (welcomeUrl !== undefined) ? `${ctx.guild?.name} invites you to visit ${welcomeUrl}` : `${ctx.guild?.name} welcomes you to the server`

        ctx.channel.send({
            embed: new Embed()
                // .setAuthor({
                //     name: 'Omega',
                //     url: 'https://theomega.zone/',
                //     icon_url: 'https://cdn.discordapp.com/avatars/747551324849307810/fb85aa37b55ef67efdf45df0322a5a2d.png'
                // })
                .setTitle(`Welcome to ${ctx.guild?.name}~`)
                .setDescription(`***Hello there, ${ctx.author.nickMention}***\n\nThanks for joining us!`)
                .setThumbnail(ctx.author.avatarURL('png'))
                .setImage('https://i.pinimg.com/originals/5e/c5/01/5ec50175139d39c8a69f0f8ce3233ea9.jpg')
                .setFooter(footerString, ctx.guild?.iconURL('png'))
                .setColor(0x3498DB)
        })
    }
}