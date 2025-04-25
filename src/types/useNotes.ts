import { create } from "zustand";
import { Note } from "./noteType";
import { createUser } from "@/utils/userProfile";
import { createNotes } from "@/utils/notes";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

export const useNote = create<Note> ()(
    
    devtools(
        persist(
        subscribeWithSelector(
            immer((...a) => ({
            ...createUser(...a),
            ...createNotes(...a)
            }))
        ),
        {name: "local-storage"}
    ))

)