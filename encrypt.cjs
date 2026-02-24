const CryptoJS = require('crypto-js');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('--- Herramienta de Encriptación de Scripts Apex ---');
console.log('Usa esto para codificar el HTML de los scripts sensibles.');

rl.question('1. Ingresa la contraseña de cifrado: ', (password) => {
    if (!password) {
        console.log('Error: La contraseña no puede estar vacía.');
        process.exit(1);
    }

    rl.question('2. Ingresa o pega el código HTML del componente (presiona Enter 2 veces para terminar):\n', (firstLine) => {
        let htmlContent = firstLine + '\n';

        // Allow multi-line input
        let emptyLineCount = 0;

        rl.on('line', (line) => {
            if (line.trim() === '') {
                emptyLineCount++;
                if (emptyLineCount >= 2) {
                    processInput(htmlContent.trim());
                } else {
                    htmlContent += line + '\n';
                }
            } else {
                emptyLineCount = 0;
                htmlContent += line + '\n';
            }
        });

        function processInput(html) {
            if (!html) {
                console.log('HTML vacío.');
                process.exit(1);
            }

            const ciphertext = CryptoJS.AES.encrypt(html, password).toString();

            console.log('\n--- RESULTADO ENCRIPTADO ---');
            console.log('Pegá el siguiente texto como valor de la propiedad "content" en tu script dentro de data.js o index.js:');
            console.log(`\n\`${ciphertext}\`\n`);
            console.log('¡Listo! Ahora el contenido está seguro y solo se descifrará cuando el usuario ingrese la clave exacta.');
            process.exit(0);
        }
    });
});
