import { PaperPlaneIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

function FreePlanChatDisplay() {
  const mockMessages = [
    {
      sender: { fullName: "John Doe", id: "1" },
      content: "Hey team, how's the project coming along?"
    },
    {
      sender: { fullName: "Jane Smith", id: "2" },
      content: "Making good progress on the frontend components!"
    },
    {
      sender: { fullName: "Mike Johnson", id: "3" },
      content: "Backend API is almost ready for testing"
    }
  ];

    const navigate= useNavigate();

  return (
    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Team Chat</h2>
        <p className="text-sm text-slate-400">
          {mockMessages.length} messages
        </p>
      </div>
      
      {/* Blurred Messages */}
      <ScrollArea className="h-[400px] p-4 relative">
        <div className="space-y-4 blur-sm pointer-events-none select-none">
          {mockMessages.map((item, index) => (
            <div className="flex gap-3" key={`mock-message-${index}`}>
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
          ))}
        </div>
        
        {/* Upgrade Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <LockClosedIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Unlock Team Chat
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Collaborate with your team in real-time. Get instant notifications, share ideas, and stay connected throughout your project.
            </p>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            onClick={()=>navigate("/upgrade_plan")}>
              Upgrade to Pro Plan
            </Button>
            <p className="text-xs text-slate-400 mt-3">
              Starting at $8/month
            </p>
          </div>
        </div>
      </ScrollArea>
      
      {/* Disabled Message Input */}
      <div className="p-4 border-t border-white/10">
        <div className="relative opacity-50 pointer-events-none">
          <Input 
            placeholder="Type a message..."
            className="pr-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            disabled
          />
          <button 
            disabled
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-slate-600 opacity-50 rounded-lg"
          >
            <PaperPlaneIcon className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          <LockClosedIcon className="w-3 h-3 inline mr-1" />
          Chat access requires Pro Plan
        </p>
      </div>
    </div>
  );
}

export default FreePlanChatDisplay;