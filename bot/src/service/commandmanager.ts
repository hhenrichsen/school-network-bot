import Logger from 'bunyan';
import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import { Service } from 'typedi';
import { Command } from '../command/base';
import { PingCommand } from '../command/ping.command';

@Service()
export class CommandManager {
    private readonly commands: Map<string, Command> = new Map();

    constructor(private readonly logger: Logger, pingCommand: PingCommand) {
        const commands = [pingCommand];
        commands.forEach((command) =>
            this.commands.set(command.declaration.name, command)
        );
    }

    public handle(interaction: ChatInputCommandInteraction<CacheType>) {
        this.logger.debug(`Handling command ${interaction.commandName}`);
        const command = this.commands.get(interaction.commandName);
        if (command) {
            command.run(interaction);
        } else {
            this.logger.warn(
                `Trying to execute nonexistent command ${interaction.commandName}`
            );
        }
    }

    public getCommandDeclarations() {
        return Array.from(this.commands.values()).map(
            (command) => command.declaration
        );
    }
}
