// Set up reflection
import 'reflect-metadata';

// Make sure we get entities into the injector.
import './entities/guild.entity';

// Load environment
import { config as loadEnv } from 'dotenv';
loadEnv();

import Container from 'typedi';
import { BotInitializer } from './botinitializer';
import Logger, { createLogger } from 'bunyan';

const logger = createLogger({
    name: 'bot',
    stream: process.stdout,
    level: 'info',
});
Container.set(Logger, logger);

Container.get(BotInitializer).init();
