const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, password, mail } = req.body;
    const userExists = await User.exists({ mail: mail.toLowerCase() });

    if (userExists) {
      return res.status(409).send("This email is already in use.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

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
    return res.status(500).send(err);
  }
};

module.exports = postRegister;
