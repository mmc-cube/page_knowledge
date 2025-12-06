import { useMemo } from 'react'
import Formula from './Formula'

export default function ContentRenderer({ text }) {
  const elements = useMemo(() => {
    if (!text) return []

    const result = []
    let lastIndex = 0

    // 匹配块级公式 $$...$$ 和行内公式 $...$
    const blockFormulaRegex = /\$\$([^$]+?)\$\$/g
    const inlineFormulaRegex = /\$([^$]+?)\$/g

    // 先处理块级公式
    let match
    const blockMatches = []
    while ((match = blockFormulaRegex.exec(text)) !== null) {
      blockMatches.push({
        type: 'block',
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      })
    }

    // 如果有块级公式，先处理块级，然后在剩余文本中处理行内
    if (blockMatches.length > 0) {
      let currentPos = 0

      for (const blockMatch of blockMatches) {
        // 添加块级公式前的文本和行内公式
        const textBefore = text.substring(currentPos, blockMatch.start)
        if (textBefore) {
          result.push({ type: 'text', content: textBefore })
        }

        // 添加块级公式
        result.push({
          type: 'formula-block',
          content: blockMatch.content,
        })

        currentPos = blockMatch.end
      }

      // 添加最后的文本
      const textAfter = text.substring(currentPos)
      if (textAfter) {
        result.push({ type: 'text', content: textAfter })
      }
    } else {
      // 没有块级公式，只处理行内公式
      while ((match = inlineFormulaRegex.exec(text)) !== null) {
        const textBefore = text.substring(lastIndex, match.index)
        if (textBefore) {
          result.push({ type: 'text', content: textBefore })
        }

        result.push({
          type: 'formula-inline',
          content: match[1],
        })

        lastIndex = match.index + match[0].length
      }

      const textAfter = text.substring(lastIndex)
      if (textAfter) {
        result.push({ type: 'text', content: textAfter })
      }
    }

    return result.length > 0 ? result : [{ type: 'text', content: text }]
  }, [text])

  return (
    <div className="content-renderer">
      {elements.map((elem, idx) => {
        if (elem.type === 'text') {
          return <span key={idx}>{elem.content}</span>
        } else if (elem.type === 'formula-inline') {
          return <Formula key={idx} content={elem.content} block={false} />
        } else if (elem.type === 'formula-block') {
          return (
            <div key={idx} className="formula-block-wrapper">
              <Formula content={elem.content} block={true} />
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
