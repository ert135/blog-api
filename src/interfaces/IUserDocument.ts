import { Document, Model } from 'mongoose';

interface IUserDocument extends Document {
    email: string;
    name: string;
    password: string;
    type: string;
    id: any;
    admin: boolean;
}

interface IUser extends IUserDocument {
    //put document specific functions here
}

interface IUserModel extends Model<IUser> {
    authenticate(email: string, password: string): Promise<IUser>;
}

export {
    IUserDocument,
    IUser,
    IUserModel
}
