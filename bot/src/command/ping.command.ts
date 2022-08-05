import {
    CacheType,
    Interaction,
    RESTPostAPIApplicationCommandsJSONBody,
    SlashCommandBuilder,
} from 'discord.js';
import { Service } from 'typedi';
import { Command } from './base';

@Service()
export class PingCommand implements Command {
    public readonly type = PingCommand;

    declaration: RESTPostAPIApplicationCommandsJSONBody;

    constructor() {
        this.declaration = new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Checks if the bot is working')
            .toJSON();
    }

    async run(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        await interaction.reply('Pong!');
    }
}
