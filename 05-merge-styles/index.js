const path = require('path');
const { readFile , readdir, writeFile, rm} = require('fs').promises;

const pathToStylesDir = path.join(__dirname, 'styles')
const options = { withFileTypes: true }
const bundle = path.join(__dirname, 'project-dist', 'bundle.css' )

const createBundle = async () => {
  try {
    let arrStyles = []
    const files = await readdir(pathToStylesDir,options);
  for (const file of files) {
    if (file.isFile() && file.name.split('.')[1] === 'css') {
      const filePath = path.join(__dirname, 'styles', file.name)
      const dataFromFile = await readFile(filePath, { encoding: 'utf8' })
      arrStyles.push(dataFromFile)
      }
    };
      await writeFile(bundle, arrStyles, 'utf8', {flag: 'wx'});
    } catch (err) {
    console.error(err);
  }
}

createBundle()
