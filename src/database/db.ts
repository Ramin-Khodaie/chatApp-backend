import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (process.env.MONGODB_URL) {
            await mongoose.connect(process.env.MONGODB_URL, {
            })
        }
    } catch (error) {
        console.log('Error connecting to MongoDB:', error)
    }
}


if (process.env.NODE_ENV !== "production") {
    const mDB = mongoose.connection;
    mDB.on("open", () => {
        console.log("mongo is open");
    });
    mDB.on("error", (error) => {
        console.log(error);
    });
}


export default connectDB;