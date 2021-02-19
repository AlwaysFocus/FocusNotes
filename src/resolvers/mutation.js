const { models } = require("mongoose")

module.exports = {
    // Construct our resolver function
    newNote: async(parent, args) => {
        return await models.Note.create({
            content: args.content,
            author: 'Eli Whalen'
        });
    }
}