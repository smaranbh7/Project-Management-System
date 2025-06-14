import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatByProject, fetchChatMessages, sendMessage } from "../../redux/Chat/Action";
import { useParams } from "react-router-dom";

function ChatBox() {
    const dispatch = useDispatch()
    const [message, setMessage] = useState("");
    const { auth, chat } = useSelector(store=>store)
    const { id } = useParams();

    useEffect(()=>{
      dispatch(fetchChatByProject(id))
    },[id])

    useEffect(()=>{
      if (chat.chat?.id) {
        dispatch(fetchChatMessages(chat.chat.id))
      }
    },[chat.chat?.id])

    // Poll for new messages every 5 seconds
    useEffect(() => {
      if (chat.chat?.id) {
        const interval = setInterval(() => {
          dispatch(fetchChatMessages(chat.chat.id))
        }, 5000)
        return () => clearInterval(interval)
      }
    }, [chat.chat?.id])

    const handleSendMessage = () => {
      if (!message.trim()) return;
      dispatch(sendMessage({
        senderId:auth.user?.id,
        projectId:id,
        content:message
      }))
      setMessage("")
    }
    
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    }
    
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Team Chat</h2>
        <p className="text-sm text-slate-400">
          {chat.messages?.length || 0} messages
        </p>
      </div>
      
      {/* Messages */}
      <ScrollArea className="h-[400px] p-4">
        <div className="space-y-4">
          {chat.messages?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            chat.messages?.map((item, index) =>
              item.sender.id !== auth.user.id ? (
                <div className="flex gap-3" key={`message-${index}`}>
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-slate-700 text-white text-xs">
                      {item.sender.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg rounded-tl-sm p-3 max-w-[80%]">
                    <p className="text-xs text-slate-400 mb-1">{item.sender.fullName}</p>
                    <p className="text-white text-sm">{item.content}</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 justify-end" key={`message-${index}`}>
                  <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg rounded-tr-sm p-3 max-w-[80%] border border-blue-500/30">
                    <p className="text-xs text-blue-300 mb-1">{item.sender.fullName}</p>
                    <p className="text-white text-sm">{item.content}</p>
                  </div>
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      {item.sender.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )
            )
          )}
        </div>
      </ScrollArea>
      
      {/* Message Input */}
      <div className="p-4 border-t border-white/10">
        <div className="relative">
          <Input 
            placeholder="Type a message..."
            className="pr-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
            value={message} 
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 rounded-lg transition-colors"
          >
            <PaperPlaneIcon className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2">Press Enter to send</p>
      </div>
    </div>
  );
}

export default ChatBox;
