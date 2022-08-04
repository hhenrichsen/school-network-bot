import { config } from 'dotenv';
import { glob } from 'glob';
import { DataSource } from 'typeorm';
config();

const { DATABASE_URL } = process.env;

const dataSource = new DataSource({
    type: 'mysql',
    url: DATABASE_URL,
    entities: [
        // We use the injector to accomplish this in the app, but need this
        // here to find entities, too.
        ...glob
            .sync('./src/**/*.entity.ts')
            .map((file) => Object.values(require(file)))
            .flat(),
    ],
    cli: {
        migrationsDir: 'src/migrations',
    },
});

export default {
    dataSource,
};
