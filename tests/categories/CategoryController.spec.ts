import { Http } from '../bootstrap'

describe('GET /categories', () => {
  it('Should able to list all caategories', async () => {
    const res = await Http.get('/categories')
    expect(res.status).toEqual(200)
  })
})

describe('GET /categories/{id}', () => {
  it('Should able to show if exist', async () => {
    const categoryId = 1
    const res = await Http.get(`/categories/${categoryId}`)

    expect(res.status).toEqual(200)
  })
})

describe('POST /categories/create', () => {
  it('Should able to create if not exist', async () => {
    const data = {
      name: 'Dell latitude',
      description: '',
    }

    const res = await Http.post('/categories/create').send(data)
    expect(res.status).toEqual(200)
  })
})

describe('UPDATE /categories/update/{id}', () => {
  it('Should able to update', async () => {
    const categoryId = 1
    const data = {
      name: 'Dell latitude 5078',
      description: '',
    }
    const res = await Http.put(`/categories/update/${categoryId}`).send(data)
    expect(res.status).toEqual(200)
  })
})

describe('DELETE /categories/delete/{id}', () => {
  it('Should able to delete if not get products', async () => {
    const categoryId = 1
    const res = await Http.delete(`/categories/delete/${categoryId}`)

    expect(res.status).toEqual(200)
  })
})
