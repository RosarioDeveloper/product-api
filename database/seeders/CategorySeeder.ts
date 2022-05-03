import { CategoryFactory } from './../factories/CategoryFactory'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class CategorySeederSeeder extends BaseSeeder {
  public async run() {
    const categories = await CategoryFactory.with('product', 5).createMany(5)
  }
}
