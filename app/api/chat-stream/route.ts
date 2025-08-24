import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request: Request){
    try {
        const {message} = await request.json()

        const completion = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        })

        const result = await completion.generateContentStream(message);

        const encoder = new TextEncoder();

        const readable = new ReadableStream({
            async start(controller) {
            for await (const chunk of result.stream) {
                const text = chunk.text();
            if (text) {
                controller.enqueue(encoder.encode(text));
            }
        }
        controller.close();
        },
        });

        return new Response(readable, {
            headers: {
            'Content-Type': "text/plain; charset=utf-8",
            'Cache-Control': "no-cache",
            'Connection': "keep-alive"
        },
        })
    } catch (error) {
        console.error("Gemini API Error:", error);
        return Response.json(
        { error: error.message || "failed to process request" },
        { status: 500 }
        );
    }
}