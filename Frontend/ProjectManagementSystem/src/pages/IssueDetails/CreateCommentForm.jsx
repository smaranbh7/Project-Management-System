import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { SaveIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/Comment/Action";

function CreateCommentForm({issueId}) {
    const dispatch = useDispatch()
    const { auth } = useSelector(store=>store)
    const form = useForm({
        defaultValues: {
          content: "",
        },
      });
      
      const onSubmit = (data) =>{
        if (!data.content.trim()) return;
        dispatch(createComment({content:data.content, issueId}))
        form.reset();
      }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-slate-700 text-white text-sm">
                      {auth.user?.fullName?.[0] || 'U'}
                        </AvatarFallback>
                    </Avatar>
                  
                  <div className="flex-1 space-y-3">
                <FormControl>
                  <Input
                    {...field}
                        placeholder="Write a comment..."
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage />

                    <div className="flex justify-end">
                      <button 
                        type="submit"
                        disabled={!form.watch("content")?.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 rounded-lg text-white text-sm font-medium transition-colors"
                      >
                        <SaveIcon className="w-4 h-4" />
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default CreateCommentForm
