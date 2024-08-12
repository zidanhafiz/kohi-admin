import { NextResponse } from "next/server"

export const POST = async () => {
  try {
    return NextResponse.json({ message: "Success bos" }, { status: 201 }) 
  } catch (error) {
    return NextResponse.json({ error: "Error bos" }, { status: 400 }) 
  }
}