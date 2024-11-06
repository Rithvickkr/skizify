import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Get authenticated user session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();
    console.log("formData: ", formData);
    const file = formData.get('file') as File;

    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    // Convert file to base64 string
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
    console.log("base64Image: ", base64Image);

    // Update user's avatar in database
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        userImage: base64Image
      }
    });

    return Response.json({ success: true, user: updatedUser });

  } catch (error) {
    console.error('Error uploading avatar:', error);
    return new Response('Error uploading avatar', { status: 500 });
  }
}

