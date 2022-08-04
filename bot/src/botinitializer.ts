import Logger, { createLogger } from 'bunyan';
import Container, { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { Bot } from './service/bot';
import { DataSourceFactory } from './service/datasourcefactory';

@Service()
export class BotInitializer {
    constructor(
        private readonly dataSourceFactory: DataSourceFactory,
        private readonly bot: Bot
    ) {}

    public async init() {
        const logger = createLogger({
            name: 'bot',
            stream: process.stdout,
            level: 'info',
        });
        Container.set(Logger, logger);

        logger.info('Connecting to database...');
        const dataSource = this.dataSourceFactory.create();
        await dataSource.initialize();
        Container.set(DataSource, dataSource);
        logger.info('Connected!');

        logger.info('Running migrations...');
        await dataSource.runMigrations();
        logger.info('Done!');

        logger.info('Connected to Discord...');
        this.bot.client.login(process.env['BOT_TOKEN']);
        logger.info('Connected!');
    }
}
