System.register(["sequelize-typescript", "./comment", "./user"], function (exports_1, context_1) {
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
    var sequelize_typescript_1, comment_1, user_1, sequelize_typescript_2, Post;
    return {
        setters: [
            function (sequelize_typescript_1_1) {
                sequelize_typescript_1 = sequelize_typescript_1_1;
                sequelize_typescript_2 = sequelize_typescript_1_1;
            },
            function (comment_1_1) {
                comment_1 = comment_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }
        ],
        execute: function () {
            Post = class Post extends sequelize_typescript_1.Model {
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
                sequelize_typescript_1.HasMany(() => comment_1.Comment),
                __metadata("design:type", Array)
            ], Post.prototype, "comments", void 0);
            __decorate([
                sequelize_typescript_1.BelongsTo(() => user_1.User),
                __metadata("design:type", user_1.User)
            ], Post.prototype, "user", void 0);
            Post = __decorate([
                sequelize_typescript_1.Table
            ], Post);
            exports_1("Post", Post);
        }
    };
});
//# sourceMappingURL=post.js.map