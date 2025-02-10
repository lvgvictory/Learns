'use strict';

const mongoose = require('mongoose');
const connectString = 'mongodb://localhost:27017/shopDEV';

const TestSchema = new mongoose.Schema({ name: String });
const Test = mongoose.model('Test', TestSchema);

describe('MongoDB Connection', () => {
    let connection;
    beforeAll(async () => {
        connection = await mongoose.connect(connectString);
    });

    // Close the connection after all tests
    afterAll(async () => {
        await connection.disconnect();
    });

    it('should connect to MongoDB', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it('should insert a document into the collection', async () => {
        const doc = new Test({ name: 'John Doe' });
        await doc.save();
        expect(doc.isNew).toBe(false);
    });

    it('should find a document in the collection', async () => {
        const doc = await Test.findOne({ name: 'John Doe' });
        expect(doc.name).toBe('John Doe');
    });
});