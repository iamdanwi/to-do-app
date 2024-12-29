import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.model';

interface SendEmailParams {
    email: string;
    emailType: 'verify' | 'reset' | 'login';
    userId?: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
    try {
        // Validate inputs
        if (!email || !emailType) {
            throw new Error('Please provide email and emailType');
        }

        if (emailType === 'verify' && !userId) {
            throw new Error('Please provide userId to send verification');
        }

        // Generate a token for verification or password reset
        const token = uuidv4();

        if (emailType === 'verify') {
            // Update user with verification token
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: token,
                    verifyTokenExpire: Date.now() + 3600000,
                } // 1 hour expiry
            });
        } else if (emailType === 'reset') {
            // Update user with reset password token
            await User.findOneAndUpdate(
                { email },
                {
                    forgotPasswordToken: token,
                    forgotPasswordTokenExpire: Date.now() + 3600000, // 1 hour expiry
                }
            );
        }

        // Email transport setup
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT as string, 10) || 587,
            secure: false, // Use true for port 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email content
        let subject = '';
        let htmlContent = '';

        if (emailType === 'verify') {
            subject = 'Verify Your Email Address';
            htmlContent = `
                <h1>Email Verification</h1>
                <p>Click the link below to verify your email:</p>
                <a href="${process.env.CLIENT_URL}/verify?token=${token}">Verify Email</a>
                <p>This link will expire in 1 hour.</p>
            `;
        } else if (emailType === 'reset') {
            subject = 'Reset Your Password';
            htmlContent = `
                <h1>Password Reset</h1>
                <p>Click the link below to reset your password:</p>
                <a href="${process.env.CLIENT_URL}/auth/reset/${token}">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
            `;
        } else if (emailType === 'login') {
            subject = 'New Login Notification';
            htmlContent = `
                <h1>New Login Notification</h1>
                <p>A login to your account was detected. If this wasn't you, please reset your password immediately.</p>
                <p>If it was you, you can ignore this email.</p>
            `;
        } else {
            throw new Error('Invalid emailType provided.');
        }

        // Mail options
        const mailOptions = {
            from: process.env.SMTP_FROM_EMAIL,
            to: email,
            subject: subject,
            html: htmlContent,
        };

        // Send email
        await transporter.sendMail(mailOptions);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error sending email: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
