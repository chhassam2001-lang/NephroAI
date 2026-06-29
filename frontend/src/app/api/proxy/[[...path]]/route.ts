import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path);
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, ngrok-skip-browser-warning",
    },
  });
}

async function handleProxy(request: NextRequest, pathArray?: string[]) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
    return NextResponse.json({ error: "Backend URL not configured" }, { status: 500 });
  }

  // Handle the root path '/' case if pathArray is undefined or empty
  const path = pathArray && pathArray.length > 0 ? `/${pathArray.join("/")}` : "/";
  const searchParams = request.nextUrl.search;
  const url = `${backendUrl}${path}${searchParams}`;

  try {
    const headers = new Headers(request.headers);
    // Important: we MUST remove host, otherwise ngrok/cloudflare gets confused
    headers.delete("host");
    headers.delete("referer");
    
    // Always attach the ngrok bypass header
    headers.set("ngrok-skip-browser-warning", "69420");

    const reqInit: RequestInit = {
      method: request.method,
      headers,
      redirect: "follow",
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      const body = await request.blob();
      reqInit.body = body;
    }

    console.log(`[PROXY] Fetching: ${reqInit.method} ${url}`);
    
    const response = await fetch(url, reqInit);

    // Read the response body
    const data = await response.blob();

    // Copy response headers
    const resHeaders = new Headers(response.headers);
    // Add permissive CORS
    resHeaders.set("Access-Control-Allow-Origin", "*");
    
    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Proxy failed to reach backend" }, { status: 502 });
  }
}
