import { Args, Command, CommandContext, Embed, OmegaDB, User, Member, parseArgs } from '../deps.ts';

export class WelcomeCommand extends Command {
    name = 'welcome'
    description = 'welcomes a user to the guild'
    category = 'general'
    commandArgs: Args[] = [
        {
            name: 'user',
            match: 'user'
        }
    ]

    // https://imgur.com/a/ZtcYBVe
    welcomeImages: string[] = [
        'https://i.imgur.com/A7pEvYg.jpg',
        'https://i.imgur.com/xifCTH8.jpg',
        'https://i.imgur.com/vuC4A37.gif'
    ]

    async execute(ctx: CommandContext): Promise<void> {
        // Get message target from argument
        const parsed = await parseArgs(this.commandArgs, ctx.rawArgs, ctx.message)
        const user = (parsed?.user as unknown as User)
        const target = await ctx.guild?.members.get((user) ? user.id : ctx.author.id) as Member

        // Get welcome url, if present
        const guildId = ctx.message.guild?.id
        const welcomeUrl = OmegaDB.getGuildWelcomeUrl(guildId)
        const footerString = (welcomeUrl) ? `${ctx.guild?.name} invites you to visit ${welcomeUrl}` : `${ctx.guild?.name} welcomes you to the server`

        // Pick a welcome image
        const welcomeImage = this.welcomeImages[Math.floor(Math.random() * this.welcomeImages.length)]

        const embed = new Embed()
            // .setAuthor({
            //     name: 'Omega',
            //     url: 'https://theomega.zone/',
            //     icon_url: 'https://cdn.discordapp.com/avatars/747551324849307810/fb85aa37b55ef67efdf45df0322a5a2d.png'
            // })
            .setTitle(`Welcome to ${ctx.guild?.name}~`)
            .setDescription(`***Hello there, ${target.user.nickMention}***\n\nThanks for joining us!`)
            .setThumbnail(target.user.avatarURL('png'))
            .setImage(welcomeImage)
            .setFooter(footerString, ctx.guild?.iconURL('png'))
            .setColor(0x3498DB)

        ctx.channel.send(embed)
    }
}