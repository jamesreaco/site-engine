import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  (await draftMode()).disable();

  const referer = request.headers.get("referer");
  
  const redirectTo = referer && new URL(referer).origin === request.nextUrl.origin
    ? referer
    : new URL("/", request.url);

  return NextResponse.redirect(redirectTo);
};