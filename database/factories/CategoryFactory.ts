import Factory from '@ioc:Adonis/Lucid/Factory'
import Category from 'App/Models/Category'
import { ProductFactory } from './ProductFactory'

export const CategoryFactory = Factory.define(Category, ({ faker }) => {
  return {
    name: faker.commerce.productAdjective(),
    description: faker.lorem.paragraph(),
  }
})
  .relation('product', () => ProductFactory)
  .build()
