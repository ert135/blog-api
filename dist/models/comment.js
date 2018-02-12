"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const Post_1 = require("./Post");
const sequelize_typescript_2 = require("sequelize-typescript");
let Comments = class Comments extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_2.DataType.TEXT),
    __metadata("design:type", String)
], Comments.prototype, "body", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Post_1.default),
    __metadata("design:type", Post_1.default)
], Comments.prototype, "post", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Post_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Comments.prototype, "postid", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => User_1.default),
    __metadata("design:type", User_1.default)
], Comments.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => User_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Comments.prototype, "userId", void 0);
Comments = __decorate([
    sequelize_typescript_1.Table
], Comments);
exports.default = Comments;
