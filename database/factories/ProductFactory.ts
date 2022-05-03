import Factory from '@ioc:Adonis/Lucid/Factory'
import Product from 'App/Models/Product'

export const ProductFactory = Factory.define(Product, ({ faker }) => {
  return {
    category_id: 1,
    name: faker.commerce.product(),
    price: faker.commerce.price() as any,
    description: faker.commerce.productDescription(),
  }
}).build()
