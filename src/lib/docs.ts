import fs from "fs"
import matter from "gray-matter"
import { join } from "path"
import { remark } from "remark"
import html from "remark-html"
import prism from "remark-prism"

const docsDirectory = join(process.cwd(), "/public/docs")

export const getDocBySlug = (slug) => {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = join(docsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return { slug: realSlug, meta: data, content }
}

export const getAllDocs = () => {
  const slugs = fs.readdirSync(docsDirectory)
  const docs = slugs.map((slug) => getDocBySlug(slug))
  return docs
}

export const markdownToHtml = async (markdown) => {
  const result = await remark()
    // https://github.com/sergioramos/remark-prism/issues/265
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown)
  return result.toString()
}
