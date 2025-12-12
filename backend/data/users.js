const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Rami",
    email: "rami@email.com",
    password: bcrypt.hashSync("StrongPass123!", 10),
    role: "user",
    githubUsername: "ramigit",
    phoneNumber: "1234567890",
    bio: "Rami test user",
  },
  {
    name: "John",
    email: "john@email.com",
    password: bcrypt.hashSync("StrongPass123!", 10),
    role: "user",
    githubUsername: "johngit",
    phoneNumber: "1234567891",
    bio: "John test user",
  },
  {
    name: "Jane",
    email: "jane@email.com",
    password: bcrypt.hashSync("StrongPass123!", 10),
    role: "admin",
    githubUsername: "janegit",
    phoneNumber: "1234567892",
    bio: "Jane test user",
  },
];

module.exports = users;
