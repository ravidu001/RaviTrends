import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    
    // Profile information fields
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    houseNo: { type: String, default: '' },
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    district: { type: String, default: '' },
    province: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    
    // Account status
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null }
}, { minimize: false, timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel; 