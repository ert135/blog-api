System.register(["sequelize-typescript", "./post", "./comment"], function (exports_1, context_1) {
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
    var sequelize_typescript_1, post_1, comment_1, User;
    return {
        setters: [
            function (sequelize_typescript_1_1) {
                sequelize_typescript_1 = sequelize_typescript_1_1;
            },
            function (post_1_1) {
                post_1 = post_1_1;
            },
            function (comment_1_1) {
                comment_1 = comment_1_1;
            }
        ],
        execute: function () {
            User = class User extends sequelize_typescript_1.Model {
            };
            __decorate([
                sequelize_typescript_1.Column,
                __metadata("design:type", String)
            ], User.prototype, "username", void 0);
            __decorate([
                sequelize_typescript_1.Column,
                __metadata("design:type", Date)
            ], User.prototype, "password", void 0);
            __decorate([
                sequelize_typescript_1.Column,
                __metadata("design:type", String)
            ], User.prototype, "email", void 0);
            __decorate([
                sequelize_typescript_1.Column,
                __metadata("design:type", Boolean)
            ], User.prototype, "admin", void 0);
            __decorate([
                sequelize_typescript_1.HasMany(() => comment_1.Comment),
                __metadata("design:type", Array)
            ], User.prototype, "comments", void 0);
            __decorate([
                sequelize_typescript_1.HasMany(() => post_1.Post),
                __metadata("design:type", Array)
            ], User.prototype, "posts", void 0);
            User = __decorate([
                sequelize_typescript_1.Table
            ], User);
            exports_1("User", User);
        }
    };
});
//# sourceMappingURL=user.js.map