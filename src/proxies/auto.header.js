const PARAMETROS = {
    development: 'https://api.jurissearch.com',
    production: 'https://api.myapp.com'
}

const ENTORNO = 'development'


export default {
    URL: PARAMETROS[ENTORNO]
}