const { Gig } = require('../models');

const seedGigs = async (users) => {
    console.log('Seeding gigs...');
    const gigs = users.filter(user => user.isSeller).map(user => ({
        userID: user._id,
        title: `${user.username}'s Gig Title`,
        description: `${user.username}'s Gig Description`,
        category: 'Technology',
        price: Math.floor(Math.random() * 500) + 50,
        cover: 'default_cover.jpg',
        shortTitle: `${user.username}'s Short Title`,
        shortDesc: 'Short gig description.',
        deliveryTime: `${Math.floor(Math.random() * 5) + 1} days`,
        revisionNumber: Math.floor(Math.random() * 5) + 1,
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        images: ['image1.jpg', 'image2.jpg'],
    }));
    const createdGigs = await Gig.insertMany(gigs);
    console.log('Gigs seeded successfully.');
    return createdGigs;
};

module.exports = seedGigs;
