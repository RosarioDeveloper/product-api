import Route from '@ioc:Adonis/Core/Route'

//Route Group Categories
Route.group(() => {
  Route.get('/', 'CategoriesController.index')
  Route.get('/:id', 'CategoriesController.show')
  Route.post('/create', 'CategoriesController.store')
  Route.put('/update/:id', 'CategoriesController.update')
  Route.delete('/delete/:id', 'CategoriesController.delete')
}).prefix('categories')
