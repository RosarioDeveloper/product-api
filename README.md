## Desafio de Produto - Backend

### Requesitos
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)
- [Heroku](https://www.heroku.com/)
- [Adonis](https://adonisjs.com/)

### Inicio
Antes de começarmos verifique se o docker está instalado na sua máquina. Caso não esteja clique no link de acordo ao seu sistema operacional e segue os passos.
#### Instalar Docker
- [Windows](https://docs.docker.com/desktop/windows/install/)
- [Mac](https://docs.docker.com/desktop/mac/install/)
- [Linux](https://docs.docker.com/engine/install/ubuntu/)

#### Instalar GIT
- Para baixar e instalar GIT clique [aqui](https://git-scm.com/downloads)



A seguir clone o repositorio com o seguinte commando: 
```
git clone https://github.com/RosarioDeveloper/product-api.git
```
- Digite `cd product-api` para entrar no diretório do projecto

### Executar o applicativo
- Dentro do diretorio `product-api` digite o comando abaixo

```
docker-compose up -d && docker-compose exec app /bin/sh && node ace migration:run && node ace db:seed
```
Após executar o comando acima o app será inicializado em: `http://localhost:3333`

Important: Uma vez feito o build a primeira vez, o app é inicializado automaticamente. Caso deseja 
terminar o app digite o comando abaixo

```
docker-compose down
```

Para inicializar novamente o app digite
```
docker-compose up -d
```


###  Tests
Execute o comando abaixo para executar os testes
```javascript
yarn test
```

