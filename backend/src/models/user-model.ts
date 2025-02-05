import mongoose, { Document, Schema } from 'mongoose';

export type IUser = Document;

const UserSchema: Schema = new Schema();

export default mongoose.model<IUser>('User', UserSchema);
