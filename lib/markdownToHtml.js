import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import stringify from 'rehype-stringify'
import rehypePrism from '@mapbox/rehype-prism'

export default async function markdownToHtml(markdown) {
  const data = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(stringify)
    .process(markdown)

  return data.toString()
}
