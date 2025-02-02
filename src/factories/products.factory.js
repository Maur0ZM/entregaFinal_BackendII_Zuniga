import { faker } from '@faker-js/faker';
import { productModel } from '../daos/mongodb/models/product.models.js';

export const generateFakeProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.number.int({ min: 1000, max: 9999 }), 
        price: faker.number.float({ min: 10, max: 1000, precision: 0.01 }), 
        status: faker.datatype.boolean(), 
        stock: faker.number.int({ min: 1, max: 100 }), 
        category: faker.commerce.department(),
        // image: faker.image.avatar()
    };
};

export const populateProducts = async (count = 10) => {
    try {
        const fakeProducts = Array.from({ length: count }, generateFakeProduct);
        await productModel.insertMany(fakeProducts);
        console.log(`${count} productos de prueba agregados a la base de datos.`);
    } catch (error) {
        console.error('Error al poblar productos:', error);
    }
};