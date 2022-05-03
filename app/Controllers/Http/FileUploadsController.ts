/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class FileUploadsController {
  static async upload(request) {
    const fileSchema = schema.create({
      file: schema.file({
        size: '2mb',
        extnames: ['json'],
      }),
    })

    const payload = await request.validate({
      schema: fileSchema,
      messages: {
        'file.size': 'Arquivo muito grande. 2MB no máximo',
        'file.extname': 'Formato de arquivo não supportado. Apenas arquivos do tipo json',
      },
    })

    const file = payload.file
    await file?.move(Application.tmpPath('uploads'))

    return file.clientName
  }
}
