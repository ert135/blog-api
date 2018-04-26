import { Model } from 'sequelize';

export default class BaseRepository {
    constructor(protected model: typeof Model){}

    public listAll(): any {
        return this.model.findAll({
            where: {
                id: {
                    gt:0
                }
            }
        });
    }

    public findById(id: number): any {
        return this.model.findById(id, {
            where: {
                id: id
            }
        });
    }

    public deleteById(id: number): any {
        return this.model.destroy({
            where: {
                id : id
            }
        });
    }
}
