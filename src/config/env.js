require("dotenv").config();

function requireEnv(name) {
    const v = process.env[name];
    if (!v) throw new Error(`Falta la variable ${name} en .env`);
    return v;
}

module.exports = {
    DISCORD_TOKEN: requireEnv("DISCORD_TOKEN"),
    GUILD_ID: requireEnv("GUILD_ID"),
    VERIFIED_ROLE_NAME: process.env.VERIFIED_ROLE_NAME || "Verified",
    VERIFY_CHANNEL_NAME: process.env.VERIFY_CHANNEL_NAME || "verify"
};
