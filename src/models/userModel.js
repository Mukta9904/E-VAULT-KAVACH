import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: { value: true, message: "Email is required" },
  },
  username: {
    type: String,
    required: { value: true, message: "Username is required" },
    
  },
  password: {
    type: String,
    required: { value: true, message: "Password is required" },
    
  },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date },
  isAdmin: { type: Boolean, default: false },
  forgotToken: { type: String },
  forgotTokenExpiry: { type: Date },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
  passwordFolder: {
    type: Schema.Types.ObjectId,
    ref: 'PasswordFolder'
  },
  paymentFolder: {
    type: Schema.Types.ObjectId,
    ref: 'PaymentFolder'
  }
});

const passwordFolderSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  passwords: [{
    siteName: { type: String, required: true },
    loginId: { type: String, required: true },
    password: { type: String, required: true } ,// Store encrypted passwords
    siteUrl: { type: String, required: true },
  }]
});

// Payment Folder Schema
const paymentFolderSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentCards: [{
    
    cardTitle:{ type: String, required: true },
    cardNumber: { type: String, required: true }, // Store encrypted
    expiryMonth: { type: String, required: true }, // Store encrypted
    expiryYear: { type: String, required: true }, // Store encrypted
    cvv: { type: String, required: true }, // Store encrypted
    cardHolderName: { type: String, required: true }, // Store encrypted
  }]
});
const keySchema = new mongoose.Schema({
  userId : {type : String, required: true},
  key : {type : String, required: true},
  iv : {type : String, required: true},
})

const User = mongoose.models.users || mongoose.model("users", userSchema);
const PasswordFolder = mongoose.models.PasswordFolder || mongoose.model('PasswordFolder', passwordFolderSchema);
const PaymentFolder = mongoose.models.PaymentFolder || mongoose.model('PaymentFolder', paymentFolderSchema);
const KeyFolder = mongoose.models.KeyFolder || mongoose.model('KeyFolder', keySchema)

export { User, PasswordFolder, PaymentFolder , KeyFolder};


