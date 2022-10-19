import {
    Column,
    Entity,
    Generated,
    PrimaryColumn,
} from 'typeorm';
import Container from 'typedi';
import { EntityToken } from './base';

@Entity()
export class Network {
    constructor(props: Partial<Network>) {
        Object.assign(this, props);
    }

    @PrimaryColumn()
    @Generated('uuid')
    id: string = '';

    @Column()
    name: string = ''
}

// Inject so we can retrieve this model when we create the connection.
// The syntax here is weird because we need the _class_, not an instance.
Container.set({ id: EntityToken, multiple: true, value: Network });
