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

function InviteUserForm() {
    const form = useForm({
        defaultValues: {
          email: "",
        },
      });
      const onSubmit = (data) => {
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
