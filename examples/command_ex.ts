import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";

export const command = {
    data: new SlashCommandBuilder()
        .setName("")
        .setDescription("")
        ,
    async execute(interaction: CommandInteraction, client: Client) {
        return interaction.reply("hi!")
    }
}