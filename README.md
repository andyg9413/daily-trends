# daily-trends

API to expose news feeds from different sources.

## Prerequisites

- Node 16 or later
- Npm 8 or later
- Typescript 4.4 or later

## Installation

1. Clone the repository:
   `git clone https://github.com/andyg9413/daily-trends.git`

2. Navigate to the project directory:
   `cd daily-trends`

3. Install the dependencies:
   `npm install`

4. Build the project:
   `npm run build`

5. Configure your database connection by creating an `.env` file in the root folder. You can use the `.env.example`

6. Run the application:
   `npm run start`

## Usage

To run the application, you can use the following command:
`npm run start`

To run the application in development mode, you can use the following command:
`npm run start:dev`

### Configuration

The application needs to be configured using the following environment variables:
- `PORT`: The port where the application will be running
- `MONGO_DB_URI`: The URI of the MongoDB database
- `EL_PAIS_URL`: The URL of the El Pais
- `EL_MUNDO_URL`: The URL of the El Mundo

### Endpoints
The application exposes the following endpoints:
- `GET /feeds`: Returns the list of feeds
- `GET /feeds/:id`: Returns the feed with the given id
- `POST /feeds`: Creates a new feed
- `PUT /feeds/:id`: Updates the feed with the given id
- `DELETE /feeds/:id`: Deletes the feed with the given id
- `GET /feeds/dashboard/news`: Returns the n most recent news from the newspapers configured
- `POST /feeds/scrap`: Scrap the news from the newspapers configured and store them in the database

## Testing

The project includes a suite of automated tests to ensure the correctness and reliability of the code. These tests can
be run using the following command:
`npm run test`

This will run all the tests in the `src/test` directory.

## Docker

The application can be run using Docker. To do so, you can use the following command:
`docker-compose up`

Make sure to set the environment variables in the `docker-compose.yml` file or in the host machine.

## Architecture diagram

The architecture diagram can be found [here](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=DailyTrends.drawio#R7V1bc5s4FP41fgyjC%2BLy2MRJNzvNbrbe6W6fdoit2EyxcTG59devZCQMkrAxBuxc8ExrDiCjcz6dm46UAb6YP39OguXsJp7QaIDA5HmAhwOEoO8B9h%2BnvAgKcHFGmSbhRNA2hFH4i8obBfUhnNBV6cY0jqM0XJaJ43ixoOO0RAuSJH4q33YfR%2BVfXQZTqhFG4yDSqf%2BEk3SWUT3kbui%2F0XA6k78MHT%2B7cheMf0yT%2BGEhfm8RL2h2ZR7IZkQfV7NgEj8VSPhygC%2BSOE6zb%2FPnCxpxvkqOZc9dVVzNXzmhi7TOAw4FY29sgzviugD4%2BAx6WROPQfQg%2BCDeNH2RjOF9W%2Bq%2FVBZHcCdvF119pElKnwu3ijf6TOM5TZMXdou4ShzxiEAOEadPGykgia5ZUQJYEAMh%2BWne9IYF7IvgQl2OwN0cYWJc8q8cYzQZ4PP7eJGOxHXIzlfLYBwupn%2FHS04AjMIYJFEFEc4IOZyQnRFu41WYhvGCkSJ6z66cz9J5JNpcI4zy1%2Bbt5UjiJ%2BN4Ho7F9yi4o9F5DsmLOIrZGw7XoGSPpUn8I8c3FK9%2BFczDiHP%2FG00mwSKQPcrG6Pr9gyic8vcaM%2Fmvu6wDohpcu6FwJFkTTdZXlDKeLRibooj1s13JE6AIHrrvXfDiqldWAbauAiBEOizcFlDx9a%2Fr6Or%2BcpjEv76Obn%2FdDb%2F%2BvjpDGjDGOShWGipYJxWZZexWZHAfRpFC0rjLWRYyo%2FRJXJiHkwn%2FmfOnWZjSEUMX%2F80nZoM1ZHQiGFgWzBnWBOMYhmsno9VxNcbTCTPh4lRwtMyTgkgYV5KXfzndQsSWhO%2BMcAYsAJCk3NIkZC%2FLpbFuYhKsZuv2YI1BFiTpVci7tH6ULiafuGfCTuMlXWSU8vXiUKs5ItdvOXzO2%2BBnL5UYEOZsFT8kY1rBWSykyl5%2FStNtw0KMC873rehJaBSk4WPZtTKhQTx6G4fshXPUOb5jMWDlByqB0HEdy%2FfLbWavLppRQJa%2FV0PcAQ13dUBGPFwEGbAgIm8CY%2FQ5TLMuOgCLc95DyEaRL843j%2FKT4pNq15shVnppRcRWwro9tB5kU%2FBux7IgTCHuSj%2Bgkm87e1vQ3cSguyXtwCFMyoYDAcUkZOLVBqzWDlR9A62l9oa%2BUWy6j3ib0BXjerD22BD4ErwYPMVT9QlkeFPfA4BuWQD5edE7Qx15AUaRQHyQJ3B62jbXqDDzTIRGBczMkb01asEG%2Bb5ig5Dn7dLuJvvUTEkjcmJuhUfUTINvkWZqiQClKadfrQSdd2VN1BSRGvjVtyb%2BjpY6llueHnuXcvNVk9BYblpLXctNdwOG8TwI36MD4INjOwDoBNLW%2BSPSLzUkrXJaKZepmopWsiO4Rnjx2vPWkjih98FDlJrTmoXxtLmvpiPGz%2FWHa6RAt6N0v%2Fx3Z5gxvqTuR6xo8hiO6etJcx7KfHnVtohd%2FLjaeLax5eDCx9YlhZDlERfaSP5rdyQ4qHsSfPJilEmv5bF%2F9JkLSRwwo7I%2Bdg5%2Bduf9%2Bmg2%2FIs%2F1IMCEFddZLmo8MFlZxVbuHToZphFNMDffKAOUNexoA9s15H%2FdoRPfFi6%2FuSC9Oau9oE%2BtO94JRRgv6ET7St%2BnNNzJg17ByGikNcAoDSBAyxejPEWcuuVIGtn%2Fgb3BFmiRGt2U8gSW4Fsz2kW7GtG9iZeTOPheaWBHb9EIQNwgiu8mQKi7zKof7nLCTky%2F3xIWTO5bRbwIe1EdI4a0HmGgA6Y3NDOIjob7Q5f3m5eBGqMbZwY0ZvqeIjYeuA5DNLgPeRFPFhmPfCPnRixDzOxp2kruc2HFoC5E5DZfILhDmu631zGyU5TuKihcnChb7lljHqwX%2B0gu%2FIWAYnVAg8XNQHkZvbPhoNyOcX%2Bk3%2B1HMitvuFuJ9LvZxiwcMWSRX%2FSUSENR4Lj23pbqN%2BRUKOwuOuctYfLmoUYHL%2BKgr6uLBauwZaPvHWveWtS3xU6Im70gCGhSy7QOAlfe%2FJ6DwlIBWf5vmfnH1Ia5rKcuSAtV0l2kx6dVMNUFc9cf5Xie2lZAXwkrzvWAhKDmLlA%2FuYogxCagiNs0BleZ8GRreHuegO6a86e%2B%2BBj6uS1oq%2Fs2mAD2kwzq22gzX1eLqMoWMKz6c8f15e3Nz%2BvsGEJiR4JbUKUcRSsVlys1SAo1F0TGRiIwCOr6tsrUChFVnsKZXcsUbfyup9sG1SK9bTZ9NrZNqIm2zqLpo2Y0hWYhqnOy14UFjiGYiBjCQNS5wDaqwaqMdQ%2BQoiuQoitQD288qVD2OhuKOsUk%2BYrih4OZH5F5YsDtSF9SpUvSFeDPH645ML7iB169t7aQaBDLJsU6l7cspl1seXBTdmLrKs5euGLsfN6Quuaw%2FMDmG8PmJiXopxgQZax7%2FutP6wRkOwIIbYJ4FQCA9Wfb1qnAuVkQj4VvBbq5lCWGbUXJ5w%2FerO7mfffMP6D%2FrqJgm8P37%2BcQVsTbY2yqkFxNmtQMVt1mjNyW8upFLDtnPytWMjW%2BgSXq1aBqLmIuujDSj2Pti9G13DTF8do%2BCvEpZr2rY5LNUlVT20plWKmBJBtSjd2t4kIdDW2fGIqkTn%2Fr3Ll8HbR17aoWNlSBPW5mkgf2s1TKlv5cUCipQhYEx9aAWzlYt23nETpafsj1Cj70aesdcU0GjMlsKTJiL7F1SOnJ3ipDJU6adMUGbKQoyPD8SzcQqRgNlx6CLta44NJ%2BNWYqxakAywb2wBCjzfhEgjKy3Ew357BdRxeg4v5FgCOLj2%2Bw4BDeAbDhxjYMkIsr%2B2zPJccLkqzPdIk%2BQd9Wo0YOz%2FGeNUYN%2FinNYBVPWOiFl31PsiNyNAnTS6jZRCu3ugCwpOFB1T8YeP2OkfAh54uuozmjLvxB0B61h%2FK%2Br9TAYhhAbKGiaYVDi6WFQ2iwsGX%2ByLtWwq9NflT6SMUKxyqteex0pZIrWdomjjS1iGpKw26ThzVKP5tCiECyltpIds5LQjhY0IIqxBquqMSJnwOZHPA4wKq9UmOHFBFMFUCyUaWk2%2FZVrkxG7QAypeKZOh0SaON2QxTMB2htVae3D0mpLV9CiEzfl6hHlUxhLWVpLLRj7O92a4Rrm%2FY8tqSyjv8o12rLtW94EyVni3lj9np5o8zZBLc%2FPULfPk%2F)