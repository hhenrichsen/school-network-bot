import { EntityToken } from '../entities/base';
import Container, { Service } from 'typedi';
import { DataSource } from 'typeorm';
import Logger from 'bunyan';

// Make sure we get entities into the injector.
import '../entities/guild.entity';

const { DATABASE_URL, NODE_ENV } = process.env;

@Service()
export class DataSourceFactory {
    constructor(private readonly logger: Logger) { }

    create() {
        const entities = [...Container.getMany(EntityToken)];
        this.logger.info(`Registerred ${entities.length} entities.`);

        return new DataSource({
            type: 'mysql',
            url: DATABASE_URL,
            entities,
            migrationsTableName: '_migrations',
            synchronize: NODE_ENV?.toLowerCase() != 'production',
        });
    }
}
