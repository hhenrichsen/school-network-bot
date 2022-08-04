// Set up reflection
import 'reflect-metadata';

// Load environment
import { config as loadEnv } from 'dotenv';
loadEnv();

import Container from 'typedi';
import { BotInitializer } from './botinitializer';

Container.get(BotInitializer).init();
