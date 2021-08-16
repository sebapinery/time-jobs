## Description

#### Stack:
- *TypeScript*
- *NestJS*
- *Docker / Docker-Compose*
- *Mongodb*
- *Mongoose*
- *Jest*

## Installation

```bash
$ cp .env.example .env
$ yarn install
```
***Important!*** 👇🏼
> Set in .env file your API KEY from OpenWeather service. 


### Running Locally

```bash
$ docker-compose up -d

# Logs after run
$ docker-compose logs -f clim-app

# Stop the service
$ docker-compose down


## Test

```bash
# unit tests
$ yarn test
```

## How to get current temperature from a city

> ***METHOD***: GET

> ***ROUTE:*** {{API_URL}}/cities

> ***QUERY PARAM***: cityName
```bash
# example route (not include quotes in cityName value)
http://localhost:3000/cities?cityName="Cordoba"

#response example
{
    "_id": "61199266b954b500572533b9",
    "cityName": "Cordoba",
    "currentTemperature": 13.52,
    "createdAt": "2021-08-15T22:17:10.397Z",
    "updatedAt": "2021-08-16T01:14:21.641Z",
    "__v": 0
}
```
## Swagger

```bash
# Swagger documentation will be running on
http://localhost:3000/api/docs/
```


## Read the entire documentation with Comopodoc
```bash
# Install compodoc globally.
$ npm install -g @compodoc/compodoc

# Start compodoc
$ compodoc -p tsconfig.json -s

# The documentation will be on http://localhost:8080
```
