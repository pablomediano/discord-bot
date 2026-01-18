const { Events } = require("discord.js");
const { logToChannel } = require("../core/logger");

module.exports = {
    name: Events.MessageUpdate,
    async execute(client, oldMessage, newMessage) {
        // Ignora DMs
        if (!newMessage.guild) return;

        // Si vienen partials, intenta fetch
        if (oldMessage.partial) {
            try { oldMessage = await oldMessage.fetch(); } catch {}
        }
        if (newMessage.partial) {
            try { newMessage = await newMessage.fetch(); } catch {}
        }

        // Ignora bots
        if (newMessage.author?.bot) return;

        const oldContent = (oldMessage.content ?? "").trim();
        const newContent = (newMessage.content ?? "").trim();

        // Evita spam: embeds/ediciones que no cambian texto
        if (oldContent === newContent) return;

        const author = newMessage.author ? newMessage.author.tag : "Desconocido";
        const channelName = newMessage.channel?.name ? `#${newMessage.channel.name}` : "canal desconocido";

        // Acorta si es enorme (Discord limita longitud de mensajes)
        const clip = (text, max = 800) =>
            text.length > max ? text.slice(0, max) + "…" : text;

        const oldShown = oldContent.length ? clip(oldContent) : "(no disponible / no estaba en caché)";
        const newShown = newContent.length ? clip(newContent) : "(vacío)";

        await logToChannel(
            newMessage.guild,
            `✏️ **${author}** editó un mensaje en **${channelName}**:\n` +
            `**Antes:**\n> ${oldShown}\n` +
            `**Después:**\n> ${newShown}`
        );
    }
};
