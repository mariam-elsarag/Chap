import mongoose from "mongoose";
const connectToDb = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<db_password>",
      process.env.DATABASE_PASSWORD
    );

    await mongoose.connect(DB);
    console.log("DB connected 🔥");
  } catch (err) {
    console.log("Error connecting Db", err.message);
  }
};
export default connectToDb;
