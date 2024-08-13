import adminModels from "@/models/admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { username, role } = body;

    if (!username || !role) {
      return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
    }

    await adminModels.updateIsActiveByUsername(username, false);

    cookies().set("session", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return NextResponse.json({ message: "Logout success" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Logout failed" }, { status: 400 }); 
  }
}