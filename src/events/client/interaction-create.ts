import { Client, InteractionType } from "discord.js";
import { CommandHandler } from "../../handlers";
import path from "path"

export const event = {
	name: "interactionCreate",
	async listen(client: Client) {

		// monitor for slash commands and handle them seperately
		client.on("interactionCreate", async interaction => {

			if (interaction.type === InteractionType.ApplicationCommand) {

				if (!client.application) {
					await interaction.reply("Bot is still starting up! Give it a minute. If the bots status doesnt go 'online' in the next few minutes contact your server admin")
					console.error("No client application created")
					return
				}

				const commands = CommandHandler.load(path.join(__dirname, "../../commands"));
				const command = commands.get(interaction.commandName);
				if (!command) {
					await  interaction.reply("Couldn't find that command. Try something else.")
					console.error("Unknown command requested.")
					return
				}

				try {
					await command.execute(interaction, client);
					
				} catch (error) {
					console.error(error);
					const interactionState = [
						(interaction.deferred ? "DEFERRED" : ""),
						(interaction.replied ? "REPLIED" : "")
					].filter(Boolean).join("_")

					switch (interactionState) {
						case "DEFERRED":
							await interaction.editReply({ content: `${error}` });
							break;

						case "REPLIED":
							await interaction.editReply({ content: `${error}` });
							break;

						case "DEFERRED_REPLIED":
							await interaction.followUp({ content: `${error}`, ephemeral: true });
							break;

						default:
							await interaction.reply({ content: `${error}`, ephemeral: true });
							break;
					}

					throw new Error("Command errored. Shuting down. This could be intentional, but check bot output just in case.")
				}
			}
		})
	}
}