"use client";
import Dashboard from "@/components/dashboard/dashboard";
import SignUp from "@/components/dashboard/signup";
import { useNote } from "@/types/useNotes";
import { useShallow } from "zustand/shallow";

export default function Home() {
  const { hasSignedUp, picture, firstName, notes, createNote, deleteNote } =
    useNote(
      useShallow((state) => ({
        hasSignedUp: state.signedUp,
        firstName: state.firstName,
        picture: state.picture,
        notes: state.note,
        createNote: state.createNote,
        deleteNote: state.deleteNote,
      }))
    );

  // useEffect(() => {}, [notes]);
  return (
    <div>
      {!hasSignedUp ? (
        <SignUp />
      ) : (
        <Dashboard
          picture={picture}
          firstName={firstName}
          notes={notes}
          createNote={createNote}
          deleteNote={deleteNote}
        />
      )}
    </div>
  );
}
