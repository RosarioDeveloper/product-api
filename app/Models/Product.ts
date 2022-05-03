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
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_id: number

  @column()
  public name: string

  @column()
  public lable: string

  @column()
  public price: number

  @column()
  public description: any

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Set label value
  @beforeSave()
  public static async setLable(product: Product) {
    if (product.$dirty.name) {
      product.lable = string.dashCase(product.name)
    }
  }

  //Category Relationship
  @belongsTo(() => Category, {
    foreignKey: 'category_id',
    onQuery: (query) => {
      query.select('categories.id', 'name')
    },
  })
  public category: BelongsTo<typeof Category>
}
