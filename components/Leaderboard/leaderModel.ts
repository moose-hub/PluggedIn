export interface Leader {
  key: number;
  image: string;
  name: string;
  numberOfSwipes: number;
}

export const leaders: Leader[] = [
  {
    key: 1,
    image: "/avatars/cat.svg",
    name: "Joeben",
    numberOfSwipes: 6924739,
  },
  {
    key: 2,
    image: "/avatars/puppy.png",
    name: "Kevin",
    numberOfSwipes: 4654657,
  },
  {
    key: 3,
    image: "/avatars/mouse.jpg",
    name: "Bruce",
    numberOfSwipes: 2354688,
  },
];
