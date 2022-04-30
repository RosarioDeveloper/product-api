import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').unsigned().notNullable()
      table.foreign('category_id').references('id').inTable('categories').onDelete('cascade')

      table.string('name', 255).notNullable()
      table.string('lable', 255).notNullable()
      table.double('price').notNullable().defaultTo(0)
      table.text('description')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
