import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CardItem from '../components/CardItem'
import MCQItem from '../components/MCQItem'
import ErrorMessage from '../components/ErrorMessage'
import { validateItem } from '../utils/validation'
import '../styles/StudyPage.css'

export default function StudyPage() {
  const { subjectId } = useParams()
  const navigate = useNavigate()

  const [subjectName, setSubjectName] = useState('')
  const [items, setItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [skippedItems, setSkippedItems] = useState(new Set())
  const [cardFlipped, setCardFlipped] = useState(false)

  useEffect(() => {
    loadSubject()
  }, [subjectId])

  const loadSubject = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.BASE_URL}content/subjects/${subjectId}.json`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: 无法加载学科内容`)
      }

      const subject = await response.json()

      // 验证基本结构
      if (!subject.subjectId || !Array.isArray(subject.items)) {
        throw new Error('学科文件格式错误：缺少 subjectId 或 items 字段')
      }

      // 验证每个 item
      const validatedItems = subject.items.map((item, idx) => {
        const validationResult = validateItem(item, subject.subjectId)
        if (validationResult.errors.length > 0) {
          console.warn(
            `Item ${item.id || `[${idx}]`} 格式警告:`,
            validationResult.errors
          )
          // 标记为跳过
          setSkippedItems((prev) => new Set(prev).add(item.id))
          return { ...item, _skipped: true, _errors: validationResult.errors }
        }
        return item
      })

      setSubjectName(subject.subjectName || '未命名学科')
      setItems(validatedItems)
      setError(null)
    } catch (err) {
      console.error('加载学科失败:', err)
      setError(err.message)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const getCurrentItem = () => {
    // 跳过有错误的 item
    let idx = currentIndex
    while (idx < items.length && items[idx]._skipped) {
      idx++
    }
    return idx < items.length ? { item: items[idx], index: idx } : null
  }

  const handleItemNext = (result) => {
    setCurrentIndex((prev) => prev + 1)
    setCardFlipped(false)
  }

  const handleCardRemember = (remembered) => {
    handleItemNext({
      itemId: current?.item.id,
      remembered,
    })
  }

  const handleBack = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="study-page">
        <div className="loading">加载中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="study-page">
        <button className="back-btn" onClick={handleBack}>
          ← 返回
        </button>
        <div className="study-header">
          <h1>{subjectName}</h1>
        </div>
        <ErrorMessage
          title="加载失败"
          message={error}
          details={`请检查 /public/content/subjects/${subjectId}.json 文件`}
        />
      </div>
    )
  }

  const current = getCurrentItem()
  const isCompleted = current === null

  return (
    <div className="study-page">
      <header className="study-header">
        <button className="back-btn" onClick={handleBack}>
          ← 返回
        </button>
        <div className="header-info">
          <h1>{subjectName}</h1>
          <div className="progress">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </header>

      <main className="study-main">
        {isCompleted ? (
          <div className="completion">
            <div className="completion-icon">🎉</div>
            <h2>完成！</h2>
            <p>您已完成本学科的所有内容</p>
            <button className="btn btn-primary" onClick={handleBack}>
              返回首页
            </button>
          </div>
        ) : (
          <div className="item-container">
            {current.item.type === 'card' ? (
              <CardItem item={current.item} key={current.index} />
            ) : current.item.type === 'mcq' ? (
              <MCQItem item={current.item} onNext={handleItemNext} />
            ) : (
              <ErrorMessage
                title="未知题型"
                message={`不支持的题型: ${current.item.type}`}
              />
            )}
          </div>
        )}
      </main>

      <footer className="study-footer">
        {!isCompleted && current?.item.type === 'card' && (
          <div className="card-actions">
            <button className="btn btn-secondary" onClick={() => handleCardRemember(false)}>
              ❌ 没记住
            </button>
            <button className="btn btn-primary" onClick={() => handleCardRemember(true)}>
              ✅ 记住了
            </button>
          </div>
        )}
        {!isCompleted && current?.item.type !== 'card' && (
          <p className="footer-hint">选择答案后点击提交</p>
        )}
      </footer>
    </div>
  )
}

  const current = getCurrentItem()
  const isCompleted = current === null

  return (
    <div className="study-page">
      <header className="study-header">
        <button className="back-btn" onClick={handleBack}>
          ← 返回
        </button>
        <div className="header-info">
          <h1>{subjectName}</h1>
          <div className="progress">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </header>

      <main className="study-main">
        {isCompleted ? (
          <div className="completion">
            <div className="completion-icon">🎉</div>
            <h2>完成！</h2>
            <p>您已完成本学科的所有内容</p>
            <button className="btn btn-primary" onClick={handleBack}>
              返回首页
            </button>
          </div>
        ) : (
          <div className="item-container">
            {current.item.type === 'card' ? (
              <CardItem item={current.item} />
            ) : current.item.type === 'mcq' ? (
              <MCQItem item={current.item} onNext={handleItemNext} />
            ) : (
              <ErrorMessage
                title="未知题型"
                message={`不支持的题型: ${current.item.type}`}
              />
            )}
          </div>
        )}
      </main>

      <footer className="study-footer">
        {!isCompleted && current?.item.type === 'card' && (
          <div className="card-actions">
            <button className="btn btn-secondary" onClick={() => handleCardRemember(false)}>
              ❌ 没记住
            </button>
            <button className="btn btn-primary" onClick={() => handleCardRemember(true)}>
              ✅ 记住了
            </button>
          </div>
        )}
        {!isCompleted && current?.item.type !== 'card' && (
          <p className="footer-hint">选择答案后点击提交</p>
        )}
      </footer>
    </div>
  )
}
