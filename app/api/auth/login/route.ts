import adminModels from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const admin = await adminModels.getAdminByUsername(username);

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const { id, firstName } = admin;

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 10);
    const session = await encrypt({ id, firstName, username, expires });

    cookies().set("session", session, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires,
    });

    return NextResponse.json({ message: "Login success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 400 });
  }
};
