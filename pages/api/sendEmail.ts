import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

require('dotenv').config()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
    const { name, email, message } = req.body;

    // Validate form data
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.APP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
        from: {
            name: 'SBC',
            address: process.env.USER
        },
        to: email,
        subject: 'Message Received',
        text: `Hi ${name},\n\nThank you for your message:\n\n${message}`,
        cc: process.env.USER,
    });

    // Return success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
