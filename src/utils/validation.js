/**
 * 验证单个 item 的格式
 */
export function validateItem(item, subjectId) {
  const errors = []

  // 检查公共字段
  if (!item.id) {
    errors.push('缺少必填字段: id')
  }
  if (!item.type) {
    errors.push('缺少必填字段: type')
  } else if (!['card', 'mcq'].includes(item.type)) {
    errors.push(`无效的 type: ${item.type}，只能是 "card" 或 "mcq"`)
  }

  // 检查 card 字段
  if (item.type === 'card') {
    if (!item.front) {
      errors.push('Card 缺少必填字段: front')
    }
    if (!item.back) {
      errors.push('Card 缺少必填字段: back')
    }
  }

  // 检查 mcq 字段
  if (item.type === 'mcq') {
    if (!item.stem) {
      errors.push('MCQ 缺少必填字段: stem')
    }
    if (item.multi === undefined || item.multi === null) {
      errors.push('MCQ 缺少必填字段: multi')
    }
    if (!Array.isArray(item.options) || item.options.length < 2) {
      errors.push('MCQ 选项数量应 ≥ 2')
    }
    if (!Array.isArray(item.answer) || item.answer.length === 0) {
      errors.push('MCQ 缺少必填字段: answer')
    }

    // 检查选项的 key 和 text
    if (Array.isArray(item.options)) {
      item.options.forEach((opt, idx) => {
        if (!opt.key) {
          errors.push(`选项 ${idx} 缺少 key`)
        }
        if (!opt.text) {
          errors.push(`选项 ${idx} 缺少 text`)
        }
      })
    }

    // 检查 answer 中的 key 是否都在 options 中
    if (Array.isArray(item.options) && Array.isArray(item.answer)) {
      const validKeys = new Set(item.options.map((opt) => opt.key))
      item.answer.forEach((ansKey) => {
        if (!validKeys.has(ansKey)) {
          errors.push(`答案 key "${ansKey}" 不在选项中`)
        }
      })
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * 验证 manifest
 */
export function validateManifest(manifest) {
  const errors = []

  if (!manifest.version) {
    errors.push('缺少必填字段: version')
  }
  if (!Array.isArray(manifest.subjects)) {
    errors.push('缺少必填字段: subjects (应为数组)')
  } else {
    manifest.subjects.forEach((subject, idx) => {
      if (!subject.id) {
        errors.push(`学科 ${idx} 缺少 id`)
      }
      if (!subject.name) {
        errors.push(`学科 ${idx} 缺少 name`)
      }
      if (!subject.path) {
        errors.push(`学科 ${idx} 缺少 path`)
      }
    })
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * 检查选择题答案是否正确
 */
export function checkMCQAnswer(selected, answer, multi) {
  if (multi) {
    // 多选：集合相等（顺序无关）
    const selectedSet = new Set(selected)
    const answerSet = new Set(answer)
    return selectedSet.size === answerSet.size && Array.from(selectedSet).every((k) => answerSet.has(k))
  } else {
    // 单选：直接比较
    return selected === answer[0]
  }
}
