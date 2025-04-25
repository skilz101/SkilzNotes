"use client";

import NoteDisplay from "@/components/assets/noteDisplay";
import { useNote } from "@/types/useNotes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function NotePage() {
  const params = useParams();
  const id = params?.id;

  const { getNote, updateNote, notes } = useNote(
    useShallow((state) => ({
      getNote: state.getNote,
      updateNote: state.updateNote,
      notes: state.note,
    }))
  );

  const [note, setNote] = useState(() =>
    id ? getNote(id as string) : undefined
  );

  useEffect(() => {
    if (id) {
      setNote(getNote(id as string));
    }
  }, [notes, id, getNote]);

  if (!note) {
    return "no notes exist of this id";
  }

  return (
    <div className="px-5 md:px-20 py-10 flex flex-col space-y-10">
      <Link href={"/"}>
        <ChevronLeft />
      </Link>

      <NoteDisplay
        description={note.description}
        title={note.title}
        id={id as string}
        updateNote={updateNote}
      />
    </div>
  );
}
