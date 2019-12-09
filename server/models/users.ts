import { Schema, model } from 'mongoose';
import { usersSeed } from '../configurations/seed';

const usersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  }
});

/** Users Collection Model Definition*/
const usersModel = model('users', usersSchema);

/** Function to seed Users data */
export const seed = () => {
  usersModel.collection.insert(usersSeed, (err, users) => {
    if (err) {
      console.log('error occurred in populating database');
    } else {
      console.log('Users table populated...');
    }
  });
};

export const getAll = (showIDs = false) =>
  usersModel.find({}, showIDs ? null : '-_id');

export default usersSchema;
