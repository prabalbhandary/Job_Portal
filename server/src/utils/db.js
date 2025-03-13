import mongoose from "mongoose";
import "colors"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully'.bgGreen.white);
    } catch (error) {
        console.log(`Error: ${error}`.bgRed.white);
    }
}
export default connectDB;