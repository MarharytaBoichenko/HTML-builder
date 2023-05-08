const path = require('path');
const fs = require('fs');
const { stdout, stdin } = process;

const readline = require('node:readline');
const {
    stdin: input,
    stdout: output,
} = require('node:process');

const pathToNewFile = path.join(__dirname, 'text.txt')
stdout.write('Enter your text, please\n')
const outputStream = fs.createWriteStream(pathToNewFile)
const rl = readline.createInterface({ input, output });

rl.on('line', (data) => {
     const userData = data.toString().trim()
  if (userData === 'exit') {
    signalHandler()
  } else {
    outputStream.write('\n' +userData)
  }
});

rl.on('SIGINT', signalHandler);

function signalHandler() {
  console.log('Goodbye!')
  rl.close()
}
