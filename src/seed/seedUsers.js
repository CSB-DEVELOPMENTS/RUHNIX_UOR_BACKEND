const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require('../models');

const users = [
    {
        username: "ruhseller",
        email: "john.doe@example.com",
        password: "1234", // Short and changeable
        image: "john_image.jpg",
        country: "USA",
        phone: "1234567890",
        description: "Experienced software developer",
        isSeller: true
    },
    {
        username: "ruhbuyer",
        email: "jane.smith@example.com",
        password: "1234", // Short and changeable
        image: "jane_image.jpg",
        country: "UK",
        phone: "9876543210",
        description: "Graphic designer and creative thinker",
        isSeller: false
    },
    {
        username: "michael_brown",
        email: "michael.brown@example.com",
        password: "writerpass", // Short and changeable
        image: "michael_image.jpg",
        country: "Canada",
        phone: "1122334455",
        description: "Freelance writer and editor",
        isSeller: true
    },
    {
        username: "sophia_wilson",
        email: "sophia.wilson@example.com",
        password: "market123", // Short and changeable
        image: "sophia_image.jpg",
        country: "Australia",
        phone: "6677889900",
        description: "Digital marketer and SEO expert",
        isSeller: false
    },
    {
        username: "liam_jones",
        email: "liam.jones@example.com",
        password: "devpass", // Short and changeable
        image: "liam_image.jpg",
        country: "India",
        phone: "9988776655",
        description: "Full-stack developer with 5 years of experience",
        isSeller: true
    },
    {
        username: "emma_davis",
        email: "emma.davis@example.com",
        password: "managerpass", // Short and changeable
        image: "emma_image.jpg",
        country: "Germany",
        phone: "5544332211",
        description: "Product manager with a focus on tech startups",
        isSeller: false
    }
];

const seedUsers = async () => {
    console.log('Seeding users...');
    const hashedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, saltRounds),
    }));
    const createdUsers = await User.insertMany(hashedUsers);
    console.log('Users seeded successfully.');
    return createdUsers;
};

module.exports = seedUsers;
