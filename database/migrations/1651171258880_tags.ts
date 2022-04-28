import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tags extends BaseSchema {
  protected tableName = 'tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').notNullable()
      table.string('name', 255).unsigned().notNullable()
      table.string('lable', 255).notNullable()
      table.text('description')

      table.foreign('category_id').references('id').inTable('categories').onDelete('cascade')

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
