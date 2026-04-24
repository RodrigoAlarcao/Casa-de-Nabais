import sharp from 'sharp'
import { readdir, unlink, stat } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(fileURLToPath(import.meta.url), '../../public/images')

// Max width per image category (height scales proportionally)
const MAX_WIDTH = {
  hero: 1920,
  fullbleed: 1920,
  section: 1200,
  carousel: 1100,
  explore: 900,
  vinhos: 900,
}

function getMaxWidth(filePath) {
  if (filePath.includes('/hero/')) return MAX_WIDTH.hero
  if (filePath.includes('fullbleed')) return MAX_WIDTH.fullbleed
  if (filePath.includes('section-')) return MAX_WIDTH.section
  if (filePath.includes('carousel-')) return MAX_WIDTH.carousel
  if (filePath.includes('/explore/')) return MAX_WIDTH.explore
  if (filePath.includes('/vinhos/')) return MAX_WIDTH.vinhos
  return 1200
}

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...await findImages(full))
    else if (/\.(jpg|jpeg|png)$/i.test(e.name)) files.push(full)
  }
  return files
}

async function main() {
  const images = await findImages(ROOT)
  let totalBefore = 0, totalAfter = 0

  for (const src of images) {
    const sizeBefore = (await stat(src)).size
    totalBefore += sizeBefore

    // Skip the duplicate with wrong extension
    if (src.endsWith('.jpg.jpg')) {
      await unlink(src)
      console.log(`  deleted duplicate: ${basename(src)}`)
      totalBefore -= sizeBefore
      continue
    }

    const dest = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    const maxW = getMaxWidth(src)

    await sharp(src)
      .resize({ width: maxW, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest)

    const sizeAfter = (await stat(dest)).size
    totalAfter += sizeAfter
    const pct = Math.round((1 - sizeAfter / sizeBefore) * 100)
    console.log(`  ${basename(src)} → ${basename(dest)}  ${(sizeBefore/1024/1024).toFixed(1)}MB → ${(sizeAfter/1024/1024).toFixed(1)}MB  (-${pct}%)`)

    // Remove original after successful conversion
    await unlink(src)
  }

  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (-${Math.round((1 - totalAfter/totalBefore)*100)}%)`)
}

main().catch(console.error)
