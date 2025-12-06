import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default function Formula({ content, block = false }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !content) return

    try {
      const html = katex.renderToString(content, {
        throwOnError: false,
        displayMode: block,
      })
      ref.current.innerHTML = html
    } catch (err) {
      console.error('KaTeX 渲染错误:', err)
      ref.current.textContent = content
    }
  }, [content, block])

  return <span ref={ref} className={`formula ${block ? 'formula-block' : 'formula-inline'}`} />
}
