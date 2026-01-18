const { Events } = require("discord.js");
const { baseEmbed, logEmbed } = require("../core/logger");

module.exports = {
    name: Events.MessageUpdate,
    async execute(client, oldMessage, newMessage) {
        if (!newMessage.guild) return;

        if (oldMessage.partial) {
            try { oldMessage = await oldMessage.fetch(); } catch {}
        }
        if (newMessage.partial) {
            try { newMessage = await newMessage.fetch(); } catch {}
        }

        if (newMessage.author?.bot) return;

        const oldText = (oldMessage.content ?? "").trim();
        const newText = (newMessage.content ?? "").trim();
        if (oldText === newText) return;

        const clip = (t, max = 900) => (t.length > max ? t.slice(0, max) + "…" : t);

        const embed = baseEmbed({
            title: "✏️ Mensaje editado",
            member: newMessage.member ?? null,
            channel: newMessage.channel,
            color: 0xFEE75C
        });

        embed.addFields(
            { name: "Antes", value: oldText ? `\`\`\`\n${clip(oldText)}\n\`\`\`` : "_(no disponible)_", inline: false },
            { name: "Después", value: newText ? `\`\`\`\n${clip(newText)}\n\`\`\`` : "_(vacío)_", inline: false }
        );

        await logEmbed(newMessage.guild, embed);
    }
};
