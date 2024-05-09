export interface Leader {
  image: string;
  name: string;
  numberOfSwipes: number;
}

export const leaders: Leader[] = [
  {
    image: "/avatars/cat.svg",
    name: "Joeben",
    numberOfSwipes: 6924739,
  },
  {
    image: "/avatars/puppy.png",
    name: "Kevin",
    numberOfSwipes: 4654657,
  },
  {
    image: "/avatars/mouse.jpg",
    name: "Bruce",
    numberOfSwipes: 2354688,
  },
];
