"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/schemas";
import { useState } from "react";
import { User } from "@/lib/definitions";
import { createUser } from "@/lib/actions";

export function RegisterForm() {
  const [formError, setFormError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "", 
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    // create new user object to send to server action
    const newUser: User = {
      id: "", // random id we can cancel this out when adding to the db
      name: data.name,
      email: data.email,
      password: data.password,
    };
    // add user to db
    const message = await createUser(newUser)
    setFormError(message);
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Register"
        backButtonHref="/auth/login"
        backButtonLabel="Already have an account?"
        showSocial
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type="password"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={formError} />
            <Button type="submit" className="hover:bg-blue-500">
              Go
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
}
