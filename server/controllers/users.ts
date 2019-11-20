import { Schema } from 'mongoose';

const usersModel = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

export default usersModel;
