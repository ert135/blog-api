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
const comment_1 = require("./comment");
const user_1 = require("./user");
const sequelize_typescript_2 = require("sequelize-typescript");
let Post = class Post extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Post.prototype, "subtitle", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Post.prototype, "pictureUrl", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_2.DataType.DATE),
    __metadata("design:type", Object)
], Post.prototype, "postedOnDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Post.prototype, "top", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_2.DataType.TEXT),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => comment_1.default),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => user_1.default),
    __metadata("design:type", user_1.default)
], Post.prototype, "user", void 0);
Post = __decorate([
    sequelize_typescript_1.Table
], Post);
exports.default = Post;
