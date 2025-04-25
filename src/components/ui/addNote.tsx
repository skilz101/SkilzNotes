"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { note } from "@/utils/notes";

const noteSchema = z.object({
  title: z
    .string({ message: "You title is required" })
    .max(22, "Title must be 22 characters or fewer"),
  id: z.string(),
  description: z.string({
    message: "You need to actually put content in your note",
  }),
});
export function AddNote({
  createNote,
  setOpen,
}: {
  createNote: (note: note) => void;
  setOpen: (status: boolean) => void;
}) {
  const noteForm = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      id: "",
      description: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  function onSubmit(value: z.infer<typeof noteSchema>) {
    setLoading(true);
    // noteForm.setValue("id", uuidv4());
    const newNote = { ...value, id: uuidv4() };
    try {
      console.log(newNote);
      setLoading(false);
      createNote(newNote);
      setOpen(false);
    } catch (error) {
      setLoading(false);
      return error;
    }
  }

  const formDisabled = () => {
    const item = noteForm.watch();
    return !item.title || !item.description;
  };

  const titleLength = noteForm.watch("title").length;

  return (
    <div>
      <Form {...noteForm}>
        <form
          onSubmit={noteForm.handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <FormField
            control={noteForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Title</FormLabel>
                <FormDescription>
                  This is the title of your note. Make sure to use a name you
                  will easily remember
                </FormDescription>
                <FormControl>
                  <div className="flex flex-col space-y-2 items-end">
                    <Input
                      type="text"
                      placeholder="Chemistry lesson Note"
                      className="text-3xl h-fit"
                      {...field}
                    />

                    <div className="flex">
                      <p
                        className={`
                            ${titleLength > 22 && "text-red-600"}
                            ${titleLength === 22 && "text-green-600"}
                            `}
                      >
                        {titleLength}
                      </p>
                      /22
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={noteForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl capitalize">Note text</FormLabel>
                <FormDescription>
                  This is your note text, write in as much detail as possible.
                  Be creative, have fun!
                </FormDescription>

                <FormControl>
                  <textarea
                    {...field}
                    className="w-full border-input border-2 rounded-md p-5 h-30"
                    placeholder={`Difussion process\n -step 1\n -step 2\n -step 3\n Conclusion: blah blah blah`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-blue-600 hover:bg-blue-500 mt-4"
            disabled={formDisabled()}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Create Note"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
