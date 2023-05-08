const path = require('path');
const { readdir, stat } = require('fs').promises;

const pathToSecretDir = path.join(__dirname, 'secret-folder')
const options ={withFileTypes: true}

const readDirectory = async () => {
try {
    const files = await readdir(pathToSecretDir,options);
  for (const file of files) {
    if (file.isFile()) {
      const filePath = path.join(pathToSecretDir, file.name)
      const fileName = file.name.split('.')[0]
      const fileExt = file.name.split('.')[1]
      const stats = await stat(path.join(filePath));
      console.log(`${fileName} - ${fileExt} - ${stats.size}`)
    }
  };
} catch (err) {
    console.error(err);
}
}
readDirectory()
