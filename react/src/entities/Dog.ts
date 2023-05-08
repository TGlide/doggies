export type Dog = {
  name: string;
  breed: string;
  age: number;
};

export type CompleteDog = Dog & {
  key: string;
  saved: boolean;
};
