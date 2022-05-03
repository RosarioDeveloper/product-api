import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'
import Product from './Product'

export default class Category extends BaseModel {
  public static table = 'categories'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public lable: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Set label value
  @beforeSave()
  public static async setLable(category: Category) {
    if (category.$dirty.name) {
      category.lable = string.dashCase(category.name)
    }
  }

  //Prodcuts relationship
  @hasOne(() => Product, {
    foreignKey: 'category_id',
  })
  public product: HasOne<typeof Product>
}
