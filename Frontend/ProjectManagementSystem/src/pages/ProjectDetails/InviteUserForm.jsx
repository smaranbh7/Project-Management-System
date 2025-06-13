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
    const { id } = useParams();
    const form = useForm({
        defaultValues: {
          email: "",
        },
      });
      const onSubmit = (data) => {
        if (!data.email || !data.email.trim()) {
          alert("Please enter a valid email address");
          return;
        }
        dispatch(inviteToProject({email: data.email.trim(), projectId: id}))
        console.log("Sending invitation to:", data.email);
      };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address"
              }
            }}
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
