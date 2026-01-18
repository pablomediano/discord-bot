const env = require("../config/env");

async function logToChannel(guild, message) {
    const channel = guild.channels.cache.find(
        c => c.name === env.LOG_CHANNEL_NAME && c.isTextBased()
    );
    if (!channel) return;
    await channel.send(message);
}

module.exports = { logToChannel };
