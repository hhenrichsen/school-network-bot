import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { Network } from '../entities/network.entity';

@Service()
export class NetworkRepository {
    private repo;

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(Network);
    }

    public async getNetworkByUUID(id: string): Promise<Network | undefined> {
        return (await this.repo.findOne({ where: { id } })) ?? undefined;
    }
}
