import { Service } from "typedi";
import { DataSource } from "typeorm";
import { Guild } from "../entities/guild.entity";

@Service()
export class GuildRepository {
    private repo;

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(Guild);
    }

    public async getGuildById(id: string): Promise<Guild | undefined> {
        return (await this.repo.findOne({ where: { id } })) ?? undefined;
    }
}