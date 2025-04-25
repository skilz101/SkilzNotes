import { StateCreator } from "zustand";
import { User } from "./userProfile";

export interface note {
    title: string,
    id: string,
    description: string,
}

export interface updatedNote{
    title: string,
    description: string,
}

type noteDetails = {
    note: note[]
}

type noteActions = {
    createNote: (note: note) => void;
    updateNote: (noteId: string, updatedNote: updatedNote) => void;
    deleteNote: (noteId: string) => void;
    clearAllNotes: () => void;
    getAllNotes: () => note[]
    getNote: (noteId: string) => note | undefined
}


export type NoteSlice = noteDetails & noteActions

export const initialNotes: noteDetails = {
    note: []
}

export const createNotes: StateCreator<NoteSlice & User, [["zustand/immer", never]], [], NoteSlice> = ((set, get) => ({
    ...initialNotes,
    createNote:(note: note) => set((state) => ({
       ...state,
       note: [...state.note, note]
    })),

    updateNote: (noteId, updatedNote:updatedNote) => set((state) => {
        const foundNote = state.note.find((note) => note.id === noteId)
        if(foundNote){
            foundNote.description= updatedNote.description;
            foundNote.title = updatedNote.title;
        }
    }),

    deleteNote: (noteId) => set((state) => {
        const foundNoteIndex = state.note.findIndex((note) => note.id === noteId)
        if(foundNoteIndex !== -1){
            state.note.splice(foundNoteIndex, 1)
        }
    }),

    getAllNotes: () => {
        return get().note
    },

    getNote: (noteId: string) => {
        return get().note.find((note) => note.id === noteId);
    },

    
    clearAllNotes: () => set(() => initialNotes)

}))