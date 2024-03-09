import mongoose from "mongoose";
mongoose.set('sanitizeFilter', true);
mongoose.set('strictQuery', true);

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_LOCAL_PORT, MONGODB_DB } = process.env;

const url = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_LOCAL_PORT}/${MONGODB_DB}?authSource=admin`;

// const url = 'mongodb://root:P%2540ssw0rd@mongodb:27017'

mongoose.connect(url);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database is connected');
});
