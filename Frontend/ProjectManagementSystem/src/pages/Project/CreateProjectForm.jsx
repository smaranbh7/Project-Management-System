import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Input } from "../../components/ui/input";
import { DialogClose } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { tags } from "../ProjectList/ProjectList";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { createProject } from "../../redux/Project/Action"

function CreateProjectForm() {
  const dispatch = useDispatch();
  const { project } = useSelector(store => store);
  const [isLoading, setIsLoading] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const closeButtonRef = useRef(null);
  
  useEffect(() => {
    if (!project.loading && !project.error && isLoading) {
      setIsLoading(false);
      form.reset();
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }
    }
    
    // Handle error - stop loading
    if (project.error && isLoading) {
      setIsLoading(false);
    }
  }, [project.loading, project.error, isLoading]);

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");
    const updatedTags = currentTags.includes(newValue)
      ? currentTags.filter(tag => tag !== newValue)
      : [...currentTags, newValue];
    form.setValue("tags", updatedTags);
    
    // Reset the select value to show placeholder again
    setSelectValue("");
  }

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    dispatch(createProject(data));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-2">
        <h2 className="text-2xl font-bold text-white mb-2">Create New Project</h2>
        <p className="text-slate-400 text-sm">Set up your project details and start collaborating</p>
      </div>

      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Project Name */}
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Project name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">Project Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter project name..."
                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 h-11"
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Project Description */}
          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Project description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe your project..."
                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 min-h-[90px] resize-none"
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            rules={{ required: "Please select a category" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">Category</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white h-11">
                      <SelectValue placeholder="Select project category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="fullstack" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Full Stack
                      </SelectItem>
                      <SelectItem value="frontend" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Frontend
                      </SelectItem>
                      <SelectItem value="backend" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Backend
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">
                  Technologies 
                  {field.value.length > 0 && (
                    <span className="text-blue-400 ml-1">({field.value.length} selected)</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Select value={selectValue} onValueChange={handleTagsChange}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white h-11">
                      <SelectValue placeholder="Add technologies..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {tags
                        .filter(tag => tag !== "all" && !field.value.includes(tag))
                        .map((item) => (
                          <SelectItem 
                            key={item} 
                            value={item}
                            className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700 capitalize"
                          >
                            {item}
                          </SelectItem>
                        ))}
                      {tags.filter(tag => tag !== "all" && !field.value.includes(tag)).length === 0 && (
                        <div className="px-2 py-1.5 text-slate-400 text-sm">
                          All technologies selected
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>

                {/* Selected Tags */}
                {field.value.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((item) => (
                      <div 
                        key={item} 
                        onClick={() => handleTagsChange(item)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-md cursor-pointer hover:bg-blue-500/30 transition-colors text-xs"
                      > 
                        <span className="capitalize">{item}</span>
                        <Cross1Icon className="w-3 h-3" />
                      </div>
                    ))}
                  </div>
                )}
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {project.error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-2 rounded-lg">
              <p className="text-xs">{project.error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <DialogClose asChild>
              <Button 
                ref={closeButtonRef}
                type="button" 
                variant="outline"
                className="flex-1 bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:text-white"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 text-white font-medium"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <PlusIcon className="w-4 h-4" />
                  Create Project
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateProjectForm;
