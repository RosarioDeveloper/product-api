## Desafio de Produto - Backend

### Ferramentas Utilizadas

- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)
- [Adonis](https://adonisjs.com/)

### Inicio

Antes de começarmos verifique se o docker está instalado na sua máquina. Caso não esteja, clique no link de acordo ao seu sistema operacional e segue os passos.

#### Instalando o Docker

- [Windows](https://docs.docker.com/desktop/windows/install/)
- [Mac](https://docs.docker.com/desktop/mac/install/)
- [Linux](https://docs.docker.com/engine/install/ubuntu/)

A seguir clone o repositorio usando [GIT](https://docs.docker.com/engine/install/ubuntu/) ou faça o download do repositorio.

```
git clone https://github.com/RosarioDeveloper/product-api.git
```

- A seguir digite `cd product-api` para entrar no diretório do projecto

### Executando o App

Dentro do diretorio `product-api` digite o comando abaixo

```
docker-compose up
```

Uma vez executado o comando acima, o app é inicializado automaticamente neste endpoint: `http://localhost:3333`. Caso deseja
parar o app digite o comando abaixo.

ATT: Para saber mais como usar os endpoints do app, visite a [Documentação da API](https://documenter.getpostman.com/view/20788051/UyrHgtbR)

```
docker-compose down
```

Para inicializar novamente o app digite `docker-compose up`

### Executando os Tests

Execute o comando abaixo para executar os testes

```javascript
docker-compose exec app yarn test
```
