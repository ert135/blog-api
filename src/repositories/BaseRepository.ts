import { Model } from 'sequelize';

export default class BaseRepository {
    constructor(protected model: any){}

    public listAll() : Promise<any> {
        return this.model.findAll({
            where: {
                id: {
                    gt:0
                }
            }
        });
    }

    public findById(id: number) : Promise<any> {
        return this.model.findById(id);
    }
}