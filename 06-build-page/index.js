const path = require('path');
const { readFile, readdir, writeFile, mkdir ,copyFile, rm} = require('fs').promises;

const pathToStylesDir = path.join(__dirname, 'styles')
const pathDistDir = path.join(__dirname, 'project-dist' )
const pathToDistMarkup = path.join(pathDistDir, 'index.html')
const templatePath = path.join(__dirname, 'template.html')
const componentsPath = path.join(__dirname, 'components')
const stylesFile = path.join(pathDistDir, 'style.css')
const assetsDir = path.join(__dirname, 'assets')
// const assetsDist = path.join(pathDistDir, 'assets')
const options = { withFileTypes: true }

const createBuild = async () => {
 await mkdir(pathDistDir,{ recursive: true })
  let dataFromTemplate = await readFile(templatePath, { encoding: 'utf8' })
  const components = await readdir(componentsPath, { encoding: 'utf8' })
  const htmlComponents = components.filter(file => file.split('.')[1] === 'html')
  for (let file of htmlComponents) {
    const tagToReplace = `{{${path.parse(path.join(__dirname, 'components', `${file}`)).name}}}`
    const  elFromComponents = await readFile(path.join(componentsPath, file), { encoding: 'utf8' })
    dataFromTemplate = dataFromTemplate.replace(tagToReplace, elFromComponents)
  }
   await writeFile(pathToDistMarkup, dataFromTemplate, 'utf8', { flag: 'wx' });
}

createBuild()

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
      await writeFile(stylesFile, arrStyles, 'utf8', {flag: 'wx'});
    } catch (err) {
    console.error(err);
  }
}
createBundle()

const copyDir = async (fromDir, pathDistDir) => {
  try {
    await rm(pathDistDir,{
    recursive: true,
    force: true,
  })
    await mkdir(pathDistDir, { recursive: true })
    const files = await readdir(fromDir, options);

    for (const file of files) {
      const from = path.join(fromDir, file.name);
      const to = path.join(pathDistDir, file.name);
      if (file.isFile()) {
       await copyFile(from, to)
      } else {
        await copyDir(from, to)
        }
  }
} catch (error) {
 console.error(error);
}
}
copyDir(assetsDir, path.join(pathDistDir, 'assets') )
