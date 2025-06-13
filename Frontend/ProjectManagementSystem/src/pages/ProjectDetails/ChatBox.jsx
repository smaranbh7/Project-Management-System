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
      dispatch(sendMessage({
        senderId:auth.user?.id,
        projectId:id,
        content:message
      }))
      setMessage("")
        console.log("Message: ", message);
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
  return (
    <div className="sticky">
      <div className="border-rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {chat.messages?.map((item, index) =>
            item.sender.id!==auth.user.id ? (
              <div className="flex gap-2 mb-2 justify-start" key={`message-${index}`}>
                <Avatar>
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                  <p>{item.sender.fullName}</p>
                  <p className="text-gray-300">{item.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 mb-2 justify-end" key={`message-${index}`}>
                <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                  <p>{item.sender.fullName}</p>
                  <p className="text-gray-300">{item.content}</p>
                </div>
                <Avatar>
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
              </div>
            )
          )}
        </ScrollArea>
        <div className="relative p-0">
            <Input placeholder="Type Message..."
            className="py-7 border-t outline-none focus:outline-none
             focus:ring-0 rounded-none border-b-0 border-x-0"
             value={message} onChange={handleMessageChange}
            />
            <Button onClick={handleSendMessage} className="absolute right-2 top-3 rounded-full " 
            size="icon" variant="ghost">
                <PaperPlaneIcon/>
            </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
