"use client";

import { note } from "@/utils/notes";
import { AddNote } from "../ui/addNote";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ReactElement, useState } from "react";

export default function UploadDialog({
  createNote,
  children,
}: {
  createNote: (note: note) => void;
  children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer w-full">
        {children}
      </DialogTrigger>

      <DialogContent className="md:max-w-4xl">
        <DialogTitle className="flex flex-col space-y-2">
          <div>
            <p className="text-center text-xl font-medium">Add a new Note</p>
            <p className="text-center text-sm font-normal text-muted-foreground">
              By filling out the details of this form, you will be able to
              create a new note in your dashboard.
            </p>
          </div>
        </DialogTitle>
        <hr />
        <AddNote createNote={createNote} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
