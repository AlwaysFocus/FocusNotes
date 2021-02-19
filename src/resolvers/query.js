const { models } = require('mongoose');

module.exports = {
  // Construct our resolver function
  notes: async () => {
    return await models.Note.find();
  },
  note: async (parent, args) => {
    return await models.Note.findById(args.id);
  }
};
