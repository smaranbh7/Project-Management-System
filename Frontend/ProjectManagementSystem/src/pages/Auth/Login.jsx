import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Auth/Action";
import { useState } from "react";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";

function Login() {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
      });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      dispatch(login(data));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-slate-400 text-sm">Sign in to your account</p>
      </div>

        <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            rules={{ 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 h-11"
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            rules={{ 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-300">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                  <Input
                    {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeNoneIcon className="h-4 w-4" />
                      ) : (
                        <EyeOpenIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {auth.error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-2 rounded-lg">
              <p className="text-xs">{auth.error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 text-white font-medium h-11"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
                </Button>

          {/* Forgot Password */}
          <div className="text-center">
            <button
              type="button"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Login
