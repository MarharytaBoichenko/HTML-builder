const path = require('path');
const { mkdir , readdir, copyFile, rm} = require('fs').promises;

const oldDir = path.join(__dirname, 'files')
const dirPath = path.join(__dirname, 'files-copy')

const copyDir = async () => {
  try {
    await rm(dirPath,{
    recursive: true,
    force: true,
  })
    const newDir = await mkdir(dirPath, { recursive: true })
    const files = await readdir(oldDir);
    for (const file of files) {
      const oldFile = path.join(oldDir, file)
      const newFile = path.join(newDir, file)
      copyFile(oldFile, newFile)
  }
} catch (error) {
 console.error(error);
}
}

copyDir()
