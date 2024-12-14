import { PrismaClient } from "@prisma/client";

import readline from "node:readline/promises";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prisma = new PrismaClient();

const instructions = `
Welcome to the Cinema City CLI!

Please select an option:

--- Cinemas
[1] Add new cinema
[2] List all cinemas
[3] Remove cinema

--- Halls
[4] Add new hall
[5] List all halls
[6] Remove hall

--- Movies
[7] Add new movie
[8] List all movies
[9] Remove movie

--- Sessions
[10] Add new session
[11] List all sessions
[12] Remove session

--- Tickets
[13] Add new ticket
[14] List all tickets
[15] Remove ticket

[16] Exit
`;

const addCinema = async () => {
  const name = await rl.question("Cinema name: ");
  const address = await rl.question("Cinema address: ");
  await prisma.cinema.create({
    data: {
      name,
      address,
    },
  });
  console.log("Cinema created successfully");
};

const listCinemas = async () => {
  const cinemas = await prisma.cinema.findMany();

  console.log("Cinemas:");
  cinemas.forEach((cinema) => {
    console.log(`ID: ${cinema.id} - ${cinema.name} (${cinema.address})`);
  });
};

const removeCinema = async () => {
  await listCinemas();

  const id = await rl.question("Cinema ID: ");
  await prisma.cinema.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("Cinema removed successfully");
};

const addHall = async () => {
  await listCinemas();
  const cinemaId = await rl.question("Cinema ID: ");
  const name = await rl.question("Hall name: ");
  const seats = await rl.question("Number of seats: ");
  await prisma.hall.create({
    data: {
      name,
      seats: parseInt(seats),
      cinemaId: parseInt(cinemaId),
    },
  });
  console.log("Hall created successfully");
};

const listHalls = async () => {
  const halls = await prisma.hall.findMany();

  console.log("Halls:");
  halls.forEach((hall) => {
    console.log(`ID: ${hall.id} - ${hall.name} (${hall.seats} seats)`);
  });
};

const removeHall = async () => {
  await listHalls();

  const id = await rl.question("Hall ID: ");
  await prisma.hall.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("Hall removed successfully");
};

const addMovie = async () => {
  const title = await rl.question("Movie title: ");
  const duration = await rl.question("Duration (in minutes): ");
  await prisma.movie.create({
    data: {
      title,
      duration: parseInt(duration),
    },
  });
  console.log("Movie created successfully");
};

const listMovies = async () => {
  const movies = await prisma.movie.findMany();

  console.log("Movies:");
  movies.forEach((movie) => {
    console.log(`ID: ${movie.id} - ${movie.title} (${movie.duration} minutes)`);
  });
};

const removeMovie = async () => {
  await listMovies();

  const id = await rl.question("Movie ID: ");
  await prisma.movie.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("Movie removed successfully");
};

const addSession = async () => {
  await listMovies();
  await listHalls();

  const movieId = await rl.question("Movie ID: ");
  const hallId = await rl.question("Hall ID: ");
  const time = await rl.question("Session time (YYYY-MM-DD HH:mm): ");
  await prisma.session.create({
    data: {
      movieId: parseInt(movieId),
      hallId: parseInt(hallId),
      time: new Date(time),
    },
  });
  console.log("Session created successfully");
};

const listSessions = async () => {
  const sessions = await prisma.session.findMany({
    include: {
      hall: {
        include: {
          cinema: true,
        },
      },
      movie: true,
    },
  });

  console.log("Sessions:");
  sessions.forEach((session) => {
    console.log(
      `ID: ${session.id} - ${session.movie.title} (${session.hall.cinema.name}, ${session.hall.name}) - ${session.time}`
    );
  });
};

const removeSession = async () => {
  await listSessions();

  const id = await rl.question("Session ID: ");
  await prisma.session.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("Session removed successfully");
};

const addTicket = async () => {
  await listSessions();

  const sessionId = await rl.question("Session ID: ");
  const row = await rl.question("Row: ");
  const seat = await rl.question("Seat: ");
  await prisma.ticket.create({
    data: {
      sessionId: parseInt(sessionId),
      row: parseInt(row),
      seat: parseInt(seat),
    },
  });
  console.log("Ticket created successfully");
};

const listTickets = async () => {
  const tickets = await prisma.ticket.findMany({
    include: {
      session: {
        include: {
          hall: {
            include: {
              cinema: true,
            },
          },
          movie: true,
        },
      },
    },
  });

  console.log("Tickets:");
  tickets.forEach((ticket) => {
    console.log(
      `ID: ${ticket.id} - ${ticket.session.movie.title} (${ticket.session.hall.cinema.name}, ${ticket.session.hall.name}) - ${ticket.session.time} - Row ${ticket.row}, Seat ${ticket.seat}`
    );
  });
};

const removeTicket = async () => {
  await listTickets();

  const id = await rl.question("Ticket ID: ");
  await prisma.ticket.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("Ticket removed successfully");
};

async function main() {
  while (true) {
    console.log(instructions);
    const option = await rl.question("Select an option: ");
    switch (option) {
      case "1":
        await addCinema();
        break;
      case "2":
        await listCinemas();
        break;
      case "3":
        await removeCinema();
        break;
      case "4":
        await addHall();
        break;
      case "5":
        await listHalls();
        break;
      case "6":
        await removeHall();
        break;
      case "7":
        await addMovie();
        break;
      case "8":
        await listMovies();
        break;
      case "9":
        await removeMovie();
        break;
      case "10":
        await addSession();
        break;
      case "11":
        await listSessions();
        break;
      case "12":
        await removeSession();
        break;
      case "13":
        await addTicket();
        break;
      case "14":
        await listTickets();
        break;
      case "15":
        await removeTicket();
        break;
      case "16":
        return;
      default:
        console.log("Invalid option");
    }
  }
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
