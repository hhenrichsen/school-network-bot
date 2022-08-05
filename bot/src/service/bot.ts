import Logger from 'bunyan';
import { Client, REST, Routes } from 'discord.js';
import { Service } from 'typedi';
import { CommandManager } from './commandmanager';

const { BOT_TOKEN, BOT_CLIENT_ID } = process.env;

@Service()
export class Bot {
    private client: Client;
    private rest: REST;
    private token: string;

    constructor(
        private readonly logger: Logger,
        private readonly commandManager: CommandManager
    ) {
        if (!BOT_TOKEN) {
            throw new Error(
                'BOT_TOKEN was not set, bot cannot be initialized.'
            );
        }
        this.token = BOT_TOKEN;

        this.client = new Client({
            intents: [],
        });

        this.rest = new REST({ version: '10' });

        this.registerListeners();
    }

    public login() {
        this.client.login(this.token);
        this.addCommands();
    }

    private addCommands() {
        if (BOT_CLIENT_ID) {
            this.rest.setToken(this.token);
            const commands = this.commandManager.getCommandDeclarations();
            this.rest.put(Routes.applicationCommands(BOT_CLIENT_ID), {
                body: commands,
            });
            this.logger.info(`Registered ${commands.length} commands.`);
        } else {
            this.logger.warn(
                'No BOT_CLIENT_ID provided; slash commands may not work.'
            );
        }
    }

    private registerListeners() {
        this.client.on('ready', () => {
            this.logger.info('Bot ready!');
        });

        this.client.on('interactionCreate', (interaction) => {
            if (interaction.isChatInputCommand()) {
                this.commandManager.handle(interaction);
            }
        });
    }
}
