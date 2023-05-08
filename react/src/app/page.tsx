import { DogList } from "./DogList";
import Client from "./client";

export default async function Home() {
  return (
    <Client>
      <DogList />
    </Client>
  );
}
