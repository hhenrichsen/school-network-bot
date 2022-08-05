import Logger from "bunyan";
import { ChatInputCommandInteraction, CacheType } from "discord.js";
import { Service } from "typedi";
import { CommandRegistry } from "./commandregistry";

@Service()
export class CommandHandler {
    constructor(private readonly logger: Logger, private readonly commandRegistry: CommandRegistry) {
    }

    public handle(interaction: ChatInputCommandInteraction<CacheType>) {
        this.logger.debug(`Handling command ${interaction.commandName}`);
        const command = this.commandRegistry.getCommand(interaction.commandName);
        if (command) {
            command.run(interaction);
        } else {
            this.logger.warn(
                `Trying to execute nonexistent command ${interaction.commandName}`
            );
        }
    }
}
