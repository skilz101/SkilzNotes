"use client";

import { note } from "@/utils/notes";
import NavBar from "../assets/nav";
import { PlusCircle } from "lucide-react";
import NotesCarousel from "../assets/notesCarousel";
import UploadDialog from "../assets/uploadDialog";
import { useState } from "react";

interface dashboardProps {
  picture: string;
  firstName: string;
  notes: note[];
  createNote: (note: note) => void;
  deleteNote: (id: string) => void;
}

export default function Dashboard({
  picture,
  firstName,
  notes,
  createNote,
  deleteNote,
}: dashboardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <main className="px-5 md:px-20 py-10 flex  flex-col space-y-10">
      <NavBar
        profilePic={picture}
        firstName={firstName}
        createNote={createNote}
      />
      <div className="mt-10 flex flex-col space-y-10 items-center">
        <div className="flex flex-col space-y-5">
          <h1 className="text-5xl font-semibold text-center">
            Manage your <span className="text-blue-600">Notes</span> in{" "}
            <span className="text-blue-600">one place</span>
          </h1>

          <p className="text-center text-muted-foreground">
            Taking Notes just became a whole lot easier with SkilzNote. You can
            now create notes, edit them, and delete what you no longer need.{" "}
          </p>
        </div>
        {/* notes */}
        {notes.length === 0 ? (
          <div className="w-full h-[20rem] p-10 flex items-center justify-center bg-blue-100">
            <div className="flex space-y-2 flex-col">
              <p className="text-lg text-center">
                You don&apos;t have any notes yet click on the button below to
                add a new note
              </p>

              <UploadDialog createNote={createNote}>
                <div className="bg-blue-600 text-white w-full hover:bg-blue-500 space-x-3 py-2 rounded-md flex items-center justify-center">
                  <PlusCircle width={20} height={20} />
                  <p>Add Note</p>
                </div>
              </UploadDialog>
            </div>
          </div>
        ) : (
          <div className="w-full h-fit p-5">
            <NotesCarousel
              firstName={firstName}
              note={notes}
              createNote={createNote}
              deleteNote={deleteNote}
            />
          </div>
        )}
      </div>
    </main>
  );
}
