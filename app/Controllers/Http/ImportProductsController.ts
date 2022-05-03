/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import FileUploadsController from './FileUploadsController'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

interface FileContent {
  category_id: number
  name: string
  price: number
  description: string
}

export default class ImportProductsController {
  async import({ request, response }: HttpContextContract) {
    try {
      const { categoryName } = request.params()
      const fileName = await FileUploadsController.upload(request)
      const stfile = await Drive.get(Application.tmpPath(`uploads/${fileName}`))

      //const slug = string.dashCase(string.sentenceCase(categoryName))
      const category = await Category.findBy('lable', categoryName)

      if (!category)
        return response.unprocessableEntity({
          errors: [{ message: 'Categoria não encontrada' }],
        })

      //Build data struture
      let fileContent = JSON.parse(stfile.toString()) as FileContent[]
      let data = {
        success: [] as any,
        fails: [] as any,
      }

      for (let i in fileContent) {
        const item = fileContent[i]
        let test = await Product.query()
          .select('category_id', 'name')
          .where({ category_id: category.id })
          .andWhere({ name: fileContent[i].name })
          .first()

        if (!test) {
          await Product.create({
            category_id: category.id,
            name: item.name,
            price: item.price,
            description: item.description,
          })
          data.success.push({ name: item.name })
        } else {
          data.fails.push({ name: item.name, message: 'Este produto já existe' })
        }
      }

      return response.send(data)
    } catch (error) {
      return response.unprocessableEntity({
        errors: [{ message: 'Arquivo não encontrado' }],
      })
    }
  }
}
