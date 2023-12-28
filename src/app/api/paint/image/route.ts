import { NextResponse, type NextRequest } from "next/server";

// POST api/paint/image
export async function POST(req: NextRequest) {
  const fd = new FormData();
  const reqBody = await req.json();

  fd.append("image", reqBody.image);
  fd.append("type", "base64");

  const response = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    body: fd,
    redirect: "follow",
  });

  const data = await response.json();

  return NextResponse.json(
    {
      image: data,
    },
    { status: 200 },
  );
}
