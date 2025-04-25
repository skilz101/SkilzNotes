"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { updatedNote } from "@/utils/notes";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const noteSchema = z.object({
  title: z.string(),
  description: z.string(),
});
export default function NoteDisplay({
  title,
  id,
  description,
  updateNote,
}: {
  title: string;
  id: string;
  description: string;
  updateNote: (id: string, value: updatedNote) => void;
}) {
  const noteForm = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [descriptionModified, setDescriptionModified] = useState(false);
  const [titleModified, setTitleModified] = useState(false);

  const [saving, setSaving] = useState(false);

  function onSubmit(value: z.infer<typeof noteSchema>) {
    try {
      updateNote(id, value);
      setDescriptionModified(false);
      setTitleModified(false);
      setIsEditingDescription(false);
    } catch (error) {
      alert(error);
    }
  }

  function autoSave(value: z.infer<typeof noteSchema>) {
    try {
      updateNote(id, value);
      setDescriptionModified(false);
      setTitleModified(false);
    } catch (error) {
      alert(error);
    }
  }

  //   auto save feature
  useEffect(() => {
    const timeout = setTimeout(() => {
      const values = noteForm.getValues();

      if (titleModified || descriptionModified) {
        setSaving(true); // Start spinner

        autoSave(values); // Submit data

        // Simulate save time (optional: wrap updateNote in a Promise for real async)
        setTimeout(() => {
          setSaving(false); // Stop spinner after delay
        }, 1000); // fake delay for better UI feedback
      }
    }, 1000); // Wait 1 sec after user stops typing

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteForm.watch("title"), noteForm.watch("description")]);

  return (
    <Form {...noteForm}>
      <form
        onSubmit={noteForm.handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <div className="flex items-baseline space-x-3">
          <p>Title: </p>
          <FormField
            control={noteForm.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-fit">
                {isEditingTitle ? (
                  <FormControl>
                    <Input
                      autoFocus
                      type="text"
                      {...field}
                      className="text-2xl font-black"
                      onBlur={() => setIsEditingTitle(false)}
                      onChange={(e) => {
                        field.onChange(e); // update form state
                        setTitleModified(true); // trigger button
                      }}
                    />
                  </FormControl>
                ) : (
                  <h2
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    {field.value}
                  </h2>
                )}
              </FormItem>
            )}
          />

          {saving && (
            <div className="flex text-muted-foreground items-center">
              <Loader2 className="animate-spin stroke-muted-foreground" />
              <p>Saving...</p>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <p>Note content: </p>
          <FormField
            control={noteForm.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                {isEditingDescription ? (
                  <FormControl>
                    <Textarea
                      autoFocus
                      {...field}
                      className="w-full whitespace-pre-line text-xl md:text-xl min-h-32 text-muted-foreground"
                      //   onBlur={() => setIsEditingDescription(false)}
                      onChange={(e) => {
                        field.onChange(e); // update form state
                        setDescriptionModified(true); // trigger button
                      }}
                    />
                  </FormControl>
                ) : (
                  <p
                    onClick={() => setIsEditingDescription(true)}
                    className="whitespace-pre-line text-xl text-muted-foreground"
                  >
                    {description}
                  </p>
                )}
              </FormItem>
            )}
          />
        </div>

        {(descriptionModified || titleModified) && (
          <Button className="bg-blue-600 hover:bg-blue-500">Update Note</Button>
        )}
      </form>
    </Form>
  );
}
