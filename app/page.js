"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Home() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState("");
  const [streamResponse, setStreamResponse] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleChat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({message}),
      })
      const data = await response.json()
      setResponse(data.response)
    } catch (error) {
      setResponse("Error: " + error.message)
    }
    setLoading(false);
  }

  const handleStreamChat = async () => {
    setStreaming(true);
    setStreamResponse("")

    try {
      const res = await fetch("/api/chat-stream",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({message})
      })
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let streamedText = "";

      while(true){
        const {done, value} = await reader.read()
        if(done) break;
        
        const text = decoder.decode(value, { stream: true });
        streamedText += text;
        setStreamResponse(streamedText);
      }
    } catch (error) {
      setStreamResponse("Error: " + error.message)
    }
    setLoading(false);
  }

  
  const commonButtonStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '1rem',
    flex: '1',
    minWidth: '140px',
  };

  const chatButtonStyle = {
    ...commonButtonStyle,
    backgroundColor: '#6b46c1',
    marginRight: '16px',
    opacity: loading ? 0.7 : 1,
  };

  const streamChatButtonStyle = {
    ...commonButtonStyle,
    backgroundColor: '#38b2ac',
    opacity: loading ? 0.7 : 1,
  };

  const responseContainerStyle = {
    minHeight: '100px',
    padding: '16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#f7fafc',
    color: '#2d3748',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    flex: '1',
    minWidth: '280px',
    fontFamily: 'Inter, sans-serif',
    lineHeight: '1.6',
    fontSize: '0.95rem'
  };

  const SIDE_BY_SIDE_BREAKPOINT = 768;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 16px',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '95%',
        minHeight:'90%',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        padding: '40px',
        boxSizing: 'border-box',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1a202c',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
          AI Chat Interface
        </h1>

        {/* Message Input */}
        <div style={{ marginBottom: '24px' }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={5}
            style={{
              width: '100%',
              padding: '16px',
              border: '1px solid #cbd5e0',
              borderRadius: '8px',
              outline: 'none',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
              fontSize: '1rem',
              color: '#000000ff',
              resize: 'vertical',
              transition: 'border-color 0.2s ease',
              background: '#cdf'
            }}
            onFocus={(e) => e.target.style.borderColor = '#805ad5'}
            onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
          />
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: windowWidth >= SIDE_BY_SIDE_BREAKPOINT ? 'row' : 'column',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <button
            style={chatButtonStyle}
            onClick={handleChat}
            disabled={loading}
          >
            {loading ? "Processing..." : "Standard Chat"}
          </button>
          <button
            style={streamChatButtonStyle}
            onClick={handleStreamChat}
            disabled={loading}
          >
            {loading ? "Streaming..." : "Stream Chat"}
          </button>
        </div>

        {/* Response Displays Container */}
        <div style={{
          display: 'flex',
          flexDirection: windowWidth >= SIDE_BY_SIDE_BREAKPOINT ? 'row' : 'column',
          gap: '24px',
          marginTop: '24px',
        }}>

          {/* Standard Response Display */}
          <div style={responseContainerStyle}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '12px',
            }}>
              Standard Response:
            </h2>
            {response || (loading && "Awaiting standard response...") || "No standard response yet."}
          </div>

          {/* Streamed Response Display */}
          <div style={responseContainerStyle}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '12px',
            }}>
              Streamed Response:
            </h2>
            {streamResponse || (loading && "Awaiting streamed response...") || "No streamed response yet."}
          </div>
        </div>
      </div>
    </div>
  );
}
