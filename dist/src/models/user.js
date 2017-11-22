var mongoose_1 = require('mongoose');
var bcrypt = require('bcryptjs');
var beautifyUnique = require('mongoose-beautiful-unique-validation');
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
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        return next();
    });
});
UserSchema.statics.authenticate = function (email, password) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: email })
            .exec()
            .then(function (user) {
            bcrypt.compare(password, user.password, function (error, result) {
                if (result === true) {
                    return resolve(user);
                }
                else {
                    return resolve();
                }
            });
        }).catch(function (error) {
            return reject(error);
        });
    });
};
var User = mongoose_1.model('User', UserSchema);
exports.User = User;
