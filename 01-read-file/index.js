const path = require('path');
const fs = require('fs')
const { stdout } = process;

const textPath = path.join(__dirname, 'text.txt')
const stream = fs.createReadStream(textPath, 'utf-8')
let data = '';

stream.on('data', chunk =>data+=chunk)
stream.on('end', ()=> stdout.write(data))
stream.on('error', error => console.log("Error", error.message))
