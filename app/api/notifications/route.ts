// app/api/notifications/route.ts

import { NextResponse } from 'next/server';
import Notification from '@/models/notification.model';
import connectDB from '@/dbConfig/dbConfig';

await connectDB();

export async function GET() {
    try {
        const notifications = await Notification.find().sort({ time: -1 }).limit(10); // Fetch the latest 10 notifications
        return NextResponse.json(notifications);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching notifications' }, { status: 500 });
    }
}
