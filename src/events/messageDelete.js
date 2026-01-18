const { Events } = require("discord.js");
const { logToChannel } = require("../core/logger");

module.exports = {
    name: Events.MessageDelete,
    async execute(client, message) {
        if (!message.guild) return;
        if (message.author?.bot) return;

        const content = message.content
            ? `"${message.content}"`
            : "_(sin contenido)_";

        await logToChannel(
            message.guild,
            `🗑️ **${message.author.tag}** borró un mensaje en **#${message.channel.name}**:\n${content}`
        );
    }
};
