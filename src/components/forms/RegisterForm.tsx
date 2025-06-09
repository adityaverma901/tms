"use client";

import { registerUser } from "@/actions/auth";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { RegisterUserSchema, Role } from "@/schemas";
import Link from "next/link";
import { Building2, Ticket } from "lucide-react";

const FormSchema = RegisterUserSchema;
type FormSchemaType = z.infer<typeof FormSchema>;

interface RegisterFormProps {
  text: string;
  role: Role;
}

interface ServerResponse {
  error?: string;
  success?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ text, role }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: "USER" as Role,
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    if (role) data.role = role;

    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      registerUser(data)
        .then((response: ServerResponse) => {
          if (response?.error) {
            setError(response.error);
          }
          if (response?.success) {
            form.reset();
            setSuccess(response.success);
            toast({
              title: "🎉 Registration success",
              description: response.success,
            });
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-8 sm:p-10 border border-gray-100">
        {/* Logo */}
        <Link href={"/"}>
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-blue-800 flex items-center justify-center">
              <Ticket className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-2xl font-bold text-blue-800">Tms</span>
          </div>
        </div>
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {text}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <FormControl>
                    <input
                      {...field}
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FormControl>
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                        disabled={isPending}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-800"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                    </button>
                  </div>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-60 flex items-center justify-center"
            >
              {isPending ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/auth/login"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
            >
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;