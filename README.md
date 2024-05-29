<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Micro servicio encargado de la administración de usuarios y la seguridad de la infraestructura. Desarrollado en NestJs con aprovisionamiento de
una base de datos SQLServer y como medio de transporte NATS Server.

## Installation

1. Clonar el mono repositorio Launcher

```
$ git clone [URL del repositorio]
```

2. Ingresar a cada submodule y ejecuta el siguiente comando para generar los paquetes

```bash
$ yarn install
```

3. Crear el archivo .env basado en el archivo .env.template

## Running the app

1. Desde el directorio o1.launcher, donde se encuentra el archivo docker-compose, ejecutar el siguiente comando

```bash
# development
$ docker compose up --build

```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
