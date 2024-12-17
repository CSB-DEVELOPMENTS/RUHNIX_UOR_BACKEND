require('dotenv').config();
const mongoose = require('mongoose');
const { User, Gig, Conversation, Order, Review } = require('../models'); // Adjust the path as needed
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;

const seedData = async () => {
    const users = [
        {
            username: "john_doe",
            email: "john.doe@example.com",
            password: "password123", // Short and changeable
            image: "john_image.jpg",
            country: "USA",
            phone: "1234567890",
            description: "Experienced software developer",
            isSeller: true
        },
        {
            username: "jane_smith",
            email: "jane.smith@example.com",
            password: "mypassword", // Short and changeable
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

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database connected.');

        // Remove existing data
        await User.deleteMany({});
        await Gig.deleteMany({});
        await Conversation.deleteMany({});
        await Order.deleteMany({});
        await Review.deleteMany({});
        console.log('Existing users, gigs, conversations, orders, and reviews removed.');

        // Hash passwords and insert users
        const hashedUsers = users.map(user => ({
            ...user,
            password: bcrypt.hashSync(user.password, saltRounds)
        }));

        const createdUsers = await User.insertMany(hashedUsers);
        console.log('User data seeded successfully.');

        // Create gigs based on seeded users
        const gigs = createdUsers.filter(user => user.isSeller).map(user => ({
            userID: user._id,
            title: `${user.username}'s Gig Title`,
            description: `${user.username}'s Gig Description`,
            category: "Technology",
            price: Math.floor(Math.random() * 500) + 50,
            cover: "default_cover.jpg",
            shortTitle: `${user.username}'s Short Title`,
            shortDesc: "This is a short description for the gig.",
            deliveryTime: `${Math.floor(Math.random() * 5) + 1} days`,
            revisionNumber: Math.floor(Math.random() * 5) + 1,
            features: ["Feature 1", "Feature 2", "Feature 3"],
            images: ["image1.jpg", "image2.jpg"]
        }));

        const createdGigs = await Gig.insertMany(gigs);
        console.log('Gig data seeded successfully.');

        // Create conversations (randomly pair sellers with buyers)
        const conversations = [];
        for (let i = 0; i < createdUsers.length; i++) {
            const seller = createdUsers[i];
            if (seller.isSeller) {
                const buyers = createdUsers.filter(user => !user.isSeller);
                buyers.forEach(buyer => {
                    conversations.push({
                        sellerID: seller._id,
                        buyerID: buyer._id,
                        readBySeller: false,
                        readByBuyer: false,
                        lastMessage: "Initial message",
                        conversationID: uuidv4() // Generate a unique conversation ID
                    });
                });
            }
        }

        await Conversation.insertMany(conversations);
        console.log('Conversation data seeded successfully.');

        // Create orders (randomly assign buyers and sellers to gigs)
        const orders = [];
        for (let i = 0; i < createdGigs.length; i++) {
            const gig = createdGigs[i];
            const buyers = createdUsers.filter(user => !user.isSeller);
            const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
            
            orders.push({
                gigID: gig._id,
                image: "order_image.jpg", // Placeholder image
                title: gig.title,
                price: gig.price,
                sellerID: gig.userID,
                buyerID: randomBuyer._id,
                isCompleted: false,
                payment_intent: uuidv4() // Generate unique payment intent ID
            });
        }

        const createdOrders = await Order.insertMany(orders);
        console.log('Order data seeded successfully.');

        // Create reviews (assign to random gigs)
        const reviews = [];
        for (let i = 0; i < createdGigs.length; i++) {
            const gig = createdGigs[i];
            const buyers = createdUsers.filter(user => !user.isSeller);
            const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];

            reviews.push({
                gigID: gig._id,
                userID: randomBuyer._id,
                star: Math.floor(Math.random() * 5) + 1, // Random star rating between 1 and 5
                description: "This is a great service!" // Placeholder review
            });
        }

        await Review.insertMany(reviews);
        console.log('Review data seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedData();
