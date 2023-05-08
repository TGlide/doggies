"use client";

import { CompleteDog } from "@/entities/Dog";
import { useState } from "react";
import { deleteDog, saveDog } from "./actions";

type DogCardProps = {
  dog: CompleteDog;
};

export function DogCard({ dog }: DogCardProps) {
  const [saved, setSaved] = useState(dog.saved);

  return (
    <div className="bg-zinc-900 rounded-md p-4 shadow-sm mt-4 basis-64 h-64 flex flex-col">
      <h2 className="font-semibold">{dog.name}</h2>
      <p className="text-sm text-zinc-400">{dog.breed}</p>
      <p className="text-sm text-zinc-400">{dog.age} years old</p>

      <div className="flex gap-2 mt-auto ml-auto">
        <form action={deleteDog}>
          <input type="hidden" name="key" value={dog.key} />
          <button className="btn bg-red-200" type="submit">
            Delete Entry
          </button>
        </form>
        <form
          action={saveDog}
          onSubmit={() => {
            setSaved(!saved);
          }}
        >
          <input type="hidden" name="key" value={dog.key} />
          <input type="hidden" name="willSave" value={`${saved !== true}`} />
          <button className="btn" type="submit">
            {saved ? "Unsave" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
