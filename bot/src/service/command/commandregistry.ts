import Logger from "bunyan";
import { Service } from "typedi";
import { Command } from "../../command/base";
import { PingCommand } from "../../command/ping.command";

@Service()
export class CommandRegistry {
    private readonly commands: Map<string, Command> = new Map();

    constructor(pingCommand: PingCommand) {
        const commands = [pingCommand];
        commands.forEach((command) =>
            this.commands.set(command.declaration.name, command)
        );
    }

    public getCommandDeclarations() {
        return Array.from(this.commands.values()).map(
            (command) => command.declaration
        );
    }

    public getCommand(name: string) {
        return this.commands.get(name);
    }
}
