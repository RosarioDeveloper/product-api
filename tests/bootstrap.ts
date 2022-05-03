import { Client } from 'pg'
import { resolve } from 'path'
import request from 'supertest'

require('dotenv').config({
  path: resolve(__dirname, '..', '.env.test'),
})

const HOST = `http://${process.env.HOST}:${process.env.PORT}`
export const Http = request(HOST)

export const DbConnection = (): Client => {
  return new Client({
    host: '172.17.0.1',
    port: 5433,
    user: 'postgres',
    password: 'postgres',
    //database: 'product_api_test',
  })
}

export const DbInit = async (conn: Client) => {
  try {
    await conn.query(`DROP DATABASE IF EXISTS product_api_test`)
    await conn.query(`CREATE DATABASE product_api_test`)
  } catch (error) {}
}
