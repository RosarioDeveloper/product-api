import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ escape: true }, [
      rules.maxLength(255),
      rules.unique({
        table: 'categories',
        column: 'name',
        caseInsensitive: true,
        whereNot: {
          id: this.ctx.params.id ? this.ctx.params.id : null,
        },
      }),
    ]),
    lable: schema.string.optional({ escape: true }, [rules.maxLength(255)]),
    description: schema.string.optional({ escape: true }, [rules.maxLength(255)]),
  })

  public messages = {
    'name.required': 'Digite o nome da categoria',
    'name.unique': `A categoria ${this.ctx.request.input('name')} já existe`,
  }
}
