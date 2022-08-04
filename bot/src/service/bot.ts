import { Client } from 'discord.js';
import { Service } from 'typedi';

@Service()
export class Bot {
    public client: Client;

    constructor() {
        this.client = new Client({
            intents: [],
        });
    }
}
