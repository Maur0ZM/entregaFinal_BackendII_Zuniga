import { faker } from '@faker-js/faker';
import { usersModel } from '../daos/mongodb/models/users.models.js';

export const generateFakeUser = () => {
  return {
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(6), 
    role: faker.helpers.arrayElement(['user', 'admin', 'guest']), 
    age: faker.number.int({ min: 18, max: 90 })
  };
};

export const populateUsers = async (count = 10) => {
  try {
    const fakeUsers = Array.from({ length: count }, generateFakeUser);
    await usersModel.insertMany(fakeUsers);
    console.log(`${count} usuarios de prueba agregados a la base de datos.`);
  } catch (error) {
    console.error('Error al poblar usuarios:', error);
  }
};
