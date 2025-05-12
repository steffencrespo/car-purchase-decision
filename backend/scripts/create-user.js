require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');
const { User } = require('../users/models');
const { DATABASE_URL } = require('../config');

async function run() {
    try {
        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const existing = await User.findOne({ username: 'leo2' });
        if (existing) {
            console.log('User already exists');
            process.exit(0);
        }

        const hashedPassword = await User.hashPassword('12345');

        const user = await User.create({
            username: 'leo2',
            password: hashedPassword,
            firstName: 'Leo',
            lastName: 'Steffen'
        });

        console.log('User created:', user.username);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();
