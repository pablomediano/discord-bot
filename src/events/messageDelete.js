const { Events } = require("discord.js");
const { baseEmbed, logEmbed } = require("../core/logger");

module.exports = {
    name: Events.MessageDelete,
    async execute(client, message) {
        if (!message.guild) return;

        if (message.partial) {
            try { message = await message.fetch(); } catch {}
        }

        if (message.author?.bot) return;

        const content =
            message.content && message.content.trim().length
                ? message.content
                : "(sin contenido o no disponible)";

        const embed = baseEmbed({
            title: "🗑️ Mensaje borrado",
            member: message.member ?? null,
            channel: message.channel,
            color: 0xED4245,
            description: `**Autor:** ${message.author?.tag ?? "Desconocido"}\n\n**Contenido:**\n\`\`\`\n${content.slice(0, 1500)}\n\`\`\``
        });

        await logEmbed(message.guild, embed);
    }
};
