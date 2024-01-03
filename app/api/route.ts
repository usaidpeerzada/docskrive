export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  return new Response("DocSkrive", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
