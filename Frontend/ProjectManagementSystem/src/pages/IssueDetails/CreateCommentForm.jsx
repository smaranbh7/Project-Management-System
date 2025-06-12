import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { SaveIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/Comment/Action";

function CreateCommentForm({issueId}) {
    const dispatch= useDispatch()
    const form = useForm({
        defaultValues: {
          content: "",
        },
      });
      const onSubmit = (data) =>{
        dispatch(createComment({content:data.content, issueId}))
        console.log("Create project data ", data)
      }

  return (
    <div>
      <Form {...form}>
        <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                     <div>
                    <Avatar>
                        <AvatarFallback>
                                S
                        </AvatarFallback>
                    </Avatar>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-[20rem]"
                    placeholder="Add Comment Here.."
                  />
                </FormControl>
                <FormMessage />

                </div>
               
              </FormItem>
            )}
          />
              <Button type="submit">
                <SaveIcon/>
                </Button>
        </form>
      </Form>
      
    </div>
  )
}

export default CreateCommentForm
