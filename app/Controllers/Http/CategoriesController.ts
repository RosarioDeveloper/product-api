/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
  async index({ response }: HttpContextContract) {
    const categories = await Category.all()

    return response.ok(categories)
  }

  async store({ response, request }: HttpContextContract) {
    const validatedReq = await request.validate(CategoryValidator)
    const category = await Category.create(validatedReq)

    return response.ok(category)
  }

  async show({ params, response }: HttpContextContract) {
    const { id } = params
    const category = await Category.find(id)

    if (!category) {
      return response.unprocessableEntity({
        errors: {
          message: 'Categoria não encontrada',
        },
      })
    }

    return response.ok(category)
  }

  async update({ response, request, params }: HttpContextContract) {
    const validatedReq = await request.validate(CategoryValidator)

    const { id } = params
    const category = await Category.find(id)

    if (!category) {
      return response.unprocessableEntity({
        errors: {
          message: 'Categoria não encontrada',
        },
      })
    }

    await category.merge(validatedReq).save()

    return response.ok(category)
  }

  async delete({ params, response }: HttpContextContract) {
    const { id } = params
    const category = await Category.query()
      .where({ id })
      .preload('product', (query) => {
        query.select('id', 'category_id')
      })
      .first()

    if (!category) {
      return response.unprocessableEntity({
        errors: {
          message: 'Categoria não encontrada',
        },
      })
    }

    if (category.product?.id) {
      return response.unprocessableEntity({
        errors: {
          message:
            'Esta categoria não pode ser eliminada porque existem produtos relacionados a ela',
        },
      })
    }

    category.delete()

    return response.ok({
      errors: {
        message: 'Categoria eliminada com sucesso',
      },
    })
  }
}
