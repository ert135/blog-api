import { Model } from 'sequelize';

export default class BaseRepository {
    constructor(protected model: typeof Model){}

    public listAll() {
        console.log('listall called!!!');
        return this.model.findAll({
            where: {
                id: {
                    gt:0
                }
            }
        });
    }
}