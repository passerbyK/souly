"use client";

//import { useChat } from "@/hooks/useChat";
//import { useRef } from "react";

import { GoHeartFill } from "react-icons/go";

function ChatPage({userId}: {userId: string}) {
  // const { messages, announcedMessage } = useChat({userId});
  // // console.log(userId);
  // // console.log(messages);
  // const { createMessage, announceMessage, unsendMessage } = useChat({userId});
  // const newmessageRef = useRef<HTMLInputElement>(null);

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault(); // prevent line break
  //     //console.log(newmessageRef.current?.value);
  //     if(!newmessageRef.current?.value) return;
  //     createMessage(newmessageRef.current?.value);
  //     newmessageRef.current.value = "";
  //     // commentreplyRef.current.dispatchEvent(
  //     //   new Event("input", { bubbles: true, composed: true }),
  //     // );
  //   }
  // };

  // console.log(messages);

  return (
    <div className="h-full w-full" style={{ backgroundColor: '#DFD3C4' }}>
      <div className="flex">
        <h1 className="text-6xl p-4" style={{ color: '#8E6920' }}>friend's name</h1>
        <h2 className="text-4xl p-8 ml-auto" style={{ color: '#998D73' }}>2023/12/09(Sat.)</h2>
      </div>
      <div className="mx-8 h-4/5 border-4 bg-white rounded-xl flex items-end" style={{ borderColor: '#7C5A16' }}>
        <div 
        className="flex w-full h-min rounded-b-lg text-5xl justify-between py-4 px-8" 
        style={{ backgroundColor: '#E8BA5D', borderColor: '#7C5A16' }}>
          topic
          <span className="flex gap-4 self-center">
            <GoHeartFill size={48}/> 2 
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
