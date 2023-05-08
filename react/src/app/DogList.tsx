import { Dog, CompleteDog } from "@/entities/Dog";
import { redis } from "@/lib/redis";
import { DogCard } from "./DogCard";

export async function DogList() {
  const dogKeys = await redis.keys("dogs:*");
  let dogs: CompleteDog[] = await redis.mget(...dogKeys);
  const savedDogs: CompleteDog[] = [];
  for (let i = 0; i < dogKeys.length; i++) {
    savedDogs.push({
      ...dogs[i],
      key: dogKeys[i],
      saved: (await redis.get<boolean>(`saved:${dogKeys[i]}`)) ?? false,
    });
  }

  return (
    <div className="flex flex-wrap gap-4">
      {savedDogs.map((dog) => (
        <DogCard dog={dog} key={dog.key} />
      ))}
    </div>
  );
}
