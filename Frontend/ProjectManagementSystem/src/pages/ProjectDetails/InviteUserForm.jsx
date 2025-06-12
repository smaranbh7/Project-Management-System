import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { DialogClose } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { useDispatch } from "react-redux";
import { inviteToProject } from "../../redux/Project/Action";
import { useParams } from "react-router-dom";

function InviteUserForm() {
    const dispatch = useDispatch();
    const { id } = useParams;
    const form = useForm({
        defaultValues: {
          email: "",
        },
      });
      const onSubmit = (data) => {
        dispatch(inviteToProject({email:data.email, projectId:id}))
        console.log("Create project data", data);
      };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="User Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
              <Button type="submit" className="w-full mt-5">
                Invite User
                </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default InviteUserForm
