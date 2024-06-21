import io, { Socket } from "socket.io-client";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "ws://127.0.0.1";
const CONNECTION_COUNT_UPDATED_CHANNEL = "chat:connection-count-updated";
const NEW_MESSAGE_CHANNEL = "chat:new-message";

type Message = {
  message: string;
  id: string;
  createdAt: string;
  port: string;
};

function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      reconnection: true,
      upgrade: true,
      transports: ["websocket", "polling"],
    });

    setSocket(socketIo);

    return function () {
      socketIo.disconnect();
    };
  }, []);

  return socket;
}

export default function Home() {
  const [newMessage, setNewMessage] = useState("");
  const messageListRef = useRef<HTMLOListElement | null>(null);
  const [connectionCount, setConnectionCount] = useState(0);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const socket = useSocket();

  function scrollBottom() {
    if (messageListRef.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 1000;
    }
  }

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("connected to socket");
    });

    socket?.on(NEW_MESSAGE_CHANNEL, (message: Message) => {
      setMessages((prevMess) => [...prevMess, message]);

      setTimeout(() => {
        scrollBottom();
      }, 0);
    });

    // socket?.on("disconnect", (reason) => {
    //   console.log("Disconnected from server:", reason);
    // });

    socket?.on(
      CONNECTION_COUNT_UPDATED_CHANNEL,
      ({ count }: { count: number }) => {
        setConnectionCount(count);
      }
    );
  }, [socket]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    socket?.emit(NEW_MESSAGE_CHANNEL, {
      message: newMessage,
    });
    setNewMessage("");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-[url('/bg.jpg')] p-4">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-4">
          In the room :{connectionCount}
        </h1>

        <ol
          className="flex flex-col items-start flex-1 overflow-y-scroll no-scrollbar overflow-x-hidden scrollbar-hide h-96 mb-4"
          ref={messageListRef}
        >
          {messages.map((m) => {
            return (
              <div className="w-full" key={m.id}>
              <div className="flex flex-col leading-1.5 mb-2.5 p-4">
                <HoverCard>
                  <HoverCardTrigger className="p-3 rounded-lg hover:bg-gray-400 transition">
                    {m.message}
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-white rounded-lg p-4 my-2 break-all">
                    <p className="text-sm text-gray-500">Created At: {m.createdAt}</p>
                    <p className="text-sm text-gray-500">Port No: {m.port}</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <hr className="border-t border-black" />
            </div>
            );
          })}
        </ol>

        <form onSubmit={handleSubmit} className="flex items-center">
          <Textarea
            className="flex-1 rounded-lg mr-4"
            placeholder="Let's chat"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            maxLength={256}
          />
          <Button className="h-full bg-blue-500 text-white rounded-lg p-3">
            Send Message
          </Button>
        </form>
        <p>* Hover to check the source of each message</p>
      </div>
    </main>
  );
}
