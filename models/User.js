const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = mongoose.model(
  'User',
  new Schema(
    {
      name: {
        type: 'string',
        required: true,
      },
      secondname: {
        type: 'string',
        required: true,
      },
      age: {
        type: 'number',
        required: true,
      },
      email: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
    },
    // Created at, updated at
    { timestamps: true },
  ),
);

module.exports = User;
