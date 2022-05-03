import Route from '@ioc:Adonis/Core/Route'

//Route Group Categories
Route.group(() => {
  Route.get('/', 'CategoriesController.index')
  Route.get('/:id', 'CategoriesController.show')
  Route.post('/create', 'CategoriesController.store')
  Route.put('/update/:id', 'CategoriesController.update')
  Route.delete('/delete/:id', 'CategoriesController.delete')
}).prefix('categories')

//Route Group Productss
Route.group(() => {
  Route.get('/', 'ProductsController.index')
  Route.get('/:id', 'ProductsController.show')
  Route.post('/create', 'ProductsController.store')
  Route.put('/update/:id', 'ProductsController.update')
  Route.delete('/delete/:id', 'ProductsController.delete')
}).prefix('products')

//Route export and inport data
Route.get('/:categoryName/export', 'ExportProductsController.export')
Route.post('/:categoryName/import', 'ImportProductsController.import')
