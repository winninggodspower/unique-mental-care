import { generateToken04 } from "@/utils/zegoServerAssistant";

export const POST = async ({ request }) => {
  try {
    const { appId, userId, secret, effectiveTimeInSeconds, payload } = await request.json();
    
    // Validate the inputs
    if (!appId || !userId || !secret || !effectiveTimeInSeconds) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    // Generate the token
    const token = generateToken04(appId, userId, secret, effectiveTimeInSeconds, payload);

    // Return the token as a JSON response
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error('Error generating token:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
