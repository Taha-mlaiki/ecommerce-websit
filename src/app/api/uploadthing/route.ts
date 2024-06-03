import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandler } from 'uploadthing/server';
import { ourFileRouter } from './core';

const { GET: getHandler, POST: postHandler } = createRouteHandler({
  router: ourFileRouter,
});

export async function GET(req: NextRequest) {
  // Call the handler and convert the response to NextResponse
  const response = await getHandler(req);
  return new NextResponse(response.body, { status: response.status, headers: response.headers });
}

export async function POST(req: NextRequest) {
  // Call the handler and convert the response to NextResponse
  const response = await postHandler(req);
  return new NextResponse(response.body, { status: response.status, headers: response.headers });
}
