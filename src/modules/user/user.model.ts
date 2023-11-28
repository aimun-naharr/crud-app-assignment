import mongoose from 'mongoose';
import TUser from './user.interface';
const { Schema } = mongoose;

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  fullname: {
    firstName: { type: String, required: true, max: 10 },
    lastName: { type: String, required: true, max: 10 },
  },
  age: { type: Number },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
