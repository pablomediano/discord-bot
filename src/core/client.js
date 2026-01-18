const { Client, GatewayIntentBits } = require("discord.js");

function createClient() {
    return new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates // <-- ESTE ES EL IMPORTANTE
        ]
    });
}

module.exports = { createClient };

