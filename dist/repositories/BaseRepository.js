"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    listAll() {
        return this.model.findAll({
            where: {
                id: {
                    gt: 0
                }
            }
        });
    }
    findById(id) {
        return this.model.findById(id);
    }
}
exports.default = BaseRepository;