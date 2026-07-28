import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import setTokenCookie from "../utils/setTokenCookie.js";

export const registerByMail = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    // if (!name || !email || !password) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required to register the user!",
    //   });
    // }

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "local",
    });

    // Login immediately after signup
    const token = generateToken(user._id);

    setTokenCookie(res, token);

    res.status(201).json({
      success: true,

      message: "Registration Successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });

  } catch (error) {
    // console.error(error);

    // res.status(500).json({
    //   success: false,
    //   message: "Server Error while authenticating!",
    // });
    next(error);
  }
};

export const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials, user not found!"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials, enter correct password"
            });
        }

        const token = generateToken(user._id);

        setTokenCookie(res, token);

        res.status(200).json({
            success: true,

            message: "Login Successful",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                avatar: user.avatar,

                role: user.role

            }

        });

    }

    catch (err) {

        next(err);

    }

}

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


//Google Authentication
export const googleCallback = async (req, res) => {

    const user = req.user;

    const token = generateToken(user._id);

    setTokenCookie(res, token);

    res.redirect(
        `${process.env.CLIENT_URL}/`
    );

};


export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};






