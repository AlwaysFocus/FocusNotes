const { models } = require('mongoose');

module.exports = {
  // Construct our resolver function
  notes: async (parent, args, { models }) => {
    return await models.Note.find();
  },
  note: async (parent, args, { models }) => {
    return await models.Note.findById(args.id);
  }
};
