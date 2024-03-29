import { readFile } from 'node:fs/promises'

async function readFileContent(filePath) {
  const text = await readFile(filePath)
  console.log(text)
}

readFileContent('./7-file-summary-destructure.js')
