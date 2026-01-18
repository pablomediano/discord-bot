const env = require("../config/env");
const { baseEmbed, logEmbed } = require("../core/logger");
const { MessageFlags } = require("discord.js");

module.exports = {
    id: "verify_me",
    async execute(interaction) {
        const role = interaction.guild.roles.cache.find(
            r => r.name === env.VERIFIED_ROLE_NAME
        );

        if (!role) {
            return interaction.reply({
                content: `❌ No existe el rol "${env.VERIFIED_ROLE_NAME}"`,
                flags: MessageFlags.Ephemeral
            });
        }

        // Ya verificado
        if (interaction.member.roles.cache.has(role.id)) {
            await interaction.reply({
                content: "✅ Ya estás verificado.",
                flags: MessageFlags.Ephemeral
            });

            const embed = baseEmbed({
                title: "✅ Verificación",
                member: interaction.member,
                color: 0x5865f2,
                description: "Intentó verificarse, pero ya estaba verificado."
            });

            await logEmbed(interaction.guild, embed);
            return;
        }

        // Verificación nueva
        try {
            await interaction.member.roles.add(role);

            await interaction.reply({
                content: "✅ Verificado! Ya tienes acceso.",
                flags: MessageFlags.Ephemeral
            });

            const embed = baseEmbed({
                title: "✅ Verificación",
                member: interaction.member,
                color: 0x57f287,
                description: `Se ha asignado el rol **${env.VERIFIED_ROLE_NAME}**.`
            });

            await logEmbed(interaction.guild, embed);
        } catch (e) {
            console.error(e);
            await interaction.reply({
                content: "❌ No pude asignar el rol. Revisa permisos/posición del rol del bot.",
                flags: MessageFlags.Ephemeral
            });
        }
    }
};
