"use client";

import { useState } from "react";
import { addDog } from "./actions";
import { useSearchParams } from "next/navigation";

type ClientProps = {
  children: React.ReactNode;
};

export default function Client({ children }: ClientProps) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(searchParams.get("open") === "true");

  return (
    <main className="min-h-screen p-4">
      <h1 className="text-4xl font-bold">Doggies are so cool!</h1>
      <a
        className="btn inline-block mt-8"
        href="/?open=true"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Add dog
      </a>
      {children}

      <dialog
        className={`bg-black/50 w-screen h-screen p-0 fixed inset-0 place-items-center ${
          open ? "grid" : "hidden"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setOpen(false);
          }
        }}
      >
        <form
          className="text-white bg-zinc-900 rounded-lg p-6 shadow-sm mt-4 min-w-[400px] flex flex-col"
          action={addDog}
          onSubmit={() => {
            setOpen(false);
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-2xl">Add Dog</h2>
            <a
              href="/"
              className="btn inline-block"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              Close
            </a>
          </div>
          <label className="block mt-4" htmlFor="name">
            Name
          </label>
          <input
            className="block bg-transparent border border-zinc-600 rounded-sm px-2 py-1 mt-1"
            type="text"
            name="name"
            id="name"
            required
          />
          <label className="block mt-4" htmlFor="breed">
            Breed
          </label>
          <input
            className="block bg-transparent border border-zinc-600 rounded-sm px-2 py-1 mt-1"
            type="text"
            name="breed"
            id="breed"
            required
          />
          <label className="block mt-4" htmlFor="age">
            Age
          </label>
          <input
            className="block bg-transparent border border-zinc-600 rounded-sm px-2 py-1 mt-1"
            type="number"
            name="age"
            id="age"
            required
          />

          <button className="btn ml-auto mt-8" type="submit">
            Add Dog
          </button>
        </form>
      </dialog>
    </main>
  );
}
