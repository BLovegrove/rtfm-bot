import { Client } from "discord.js"

export const event = {
	name: "ready",
	async listen(client: Client) {
		client.once("ready", () => {
			if (client.user) {
				console.log(`${client.user?.tag} is logged in`)
			} else {
				console.error("Bot failed to log in correctly. No attached user found.");
			}
			
			return
		})
	}
}