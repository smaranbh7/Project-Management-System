import { Avatar } from "@radix-ui/react-avatar"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons"
import { AvatarFallback } from "../../components/ui/avatar"
import UserList from "./UserList"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteIssue, updateIssueStatus } from "../../redux/Issue/Action"


function IssueCard({item, projectId}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleIssueDelete=()=>{
        dispatch(deleteIssue(item.id))
    }
    
  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 
          className="text-white font-medium cursor-pointer hover:text-blue-400 transition-colors line-clamp-2 flex-1 mr-2" 
          onClick={()=>navigate(`/project/${projectId}/issue/${item.id}`)}
        >
          {item.title}
        </h4>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded transition-all duration-200">
              <DotsVerticalIcon className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
            <DropdownMenuItem 
              onClick={handleIssueDelete}
              className="text-red-400 hover:bg-red-900/20 hover:text-red-300"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">
          #{item.id}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center w-7 h-7 bg-slate-700/50 hover:bg-slate-600/50 rounded-full transition-colors">
              {item.assignee ? (
                <span className="text-xs font-medium text-white">
                  {item.assignee.fullName[0]}
                </span>
              ) : (
                <PersonIcon className="w-3 h-3 text-slate-400" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 border-slate-700">
            <UserList issueDetails={item}/>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default IssueCard
