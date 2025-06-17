import React from "react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { TrashIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/Comment/Action";

function CommentCard({item}) {
  const dispatch =  useDispatch();

  const handleDelete = () =>{
    dispatch(deleteComment(item.id))
  }

  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarFallback className="bg-slate-700 text-white text-sm">
            {item.user.fullName[0]}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-medium">{item.user.fullName}</h4>
            <button 
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded transition-all duration-200"
            >
              <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-300" />
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed">{item.content}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
