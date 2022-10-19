import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import Container from 'typedi';
import { EntityToken } from './base';
import { Network } from './network.entity';

@Entity()
export class ShareId {
    constructor(props: Partial<ShareId>) {
        Object.assign(this, props);
    }

    @PrimaryColumn('varchar', { length: 5 })
    id = '';

    @Column('varchar', { length: 32 })
    sharingUser: string = ''

    @ManyToOne(() => Network, (network) => network.id)
    network: Network = new Network({})
}

// Inject so we can retrieve this model when we create the connection.
// The syntax here is weird because we need the _class_, not an instance.
Container.set({ id: EntityToken, multiple: true, value: ShareId });
