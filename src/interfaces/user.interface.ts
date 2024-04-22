import { Document, ObjectId } from 'mongoose';
import Role from '../config/roles';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role: Role.ADMIN | Role.SYSTEM_ADMIN | Role.BUSINESS_OWNER | Role.SUPER_ADMIN;
    businessId?: ObjectId;
    isActive?: boolean;
    verificationCode?: string;
    passwordResetCode?: string;
    verificationCodeExpires?: number;
    firstTimeLogin?: boolean;
    avater: { url: string, public_id: string }
}

export default IUser;
