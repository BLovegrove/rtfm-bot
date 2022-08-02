import { Client } from "discord.js";
import fs from "fs";

export class EventHandler {

	// read commands dirs for command modules
	static load(client: Client, eventsPath: fs.PathLike) {
		// init empty commands collection

		fs.readdirSync(eventsPath).forEach(async dir => {
			// both file.endswith needed for dev vs production running
			const files = fs.readdirSync(`${eventsPath}/${dir}/`).filter(file => (file.endsWith(".js") || file.endsWith(".ts")));

			// add command module files to collection
			for (const file of files) {
				const { event } = require(`${eventsPath}/${dir}/${file}`);

				await event.listen(client);
			}
		});
	}
}