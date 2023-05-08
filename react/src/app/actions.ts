"use server";

import { Dog } from "@/entities/Dog";
import { redis } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z } from "zod";

function zodFormData<Schema extends z.ZodRawShape>(
  formData: FormData,
  schema: z.ZodObject<Schema>
) {
  const data: Record<string, unknown> = {};
  for (const [key, value] of Array.from(formData.entries())) {
    data[key] = value;
  }
  return schema.safeParse(data);
}

const addDogSchema = z.object({
  name: z.string().nonempty(),
  breed: z.string().nonempty(),
  age: z.coerce.number().int().positive(),
});

export async function addDog(formData: FormData) {
  const parsed = zodFormData(formData, addDogSchema);
  if (!parsed.success) return;

  await redis.set<Dog>(`dogs:${crypto.randomUUID()}`, {
    name: parsed.data.name,
    breed: parsed.data.breed,
    age: parsed.data.age,
  });
  revalidatePath("/");
}

const deleteDogSchema = z.object({
  key: z.string().nonempty(),
});

export async function deleteDog(formData: FormData) {
  const parsed = zodFormData(formData, deleteDogSchema);
  if (!parsed.success) return;

  await redis.getdel(parsed.data.key);
  revalidatePath("/");
}

const saveDogSchema = z.object({
  key: z.string().nonempty(),
  willSave: z.enum(["true", "false"]).transform((value) => value === "true"),
});

export async function saveDog(formData: FormData) {
  const parsed = zodFormData(formData, saveDogSchema);
  if (!parsed.success) return;

  await redis.set<boolean>(`saved:${parsed.data.key}`, parsed.data.willSave);
  revalidatePath("/");
}
