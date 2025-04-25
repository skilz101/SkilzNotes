import { StateCreator } from "zustand";
import { NoteSlice } from "./notes";

type UserDetails = {
    firstName: string;
    lastName: string;
    picture: string;
    email: string;
    signedUp: boolean
}

type UserActions = {
    setFirstName: (name: string) => void;
    setlastName: (lastName: string) => void;
    setPicture: (url: string) => void;
    setEmail: (email: string) => void;
    setSignedUp: (status: boolean) => void
}

export type User = UserDetails & UserActions

export const createUser: StateCreator<User & NoteSlice, [], [], User> = ((set) => ({
    firstName:"",
    lastName:"",
    email:"",
    picture:"",
    signedUp: false,

    setFirstName: (name) => set((state) => ({
        ...state,
        firstName: name
    })),

    setlastName: (lastName => set((state) => ({
        ...state,
        lastName,
    }))),
    setEmail:(email) => set({email}),
    setPicture:(url) => set((state) => ({
        ...state,
        picture: url
    })),
    setSignedUp:(status: boolean) => set((state) => ({
        ...state,
        signedUp: status
    }))
}))