export interface Leader {
  image: string;
  name: string;
  numberOfSwipes: number;
}

export const leaders: Leader[] = [
  {
    image: "/public/avatars/cat.svg",
    name: "Joeben",
    numberOfSwipes: 6924739,
  },
  {
    image: "/public/avatars/puppy.png",
    name: "Kevin",
    numberOfSwipes: 4654657,
  },
  {
    image: "/public/avatars/mouse.jpg",
    name: "Bruce",
    numberOfSwipes: 2354688,
  },
];
