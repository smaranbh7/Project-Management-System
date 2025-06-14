import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge"
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { deleteProject } from "../../redux/Project/Action";


function ProjectCard({item}) {
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const handleDelete =()=>{
    dispatch(deleteProject(item.id ))
  };
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-64 flex flex-col">
      {/* Header with menu */}
      <div className="flex items-start justify-between mb-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50">
          {item.category}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
              <DotsVerticalIcon className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
            <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">
              Update
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete} 
              className="text-red-400 hover:bg-red-900/20 hover:text-red-300"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Project Title */}
      <div className="mb-4 flex-grow">
        <h3 
          onClick={()=>navigate("/project/"+item.id)} 
          className="text-lg font-semibold text-white cursor-pointer hover:text-blue-400 transition-colors mb-3 line-clamp-2 leading-tight"
        >
          {item.name}
        </h3>
        
        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>
      
      {/* Tags at bottom */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {item.tags.slice(0, 3).map((tag)=>(
          <span 
            key={tag.id} 
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
          >
            {tag}
          </span>
        ))}
        {item.tags.length > 3 && (
          <span className="text-xs text-slate-400 px-2 py-1">
            +{item.tags.length - 3}
          </span>
        )}
      </div>
      
      {/* Subtle border accent */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default ProjectCard;
