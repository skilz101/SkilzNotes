"use client";

import Image from "next/image";
import { OnboardingBg } from "../assets/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Loader2, Mail, Upload, User2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { ChangeEvent, useRef, useState } from "react";
import { useNote } from "@/types/useNotes";
import { useShallow } from "zustand/shallow";

const userSchema = z.object({
  firstName: z.string({ message: "Your first name cannot be empty" }),
  lastName: z.string({ message: "Your last name cannot be empty" }),
  email: z.string().email({ message: "this must be a vild email address" }),
  profilePicture: z.string().url(),
});

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      profilePicture: "",
    },
  });

  const { setFirstName, setEmail, setLastName, setPicture, setSignedUp } =
    useNote(
      useShallow((state) => ({
        setFirstName: state.setFirstName,
        setEmail: state.setEmail,
        setLastName: state.setlastName,
        setPicture: state.setPicture,
        setSignedUp: state.setSignedUp,
      }))
    );

  function onSubmit(value: z.infer<typeof userSchema>) {
    setLoading(true);
    try {
      setFirstName(value.firstName);
      setLastName(value.lastName);
      setEmail(value.email);
      setSignedUp(true);
      setPicture(value.profilePicture);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error;
    }
  }

  const uploadInput = useRef<HTMLInputElement>(null);
  const handleImageUpoad = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (!e.target.files) return "no file";
    const file = e.target.files[0];
    console.log(file);
    if (file.type === "image/png" || "image/jpg" || "image/jpeg") {
      const image = URL.createObjectURL(file);
      console.log(image);
      form.setValue("profilePicture", image);
    }
  };
  const formDisabled = () => {
    const value = form.watch();
    return (
      !value.firstName ||
      !value.lastName ||
      !value.email ||
      !value.profilePicture
    );
  };

  return (
    <div className="grid grid-cols-2 h-screen gap-5">
      <div className="relative">
        <OnboardingBg />
      </div>
      <div className="flex justify-center py-10">
        <div className="flex flex-col items-center space-y-5">
          {/* image and headline */}
          <div className="flex space-y-2 flex-col items-center">
            <div className="relative w-[200px] h-20">
              <Image
                src={"/no-bgLogo.png"}
                alt="skilzNote logo"
                fill
                className="object-contain"
              />
            </div>

            <h1 className="capitalize text-4xl font-bold">
              You need to sign Up
            </h1>
            <p className="text-muted-foreground">
              If you don&apos;t sign up, you won&apos;t be able to use our note
              app feature.
            </p>
          </div>

          {/* form */}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-3 w-full mt-5"
            >
              {/* first name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex border-input border-2 rounded-md">
                        <div className="h-9 w-10 flex justify-center items-center">
                          <User2Icon className="stroke-muted-foreground" />
                        </div>
                        <hr className="text-zinc-500 bg-zinc-300  w-[2px] h-full" />
                        <Input
                          type="text"
                          placeholder="First Name"
                          className="border-none focus-visible:ring-0 outline-none shadow-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* last name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex border-input border-2 rounded-md">
                        <div className="h-9 w-10 flex justify-center items-center">
                          <User2Icon className="stroke-muted-foreground" />
                        </div>
                        <hr className="text-zinc-500 bg-zinc-300  w-[2px] h-full" />
                        <Input
                          type="text"
                          placeholder="Last Name"
                          className="border-none focus-visible:ring-0 outline-none shadow-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* email address */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex border-input border-2 rounded-md">
                        <div className="h-9 w-10 flex justify-center items-center">
                          <Mail className="stroke-muted-foreground" />
                        </div>
                        <hr className="text-zinc-500 bg-zinc-300  w-[2px] h-full" />
                        <Input
                          type="text"
                          placeholder="Email Address"
                          className="border-none focus-visible:ring-0 outline-none shadow-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <input
                type="file"
                ref={uploadInput}
                className="hidden"
                onChange={(e) => handleImageUpoad(e)}
              />
              <Button onClick={() => uploadInput.current?.click()}>
                <Upload />
                Upload Profile photo
              </Button>

              <Button
                className="bg-blue-600  hover:bg-blue-500 mt-4"
                disabled={formDisabled()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
