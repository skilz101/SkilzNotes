"use client";

import { ChevronDown, PenBoxIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { note } from "@/utils/notes";
import UploadDialog from "./uploadDialog";

export default function NavBar({
  profilePic,
  firstName,
  createNote,
}: {
  profilePic: string;
  firstName: string;
  createNote: (note: note) => void;
}) {
  return (
    <header className="flex justify-between items-center">
      <UploadDialog createNote={createNote}>
        <PenBoxIcon />
      </UploadDialog>

      <div className="flex items-center">
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage src={profilePic} alt={firstName} />
          <AvatarFallback className="rounded-full bg-blue-600 text-white">
            {firstName.split("")[0]}
          </AvatarFallback>
        </Avatar>{" "}
        <ChevronDown />
      </div>
    </header>
  );
}
