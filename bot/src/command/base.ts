import {
    CacheType,
    ChatInputCommandInteraction,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js';
import { Constructor } from '../types/constructor';

export interface Command {
    declaration: RESTPostAPIApplicationCommandsJSONBody;
    type: Constructor<Command>;
    run(
        interaction: ChatInputCommandInteraction<CacheType>
    ): Promise<void> | void;
}
