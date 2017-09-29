import { Document, Schema, Model, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as beautifyUnique from 'mongoose-beautiful-unique-validation';
import { IUserDocument, IUser, IUserModel } from '../interfaces/IUserDocument';

var UserSchema: Schema = new Schema({
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
})

UserSchema.plugin(beautifyUnique);

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err){
            return next(err);
        }
        user.password = hash;
            return next();
        }
    )
});

UserSchema.statics.authenticate = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        User.findOne({email: email})
            .exec()
            .then((user: IUser) => {
                bcrypt.compare(password, user.password, (error, result) => {
                    if (result === true) {
                        return resolve(user)
                    }else {
                        return resolve();
                    }
                })
            }).catch((error) => {
                return reject(error)
            })
    })
}

const User = model<IUser, IUserModel>('User', UserSchema);

export {
    User,
    UserSchema
}