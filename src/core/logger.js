const env = require("../config/env");
const { EmbedBuilder } = require("discord.js");

function getLogChannel(guild) {
    return guild.channels.cache.find(
        c => c.name === env.LOG_CHANNEL_NAME && c.isTextBased()
    );
}

// Crea un embed base consistente para TODOS los logs
function baseEmbed({ title, member, channel, color, description }) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setTimestamp(new Date());

    if (color) embed.setColor(color);
    if (description) embed.setDescription(description);

    if (member?.user) {
        embed.setAuthor({
            name: member.user.tag,
            iconURL: member.user.displayAvatarURL?.() ?? undefined
        });
    }

    if (channel?.name) {
        embed.addFields({ name: "Canal", value: `#${channel.name}`, inline: true });
    }

    return embed;
}

async function logEmbed(guild, embed) {
    const ch = getLogChannel(guild);
    if (!ch) return;
    await ch.send({ embeds: [embed] });
}

module.exports = { baseEmbed, logEmbed };
