"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: "Email already used",
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: false
    },
    admin: {
        type: Boolean,
        required: true
    }
});
exports.UserSchema = UserSchema;
UserSchema.plugin(beautifyUnique);
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        return next();
    });
});
UserSchema.statics.authenticate = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email })
            .exec()
            .then((user) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result === true) {
                    return resolve(user);
                }
                else {
                    return resolve();
                }
            });
        }).catch((error) => {
            return reject(error);
        });
    });
};
const User = mongoose_1.model('User', UserSchema);
exports.User = User;
