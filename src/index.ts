import { Client, GatewayIntentBits } from 'discord.js';
import config from './config.json';
import path from 'path';
import { CommandHandler, EventHandler } from './handlers';

// create client with all normal + dm permissions + an erela manager
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
	],
});

EventHandler.load(client, path.join(__dirname, './events'));
const commands = CommandHandler.load(path.join(__dirname, "commands"));
(async () => {
	await CommandHandler.register(commands)
})();

// log bot in to discord
client.login(config.bot.token);