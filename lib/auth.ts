import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

type SessionPayload = {
  id: string;
  firstName: string;
  username: string;
  expires: Date;
};

export const encrypt = async (payload: SessionPayload) => {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("10 hours").sign(key);
};

export const decrypt = async (session: string): Promise<JWTPayload & SessionPayload> => {
  const { payload } = await jwtVerify(session, key, {
    algorithms: ["HS256"],
  });
  return payload as JWTPayload & SessionPayload;
};

export const getSession = async () => {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
};

export const updateSession = async (req: NextRequest) => {
  const session = req.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 10);

  const res = NextResponse.next();

  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });

  return res;
};
