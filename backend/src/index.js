require('dotenv').config(); // modulo dotenv e importa las variable desde el .env

const app = require('./app');
require('./database');

async function main() { //async Metodo asincrono //nuevo js desde Emac Script 2015
    await app.listen(app.get('port')); //await Metodo asincrono //nuevo js desde Emac Script 2015
    console.log('[OK] Server Nodejs connected on port', app.get('port'));
}

main();
