const { Conversation } = require('../models');
const { v4: uuidv4 } = require('uuid');

const seedConversations = async (users) => {
    console.log('Seeding conversations...');
    const conversations = [];
    users.filter(user => user.isSeller).forEach(seller => {
        users.filter(user => !user.isSeller).forEach(buyer => {
            conversations.push({
                sellerID: seller._id,
                buyerID: buyer._id,
                readBySeller: false,
                readByBuyer: false,
                lastMessage: 'Initial message',
                conversationID: uuidv4(),
            });
        });
    });
    await Conversation.insertMany(conversations);
    console.log('Conversations seeded successfully.');
};

module.exports = seedConversations;
