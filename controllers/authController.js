import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  static userRegistration = async (req, res) => {
    // res.send("user registration");

    const { Username, Email, Password } = req.body;
    try {
      if (Username && Email && Password) {
        const isUser = await authModel.findOne({ Email: Email });
        if (!isUser) {
          //password hasing

          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(Password, genSalt);

          //save a user

          const newUser = new authModel({
            Username,
            Email,
            Password: hashedPassword,
          });

          const savedUser = await newUser.save();

          if (savedUser) {
            return res
              .status(200)
              .json({ message: "User registration successfully" });
          }
        } else {
          return res.status(400).json({ message: "email already registeres" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static userLogin = async (req, res) => {
    const { Email, Password } = req.body;
    try {
      if (Email && Password) {
        const isEmail = await authModel.findOne({ Email: Email });
        if (isEmail) {
          if (
            isEmail.Email === Email &&
            (await bcryptjs.compare(Password, isEmail.Password))
          ) {
            //token generate

            const token = jwt.sign({ userID: isEmail._id }, "pleaseSubscribe", {
              expiresIn: "2d",
            });
            return res.status(200).json({ message: "Login Successfully", token, name:isEmail.Username });

          } else {
            return res.status(400).json({ message: "Wrong Credentials" });
          }
        } else {
          return res.status(400).json({ message: "Email is not registered" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default AuthController;
