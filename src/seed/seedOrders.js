const { Order } = require('../models');
const { v4: uuidv4 } = require('uuid');

const seedOrders = async (gigs, users) => {
    console.log('Seeding orders...');
    const orders = gigs.map(gig => {
        const buyer = users.find(user => !user.isSeller);
        return {
            gigID: gig._id,
            image: 'order_image.jpg',
            title: gig.title,
            price: gig.price,
            sellerID: gig.userID,
            buyerID: buyer._id,
            isCompleted: false,
            payment_intent: uuidv4(),
        };
    });
    await Order.insertMany(orders);
    console.log('Orders seeded successfully.');
};

module.exports = seedOrders;
