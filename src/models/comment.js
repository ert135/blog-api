System.register(["sequelize-typescript", "./user", "./post"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var sequelize_typescript_1, user_1, post_1, sequelize_typescript_2, Comment;
    return {
        setters: [
            function (sequelize_typescript_1_1) {
                sequelize_typescript_1 = sequelize_typescript_1_1;
                sequelize_typescript_2 = sequelize_typescript_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (post_1_1) {
                post_1 = post_1_1;
            }
        ],
        execute: function () {
            Comment = class Comment extends sequelize_typescript_1.Model {
            };
            __decorate([
                sequelize_typescript_1.Column(sequelize_typescript_2.DataType.TEXT),
                __metadata("design:type", String)
            ], Comment.prototype, "body", void 0);
            __decorate([
                sequelize_typescript_1.ForeignKey(() => post_1.Post),
                sequelize_typescript_1.Column,
                __metadata("design:type", Number)
            ], Comment.prototype, "postId", void 0);
            __decorate([
                sequelize_typescript_1.BelongsTo(() => post_1.Post),
                __metadata("design:type", post_1.Post)
            ], Comment.prototype, "post", void 0);
            __decorate([
                sequelize_typescript_1.ForeignKey(() => user_1.User),
                sequelize_typescript_1.Column,
                __metadata("design:type", Number)
            ], Comment.prototype, "userId", void 0);
            __decorate([
                sequelize_typescript_1.BelongsTo(() => user_1.User),
                __metadata("design:type", user_1.User)
            ], Comment.prototype, "user", void 0);
            Comment = __decorate([
                sequelize_typescript_1.Table
            ], Comment);
            exports_1("Comment", Comment);
        }
    };
});
//# sourceMappingURL=comment.js.map