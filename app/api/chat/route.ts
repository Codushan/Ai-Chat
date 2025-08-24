import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request: Request){
    try {
        const {message} = await request.json()

        const completion = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        })

        const result = await completion.generateContent(message);

        return Response.json({
            response: result.response.text(),
        })
    } catch (error) {
        console.error("Gemini API Error:", error);
    return Response.json(
      { error: error.message || "failed to process request" },
      { status: 500 }
    );
    }
}