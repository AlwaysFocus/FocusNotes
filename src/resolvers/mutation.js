const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../util/gravatar');

module.exports = {
  // Construct our resolver function
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: 'Eli Whalen'
    });
  },

  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  updateNote: async (parent, { content, id }, { models }) => {
    return await models.Note.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          content
        }
      },
      {
        new: true
      }
    );
  },

  signUp: async (parent, { username, email, password }, { models }) => {
    // convert email to all lowercase and remove whitespace
    email = email.trim().toLowerCase();
    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create user avatar
    const avatar = gravatar(email);

    try {
      const user = await models.User.create({
        username,
        email,
        password: hashed,
        avatar
      });

      // create and pass back JWT
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (error) {
      console.log(error);
      throw new Error(
        'There was an error when attempting to create your account.'
      );
    }
  }
};
