import { Http } from '../bootstrap'

describe('GET /products', () => {
  test('Should able to list all', async () => {
    const res = await Http.get('/products')
    expect(res.status).toBe(200)
  })
})

describe('GET /products/{id}', () => {
  test('Should able to show if exist', async () => {
    const productId = 1
    const res = await Http.get(`/products/${productId}`)

    expect(res.status).toEqual(200)
  })
})

describe('POST /products/create', () => {
  test('Should able to create if not exist', async () => {
    const data = {
      category_id: 2,
      name: 'HP elit book',
      price: '12',
      description: 'product 1',
    }

    const res = await Http.post('/products/create').send(data)
    expect(res.status).toEqual(200)
  })
})

describe('UPDATE /products/update/{id}', () => {
  test('Should able to update', async () => {
    const productId = 4
    const data = {
      category_id: 2,
      name: 'Macbook Pro M1, Space gray',
      price: 500.2,
      description: 'product 1',
    }
    const res = await Http.put(`/products/update/${productId}`).send(data)
    expect(res.status).toEqual(200)
  })
})

describe('DELETE /products/delete/{id}', () => {
  test('Should able to delete if exist', async () => {
    const productId = 1
    const res = await Http.delete(`/products/delete/${productId}`)

    expect(res.status).toEqual(200)
  })
})
