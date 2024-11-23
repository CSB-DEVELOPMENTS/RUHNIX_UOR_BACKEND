const { Review } = require('../models');

const seedReviews = async (gigs, users) => {
    console.log('Seeding reviews...');
    const reviews = gigs.map(gig => {
        const buyer = users.find(user => !user.isSeller);
        return {
            gigID: gig._id,
            userID: buyer._id,
            star: Math.floor(Math.random() * 5) + 1,
            description: 'This is a great service!',
        };
    });
    await Review.insertMany(reviews);
    console.log('Reviews seeded successfully.');
};

module.exports = seedReviews;
