const PARAMETROS = {
    development: 'http://localhost:3000',
    production: 'https://api.myapp.com'
}

const ENTORNO = 'development'


export default {
    URL: PARAMETROS[ENTORNO]
}