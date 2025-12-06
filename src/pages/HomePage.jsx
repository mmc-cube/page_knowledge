import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import '../styles/HomePage.css'

export default function HomePage() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const navigate = useNavigate()

  // 检测窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    loadManifest()
  }, [])

  const loadManifest = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.BASE_URL}content/manifest.json`)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: 无法加载 manifest.json`)
      }
      const manifest = await response.json()

      // 验证 manifest 结构
      if (!manifest.version || !Array.isArray(manifest.subjects)) {
        throw new Error('manifest.json 格式错误：缺少 version 或 subjects 字段')
      }

      setSubjects(manifest.subjects)
      setError(null)
    } catch (err) {
      console.error('加载 manifest 失败:', err)
      setError(err.message)
      setSubjects([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubjectClick = (subjectId) => {
    navigate(`/subject/${subjectId}`)
  }

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading">加载中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="home-page">
        <h1>期末复习站</h1>
        <ErrorMessage
          title="加载失败"
          message={error}
          details="请检查 /public/content/manifest.json 文件是否存在且格式正确"
        />
        <button className="retry-btn" onClick={loadManifest}>
          重试
        </button>
      </div>
    )
  }

  return (
    <div className="home-page">
      <header className="header">
        <h1>📚 期末复习站</h1>
        <p className="subtitle">选择学科，立即开始复习</p>
      </header>

      {subjects.length === 0 ? (
        <div className="empty-state">
          <p>暂无学科内容</p>
          <p className="text-secondary">请检查 manifest.json 配置</p>
        </div>
      ) : isMobile ? (
        // 移动端：列表式显示，节省竖屏空间
        <div className="subjects-grid">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="subject-card"
              onClick={() => handleSubjectClick(subject.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <h2 className="subject-name">{subject.name}</h2>
                {subject.itemCount && (
                  <span className="subject-count">{subject.itemCount} 条</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 桌面端：卡片网格显示
        <div className="subjects-grid">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="subject-card"
              onClick={() => handleSubjectClick(subject.id)}
            >
              <h2 className="subject-name">{subject.name}</h2>
              {subject.itemCount && (
                <p className="subject-count">{subject.itemCount} 条内容</p>
              )}
              <div className="card-footer">点击开始 →</div>
            </div>
          ))}
        </div>
      )}

      <footer className="footer">
        <p>每个学科包含知识卡片和选择题，按顺序混合学习</p>
      </footer>
    </div>
  )
}
