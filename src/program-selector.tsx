import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { IconSearch } from "@tabler/icons-react";

function ProgramSelector() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <IconSearch />
            Search program
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search program</DialogTitle>
            <DialogDescription>
              Search for a program to add to your list.
            </DialogDescription>
          </DialogHeader>
          test text here.
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Search</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default ProgramSelector;
