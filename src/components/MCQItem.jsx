import { useState } from 'react'
import ContentRenderer from './ContentRenderer'
import '../styles/MCQItem.css'

export default function MCQItem({ item, onNext }) {
  const [selected, setSelected] = useState(item.multi ? [] : null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)

  const handleOptionChange = (optionKey) => {
    if (item.multi) {
      setSelected((prev) => {
        if (prev.includes(optionKey)) {
          return prev.filter((k) => k !== optionKey)
        } else {
          return [...prev, optionKey]
        }
      })
    } else {
      setSelected(optionKey)
    }
  }

  const checkAnswer = () => {
    if (selected === null || (Array.isArray(selected) && selected.length === 0)) {
      return
    }

    let correct
    if (item.multi) {
      // 多选：集合相等（顺序无关）
      const selectedSet = new Set(selected)
      const answerSet = new Set(item.answer)
      correct = selectedSet.size === answerSet.size && Array.from(selectedSet).every((k) => answerSet.has(k))
    } else {
      // 单选：直接比较
      correct = selected === item.answer[0]
    }

    setIsCorrect(correct)
    setSubmitted(true)
  }

  const handleNext = () => {
    onNext({
      itemId: item.id,
      selected,
      correct: isCorrect,
    })
  }

  const isAnswered = submitted
  const canSubmit = (Array.isArray(selected) ? selected.length > 0 : selected !== null) && !submitted

  return (
    <div className="mcq-item">
      {item.important && <div className="important-badge">⭐</div>}

      <div className="mcq-stem">
        <ContentRenderer text={item.stem} />
      </div>

      <div className="mcq-options">
        {item.options.map((option) => {
          const isSelected = item.multi ? selected.includes(option.key) : selected === option.key
          const isCorrectAnswer = item.answer.includes(option.key)
          const showCorrect = submitted && isCorrectAnswer

          return (
            <label
              key={option.key}
              className={`option ${isSelected ? 'selected' : ''} ${
                submitted && isSelected && !isCorrect ? 'incorrect' : ''
              } ${showCorrect ? 'correct' : ''}`}
            >
              <input
                type={item.multi ? 'checkbox' : 'radio'}
                name={`option-${item.id}`}
                value={option.key}
                checked={isSelected}
                onChange={() => handleOptionChange(option.key)}
                disabled={submitted}
              />
              <span className="option-key">{option.key}</span>
              <span className="option-text">
                <ContentRenderer text={option.text} />
              </span>
              {submitted && isCorrectAnswer && <span className="correct-indicator">✓</span>}
            </label>
          )
        })}
      </div>

      {submitted && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="result-header">{isCorrect ? '✅ 正确' : '❌ 错误'}</div>
          {item.explain && (
            <div className="result-explain">
              <strong>📝 解析：</strong>
              <ContentRenderer text={item.explain} />
            </div>
          )}
        </div>
      )}

      <div className="mcq-controls">
        {!submitted ? (
          <button className={`btn btn-primary ${!canSubmit ? 'disabled' : ''}`} onClick={checkAnswer} disabled={!canSubmit}>
            提交
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            下一题 →
          </button>
        )}
      </div>
    </div>
  )
}
