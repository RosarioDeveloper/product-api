/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import ProductValidator from 'App/Validators/ProductValidator'

export default class ProductsController {
  async index({ response }: HttpContextContract) {
    const products = await Product.query().preload('category').orderBy('id', 'desc')

    return response.ok(products)
  }

  async store({ response, request }: HttpContextContract) {
    const validatedReq: any = await request.validate(ProductValidator)
    const product = await Product.create(validatedReq)

    return response.ok(product)
  }

  async show({ params, response }: HttpContextContract) {
    const { id } = params
    const product = await Product.find(id)

    if (!product) {
      return response.unprocessableEntity({ error: 'Produto não encontrado' })
    }

    return response.ok(product)
  }

  async update({ response, request, params }: HttpContextContract) {
    const validatedReq = await request.validate(ProductValidator)

    const { id } = params
    const product = await Product.find(id)

    if (!product) {
      return response.unprocessableEntity({ message: 'Produto não encontrado' })
    }

    product.merge(validatedReq as any).save()

    return response.ok(product)
  }

  async delete({ params, response }: HttpContextContract) {
    const { id } = params
    const product = await Product.find(id)

    if (!product) {
      return response.unprocessableEntity({ error: 'Produto não encontrado' })
    }

    product.delete()

    return response.ok({ message: 'Produto eliminado com sucesso' })
  }
}
