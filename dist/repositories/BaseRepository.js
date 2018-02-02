"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    listAll() {
        console.log('list all called!!');
        return this.model.findAll({
            where: {
                id: {
                    gt: 0
                }
            }
        });
    }
}
exports.default = BaseRepository;
