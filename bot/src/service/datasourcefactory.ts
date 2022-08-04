import { EntityToken } from '../entities/base';
import Container, { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { readdirSync } from 'fs';

const { DATABASE_URL } = process.env;

@Service()
export class DataSourceFactory {
    create() {
        return new DataSource({
            type: 'mysql',
            url: DATABASE_URL,
            entities: [...Container.getMany(EntityToken)],
            migrations: [
                ...readdirSync(`${__dirname}/../migrations`)
                    .filter((file) => file.endsWith('.js'))
                    .map((it) =>
                        Object.values(
                            require(`${__dirname}/../migrations/${it}`) // eslint-disable-line @typescript-eslint/no-var-requires
                        )
                    )
                    .flat()
                    .filter((it): it is Function => it instanceof Function), // eslint-disable-line @typescript-eslint/ban-types
            ],
            migrationsTableName: '_migrations',
        });
    }
}
