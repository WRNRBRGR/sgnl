export default function handler(request, response) {
  // Only expose the public keys to the frontend
  response.status(200).json({
    youtubeApiKey: process.env.YOUTUBE_API_KEY || '',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseKey: process.env.SUPABASE_KEY || ''
  });
}
