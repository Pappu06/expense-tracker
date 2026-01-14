import UserModel from "./user.model.js";
import { SendMail } from "../utils/mail.js";
import { otptamplate } from "../utils/otp.tamplate.js";
import { generateOTP } from "../utils/generate.otp.js";

/**
 * SIGNUP + PROFILE CREATION
 */
export const signup = async (req, res) => {
  try {
    const { fullname, email, password, mobile } = req.body;

    if (!fullname || !email || !password || !mobile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    // 2️⃣ Check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 3️⃣ Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // 4️⃣ Create user (NOT verified yet)
    const user = new UserModel({
      fullname,
      email,
      password,
      mobile,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await user.save();

    // 5️⃣ Send OTP email
    await SendMail(email, "Verify your account", otptamplate(otp));

    res.status(201).json({
      success: true,
      message: "Signup successful. OTP sent to email",
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

/**
 * VERIFY OTP
 */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    console.error("OTP error:", error.message);
    res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // ✅ SEND USER PROFILE
    res.json({
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

