import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the IUser interface
interface IUser extends Document {
  _id: mongoose.Types.ObjectId;  // Use mongoose.Types.ObjectId
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
  coverPhoto: string;
  followers: Types.ObjectId[];  // Ensure that Types.ObjectId[] is used here
  following: Types.ObjectId[];
}

// Define the user schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  profilePicture: { type: String, default: '' },
  coverPhoto: { type: String, default: '' },
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],  // Use mongoose.Types.ObjectId for schema arrays
  following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
