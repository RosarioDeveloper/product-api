/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'

import { v4 as uuid } from 'uuid'

import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

export default class ExportProductsController {
  async export({ request, response }: HttpContextContract) {
    const { categoryName } = request.params()
    const category = await Category.findBy('name', categoryName)

    if (!category)
      return response.unprocessableEntity({
        errors: [{ message: 'Categoria não encontrada' }],
      })

    const products = await Product.query().where({ category_id: category.id })
    const filePathName = Application.tmpPath(`uploads/${uuid()}.json`)

    await Drive.put(filePathName, JSON.stringify(products, null, 2))

    return response.send({
      fileUrl: filePathName,
      data: products,
    })
  }
}
