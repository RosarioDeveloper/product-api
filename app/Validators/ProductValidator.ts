import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_id: schema.number([
      rules.exists({
        table: 'categories',
        column: 'id',
      }),
    ]),
    name: schema.string({ escape: true }, [
      rules.maxLength(255),
      rules.unique({
        table: 'products',
        column: 'name',
        caseInsensitive: true,
        where: {
          category_id: this.ctx.request.input('category_id'),
        },

        whereNot: {
          id: this.ctx.params.id ? this.ctx.params.id : null,
        },
      }),
    ]),
    lable: schema.string.optional({ escape: true }, [rules.maxLength(255)]),
    price: schema.number(),
    description: schema.string.optional({ escape: true }),
  })

  public messages = {
    'name.required': 'O nome do produto é obrigatório',
    'name.unique': `O produto ${this.ctx.request.input('name')} já existe`,
    'name.price': 'O preço do produto é obrigatório',

    'category_id.required': 'Selecione uma categoria',
    'category_id.exists': 'A categoria selecionada não existe',
  }
}
