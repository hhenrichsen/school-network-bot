import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { Network } from '../entities/network.entity';
import { ShareId } from '../entities/shareid.entity';

@Service()
export class ShareIdRepository {
    private repo;

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(ShareId);
    }

    public async getShareIdById(id: string): Promise<ShareId | undefined> {
        return (await this.repo.findOne({ where: { id } })) ?? undefined;
    }

    public async getShareIdsByNetwork(network: Network): Promise<ShareId[] | undefined> {
        return (await this.repo.find({ where: { network } })) ?? undefined;
    }
}
