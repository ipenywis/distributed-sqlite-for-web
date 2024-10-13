import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const paragraph = await prisma.paragraph.findFirst({
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(paragraph);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching paragraph" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    const updatedParagraph = await prisma.paragraph.create({
      data: { content },
    });
    return NextResponse.json(updatedParagraph);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating paragraph" },
      { status: 500 }
    );
  }
}
