const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
      const { username, mail, password } = req.body;
  
      // check if user exists
      const userExists = await User.exists({ mail: mail.toLowerCase() });
  
      console.log(userExists);
  
      if (userExists) {
        return res.status(409).send("E-mail already in use.");
      }
  
      // encrypt password
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      // create user document and save in database
      const user = await User.create({
        username,
        mail: mail.toLowerCase(),
        password: encryptedPassword,
      });
  
      // create JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
  
      res.status(201).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
        },
      });
    } catch (err) {
      return res.status(500).send("Error occured. Please try again");
    }
  };
  
  const login = async (req, res) => {
    try {
      const { mail, password } = req.body;
  
      const user = await User.findOne({ mail: mail.toLowerCase() });
  
      console.log(user);
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // send new token
        const token = jwt.sign(
          {
            userId: user._id,
            mail,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "24h",
          }
        );
  
        return res.status(200).json({
          userDetails: {
            mail: user.mail,
            token: token,
            username: user.username,
          },
        });
      }
  
      return res.status(400).send("Invalid credentials. Please try again");
    } catch (err) {
      return res.status(500).send("Something went wrong. Please try again");
    }
  };

  module.exports = { register, login };