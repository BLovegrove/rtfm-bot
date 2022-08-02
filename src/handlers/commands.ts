import { Collection, REST } from "discord.js";
import fs from "fs";
import config from "../config.json";
import { Routes } from "discord-api-types/v10";


export class CommandHandler {

	// read commands dirs for command modules
	static load(commandPath: fs.PathLike) {
		// init empty commands collection

		const commands = new Collection<string, any>();
		fs.readdirSync(commandPath).forEach(dir => {
			// both file.endswith needed for dev vs production running
			const files = fs.readdirSync(`${commandPath}/${dir}/`).filter(file => (file.endsWith(".js") || file.endsWith(".ts")));

			// add command module files to collection
			for (const file of files) {
				const { command } = require(`${commandPath}/${dir}/${file}`);
				commands.set(command.data.name, command);
			}
		});

		return commands;
	}

	static async register(commands: Collection<string, any>) {

		const rest = new REST({ version: "10" }).setToken(config.bot.token);

		try {
			console.log("Started refreshing guild slash commands.");

			const commandsData: any[] = [];
			commands.forEach(command => {
				commandsData.push(command.data.toJSON());
			});

			// set guild commands / clear global commands
			await rest.put(Routes.applicationCommands(config.bot.clientID), { body: {} });
			await rest.put(Routes.applicationGuildCommands(config.bot.clientID, config.bot.guildID), { body: commandsData });

			console.log("Successfully reloaded guild slash commands.");
		} catch (error) {
			console.error(error);
		}
	}
}