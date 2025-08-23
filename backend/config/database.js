const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    // Use modern URL parser and topology (silences deprecation warnings on Mongoose v5)
    const con = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    // Avoid deprecated findAndModify/ensureIndex paths
    mongoose.set('useFindAndModify', false);
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
