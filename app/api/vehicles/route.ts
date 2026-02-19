import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';


export async function GET() {
    try {
        const db = (await clientPromise).db(process.env.DB_NAME);
        const vehicles = await db.collection('vehicles').find().toArray();
        return NextResponse.json(vehicles);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Internal server error.'}, { status: 500})
    }
}