require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');
const { User } = require('../users/models');
const { Car } = require('../models');
const { DATABASE_URL } = require('../config');

async function seedUsersAndCars() {
    try {
        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await User.deleteMany();
        await Car.deleteMany();

        const usersData = [
            {
                username: 'test1',
                password: '12345',
                firstName: 'Leo',
                lastName: 'Steffen',
                cars: [
                    {
                        make: 'Toyota',
                        model: 'Corolla',
                        year: '2021',
                        trim: 'XEi',
                        engine: '2.0 Flex',
                        dealerUrl: 'https://toyota.com.br',
                        listedPrice: '105000',
                        sellerName: 'Auto Shopping',
                        comments: 'Novo em folha'
                    },
                    {
                        make: 'Honda',
                        model: 'Civic',
                        year: '2019',
                        trim: 'EXL',
                        engine: '2.0',
                        dealerUrl: 'https://honda.com.br',
                        listedPrice: '95000',
                        sellerName: 'Particular',
                        comments: 'Único dono, pneus novos'
                    }
                ]
            },
            {
                username: 'test2',
                password: 'testpass',
                firstName: 'Test',
                lastName: 'User',
                cars: [
                    {
                        make: 'Ford',
                        model: 'Focus',
                        year: '2018',
                        trim: 'Titanium',
                        engine: '2.0',
                        dealerUrl: '',
                        listedPrice: '75000',
                        sellerName: 'Revenda XYZ',
                        comments: 'Muito bem conservado'
                    },
                    {
                        make: 'Fiat',
                        model: 'Argo',
                        year: '2022',
                        trim: 'Trekking',
                        engine: '1.3',
                        dealerUrl: '',
                        listedPrice: '78500',
                        sellerName: 'Fiat Store',
                        comments: 'Completo'
                    }
                ]
            }
        ];

        for (const userData of usersData) {
            const hashedPassword = await User.hashPassword(userData.password);
            const user = await User.create({
                username: userData.username,
                password: hashedPassword,
                firstName: userData.firstName,
                lastName: userData.lastName
            });

            for (const car of userData.cars) {
                await Car.create({ ...car, userId: user._id });
            }
        }

        console.log('Users and cars seeded successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seedUsersAndCars();
