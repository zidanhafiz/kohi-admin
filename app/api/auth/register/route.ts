import { NextRequest, NextResponse } from "next/server";
import adminModels from "@/models/admin";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { firstName, lastName, username, phone, email, password, role } = body;

    if (!firstName || !lastName || !username || !phone || !email || !password || !role) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const isEmailExist = await adminModels.getAdminByEmail(email);

    if (isEmailExist) {
      return NextResponse.json({ message: "Email already exist" }, { status: 400 });
    }

    const isUsernameExist = await adminModels.getAdminByUsername(username);

    if (isUsernameExist) {
      return NextResponse.json({ message: "Username already exist" }, { status: 400 });
    }

    const isPhoneExist = await adminModels.getAdminByPhone(phone);

    if (isPhoneExist) {
      return NextResponse.json({ message: "Phone already exist" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await adminModels.createAdmin({
      firstName,
      lastName,
      username,
      phone,
      email,
      password: hashedPassword,
      role: role.toUpperCase(),
    });

    return NextResponse.json(
      { message: "Success created new Admin account", data: { id: admin.id, firstName: admin.firstName, lastName: admin.lastName } },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "hello buddy" }, { status: 400 });
    }
    return NextResponse.json({ message: "Error occured while creating admin" }, { status: 400 });
  }
};
