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
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../redux/Project/Action";


function ProjectCard({item}) {
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const { project } = useSelector(store => store);
  
  const handleDelete =()=>{
    dispatch(deleteProject(item.id ))
  };

  // Get the current project status - prioritize the projects list over projectDetails
  const getProjectStatus = () => {
    // First, try to find this project in the projects list (most up-to-date)
    const projectInList = project.projects?.find(p => p.id === item.id);
    if (projectInList && projectInList.status) {
      return projectInList.status;
    }
    
    // If this specific project is currently in projectDetails, use that
    if (project.projectDetails?.id === item.id && project.projectDetails.status) {
      return project.projectDetails.status;
    }
    
    // Fallback to the item's status
    return item.status || 'ACTIVE';
  };

  const renderStatusBadge = () => {
    const status = getProjectStatus();
    
    if (status === 'ACTIVE') {
      return (
        <Badge className="bg-green-500/20 text-green-300 border border-green-500/30 text-xs">
          Active
        </Badge>
      );
    } else if (status === 'CLOSED') {
      return (
        <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs">
          Closed
        </Badge>
      );
    }
    return (
      <Badge className="bg-slate-500/20 text-slate-300 border border-slate-500/30 text-xs">
        Unknown
      </Badge>
    );
  };
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-64 flex flex-col">
      {/* Header with menu */}
      <div className="flex items-start justify-between mb-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50">
          {item.category}
        </span>
        
        <div className="flex flex-col items-end gap-2">
          {renderStatusBadge()}
          
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
