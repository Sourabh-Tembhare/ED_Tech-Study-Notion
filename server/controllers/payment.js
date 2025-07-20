const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const Payment = require("../models/Payment");
require("dotenv").config();

//  ORDER CREATION
exports.order = async (req, res) => {
  try {
    let { amount } = req.body;
    amount = Number(amount); // ensure numeric

    console.log("Received amount from frontend:", amount);

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount provided" });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json(order);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

//  VERIFY PAYMENT
exports.verify = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      courseId,
    } = req.body;

    const course = await Course.findById(courseId);

    if (!course || course.studentsEnrolled.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Course is already purchased",
      });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId,
        courseId,
      });

      await payment.save();

      await Course.findByIdAndUpdate(
        courseId,
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      const updatedUser = await User.findByIdAndUpdate(userId,{
        $push:{courses:courseId}
      },{new:true});

      return res.json({ message: "Payment Successful" });
    } else {
      return res.status(400).json({ message: "Invalid Signature" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Payment Verification Failed" });
  }
};
