import mongoose from "mongoose";

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("error", (error) => {
            console.error(`MongoDB Error: ${error.message}`);
            process.exit(1);
        });
        connection.on("disconnected", () => {
            console.error("MongoDB Disconnected");
        });
        connection.on("connected", () => {
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        });

    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}