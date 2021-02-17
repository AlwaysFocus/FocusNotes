// Bring in Mongoose ODM to help interact with MongoDB
const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    // Use mongo drivers URL string parser
    mongoose.set('useNewUrlParser', true);

    // Use findOneAndUpdate() instead of findAndModify()
    mongoose.set('useFindAndModify', false);

    // Use createIndex() instead of ensureIndex()
    mongoose.set('useCreateIndex', true);

    // Use server discover/monitoring engine
    mongoose.set('useUnifiedTopology', true);

    // Connect to database
    mongoose.connect(DB_HOST);

    // Output errors
    mongoose.connection.on('error', err => {
      console.error(err);
      console.log(
        'There has been an error while trying to connect to MongoDB. Ensure it is running'
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connection.close();
  }
};
