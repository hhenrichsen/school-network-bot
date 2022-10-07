import {
    CacheType,
    ChatInputCommandInteraction,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js';
import { Constructor } from '../types/constructor';

export abstract class Command {
    public abstract readonly declaration: RESTPostAPIApplicationCommandsJSONBody;
    protected abstract type: Constructor<Command>;
    public abstract run(
        interaction: ChatInputCommandInteraction<CacheType>
    ): Promise<void> | void;
}
