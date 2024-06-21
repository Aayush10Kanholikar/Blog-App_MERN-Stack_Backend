import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  Username: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
});

const authModel = mongoose.model("users", authSchema);

export default authModel;
