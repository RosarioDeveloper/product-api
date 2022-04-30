/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
  async index({ response }: HttpContextContract) {
    const categories = await Category.query().orderBy('id', 'desc')

    return response.ok(categories)
  }

  async store({ response, request }: HttpContextContract) {
    const requestValidated = await request.validate(CategoryValidator)
    const category = await Category.create(requestValidated)

    return response.ok(category)
  }

  async show({ params, response }: HttpContextContract) {
    const { id } = params
    const category = await Category.find(id)

    if (!category) {
      return response.notFound({ message: 'Categoria não encontrada' })
    }

    return response.ok(category)
  }

  async update({ response, request, params }: HttpContextContract) {
    const requestValidated = await request.validate(CategoryValidator)

    const { id } = params
    const category = await Category.find(id)

    if (!category) {
      return response.notFound({ message: 'Categoria não encontrada' })
    }

    category.name = requestValidated.name
    category.description = requestValidated.description as any

    category.save()

    return response.ok(category)
  }

  async delete({ params, response }: HttpContextContract) {
    const { id } = params
    await Category.query().where({ id }).delete()

    return response.ok({ message: 'Categoria eliminada com sucesso' })
  }
}
