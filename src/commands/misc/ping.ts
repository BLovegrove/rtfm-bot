import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";

export const command = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with 'Pong!' and the packet delay between client and bot")
	,
	async execute(interaction: CommandInteraction, client: Client) {
		await interaction.reply(`Pong! (${client.ws.ping}ms)`)
		return
	}
}