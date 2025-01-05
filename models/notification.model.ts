// models/notification.model.ts

import mongoose, { Schema, Document } from 'mongoose';

interface INotification extends Document {
    title: string;
    description: string;
    time: Date;
    type: 'success' | 'warning' | 'error' | 'info';
}

const notificationSchema = new Schema<INotification>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: Date, default: Date.now },
    type: { type: String, enum: ['success', 'warning', 'error', 'info'], required: true },
});

const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;
