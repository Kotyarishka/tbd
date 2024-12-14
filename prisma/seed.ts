import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.movie.createMany({
    data: [
      {
        title: "The Matrix",
        duration: 120,
      },
      {
        title: "The Matrix Reloaded",
        duration: 138,
      },
      {
        title: "The Matrix Revolutions",
        duration: 129,
      },
    ],
  });

  await prisma.cinema.create({
    data: {
      name: "Cinema City",
      address: "1234 Main St",

      halls: {
        create: [
          {
            name: "Hall 1",
            seats: 100,
          },
          {
            name: "Hall 2",
            seats: 200,

            sessions: {
              create: [
                {
                  movieId: 1,
                  time: new Date("2021-08-01T18:00:00"),
                  tickets: {
                    create: [
                      { row: 1, seat: 1 },
                      { row: 2, seat: 2 },
                      { row: 2, seat: 3 },
                    ],
                  },
                },
                {
                  movieId: 2,
                  time: new Date("2021-08-01T20:00:00"),
                  tickets: {
                    create: [
                      { row: 1, seat: 1 },
                      { row: 2, seat: 2 },
                      { row: 2, seat: 3 },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
