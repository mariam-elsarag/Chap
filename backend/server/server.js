import mongoose from "mongoose";
import app from "../app.js";

// Db connection
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connected 🔥");
});

// Application connect
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("App work 🔥");
});
