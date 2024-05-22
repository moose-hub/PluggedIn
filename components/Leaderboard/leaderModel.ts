export interface Leader {
  key: number;
  index?: number;
  image: string;
  name: string;
  numberOfSwipes: number;
}

export const leaders: Leader[] = [
  {
    key: 1,
    image: "/avatars/mouse.jpg",
    name: "Joeben the 3rd",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 2,
    image: "/avatars/puppy.png",
    name: "Kevin",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 3,
    image: "/avatars/mouse.jpg",
    name: "Bruce",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 4,
    image: "/avatars/cat.svg",
    name: "Joeben the 4th",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 5,
    image: "/avatars/cat.svg",
    name: "Joeben the 5th",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 6,
    image: "/avatars/cat.svg",
    name: "Joeben the 6th",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 7,
    image: "/avatars/mouse.jpg",
    name: "Joeben the 7th",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 8,
    image: "/avatars/dog.svg",
    name: "Charlie",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 9,
    image: "/avatars/mouse.jpg",
    name: "Bella",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 10,
    image: "/avatars/mouse.jpg",
    name: "Oliver",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 11,
    image: "/avatars/parrot.png",
    name: "Lucky",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 12,
    image: "/avatars/fish.jpg",
    name: "Nemo",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 13,
    image: "/avatars/hamster.jpg",
    name: "Gizmo",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 14,
    image: "/avatars/rabbit.svg",
    name: "Thumper",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
  {
    key: 15,
    image: "/avatars/turtle.jpg",
    name: "Speedy",
    numberOfSwipes: Math.floor(Math.random() * 5000),
  },
];
