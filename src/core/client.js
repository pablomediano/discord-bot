const { Client, GatewayIntentBits, Partials } = require("discord.js");

function createClient() {
    return new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
        partials: [Partials.Message, Partials.Channel, Partials.GuildMember]
    });
}

module.exports = { createClient };


