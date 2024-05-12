// List of known SMTP servers
import { NextFunction, Request, Response } from "express";
const allowedSMTPServers = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'protonmail.com',
    'zoho.com',
    'fastmail.com',
    'gmx.com',
    'mail.com'
];

export const emailFilter = (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    if (allowedSMTPServers.includes(domain)) {
        next();
    } else {
        return res.status(403).json({ message: 'Email domain is not allowed for registration.' });
    }
};

