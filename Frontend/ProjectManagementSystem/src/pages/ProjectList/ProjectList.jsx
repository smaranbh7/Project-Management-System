import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { ScrollArea } from "../../components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import ProjectCard from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "../../redux/Project/Action";

export const tags = [
  "all",
  "react",
  "nextjs",
  "spring boot",
  "mysql",
  "mongodb",
  "c++",
  "Javascript",
];

function ProjectList() {
  const [keyword, setKeyword] = useState("");
  const { project } = useSelector(store=>store)
  const dispatch = useDispatch()
  const handleFilterCategory = (value) => {
    if(value=="all"){
      dispatch(fetchProjects({}))
    }else{
      dispatch(fetchProjects({category:value}));
    }
  };
  const handleFilterTags = (value) => {
    if(value=="all"){
       dispatch(fetchProjects({}))
    }else{
      dispatch(fetchProjects({tag:value}));
    }
  };
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Subtle Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-900/20 to-transparent"></div>
      <div className="container mx-auto px-6 py-8">
                {/* Filters Bar */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <MixerHorizontalIcon className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3">Category</h3>
              <RadioGroup
                className="flex flex-wrap gap-2"
                defaultValue="all"
                onValueChange={(value) => handleFilterCategory(value)}
              >
                {[
                  { value: "all", label: "All" },
                  { value: "fullstack", label: "Full Stack" },
                  { value: "frontend", label: "Frontend" },
                  { value: "backend", label: "Backend" }
                ].map((item) => (
                  <div key={item.value} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10 transition-colors">
                    <RadioGroupItem 
                      value={item.value} 
                      id={item.value} 
                      className="border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                    />
                    <Label htmlFor={item.value} className="text-white cursor-pointer text-sm">{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Technology Filter */}
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-3">Technology</h3>
              <RadioGroup
                className="flex flex-wrap gap-2"
                defaultValue="all"
                onValueChange={(value) => handleFilterTags(value)}
              >
                {tags.map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10 transition-colors">
                    <RadioGroupItem 
                      value={item} 
                      id={`tech-${item}`} 
                      className="border-white/50 text-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                    />
                    <Label htmlFor={`tech-${item}`} className="text-white cursor-pointer text-sm capitalize">{item}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-white mb-4">
                Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
              </h1>
              <p className="text-purple-200 text-lg">Manage and track all your development projects</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                onChange={handleSearchChange}
                placeholder="Search your projects..."
                className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 focus:bg-white/15"
              />
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyword ? 
                project.searchProjects?.length > 0 ? 
                  project.searchProjects.map((item) => (
                    <ProjectCard key={item.id} item={item} />
                  )) :
                  <div className="text-center py-16">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                      <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
                      <p className="text-purple-200">Try adjusting your search terms</p>
                    </div>
                  </div>
                :
                                 project.projects?.length > 0 ?
                   project.projects.map((item) => (
                     <ProjectCard key={item.id} item={item} />
                   )) :
                  <div className="text-center py-16">
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-12 border border-white/10">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">+</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">No projects yet</h3>
                      <p className="text-purple-200 text-lg mb-6">Create your first project to get started!</p>
                      <div className="text-sm text-purple-300">Click "New project" in the header to begin</div>
                    </div>
                  </div>
               }
             </div>
           </div>
         </div>
       </div>
   );
 }

export default ProjectList;
