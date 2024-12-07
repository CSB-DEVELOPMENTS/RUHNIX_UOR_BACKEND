require('dotenv').config();
const mongoose = require('mongoose');
const seedUsers = require('./seedUsers');
const seedGigs = require('./seedGigs');
const seedConversations = require('./seedConversations');
const seedOrders = require('./seedOrders');
const seedReviews = require('./seedReviews');

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected.');

        // Clear existing data
        const { User, Gig, Conversation, Order, Review } = require('../models');
        await User.deleteMany({});
        await Gig.deleteMany({});
        await Conversation.deleteMany({});
        await Order.deleteMany({});
        await Review.deleteMany({});
        console.log('Existing data cleared.');

        // Seed data step by step
        const users = await seedUsers();
        const gigs = await seedGigs(users);
        await seedConversations(users);
        await seedOrders(gigs, users);
        await seedReviews(gigs, users);

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
