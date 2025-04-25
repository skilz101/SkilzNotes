"use client";

import { MoreHorizontal, Trash, Upload } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { note } from "@/utils/notes";
import Link from "next/link";
import UploadDialog from "./uploadDialog";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useState } from "react";

interface carouselProps {
  firstName: string;
  note: note[];
  createNote: (note: note) => void;
  deleteNote: (id: string) => void;
}

export default function NotesCarousel({
  firstName,
  note,
  createNote,
  deleteNote,
}: carouselProps) {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="w-full flex flex-col space-y-3">
      <div className="flex w-full justify-between items-center">
        <h3 className="text-blue-600">{firstName}&apos;s notes</h3>
        <Button className="bg-transparent text-blue-600 hover:bg-blue-200 border-2 rounded-2xl border-blue-600">
          See all
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="flex items-stretch">
          {note.map((item, index) => {
            const isOpen = openPopoverId === item.id;
            return (
              <CarouselItem
                key={index}
                className="basis-[90%] flex md:basis-1/2 lg:basis-1/3"
              >
                <Card className="border-blue-300 w-full h-full">
                  <CardHeader className="flex justify-between">
                    <Popover
                      open={isOpen}
                      onOpenChange={(open) => {
                        setOpenPopoverId(open ? item.id : null);
                      }}
                    >
                      <PopoverTrigger asChild>
                        <Trash className="stroke-red-600 cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="flex items-center flex-col space-y-3">
                          <p className="text-center">
                            Are you sure you want to delete this Note?
                          </p>
                          <div className="flex space-x-3 px-3 items-center w-full">
                            <Button
                              onClick={() => deleteNote(item.id)}
                              className="bg-red-600 w-1/2 cursor-pointer hover:bg-red-500"
                            >
                              Yes
                            </Button>
                            <Button
                              variant={"outline"}
                              className="border-blue-600 w-1/2 cursor-pointer "
                              onClick={() => setOpenPopoverId(null)}
                            >
                              No
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <MoreHorizontal />
                  </CardHeader>

                  <CardContent className="flex flex-col items-center">
                    <CardTitle>
                      <h4 className="text-center text-2xl">
                        Title: {item.title}
                      </h4>
                      <p className="text-muted-foreground text-center">
                        {item.description.slice(0, 33)}....
                      </p>
                    </CardTitle>
                  </CardContent>
                  <CardFooter className="w-full justify-center flex">
                    <Button
                      asChild
                      className="bg-blue-600 w-full hover:bg-blue-500"
                    >
                      <Link href={`/${item.id}`}>Open Note</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            );
          })}

          {note.length < 3 && (
            <CarouselItem className="basis-[90%] flex md:basis-1/2 lg:basis-1/3">
              <UploadDialog createNote={createNote}>
                <>
                  <div className="border-blue-300 text-blue-600 hover:bg-blue-200 w-full h-full bg-transparent rounded-xl border flex justify-center items-center">
                    <div className="flex space-x-3">
                      <Upload />
                      <p>Add note</p>
                    </div>
                  </div>
                </>
              </UploadDialog>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
}
