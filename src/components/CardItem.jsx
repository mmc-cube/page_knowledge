import { useState } from 'react'
import ContentRenderer from './ContentRenderer'
import '../styles/CardItem.css'

export default function CardItem({ item }) {
  const [flipped, setFlipped] = useState(false)

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  return (
    <div className="card-item">
      <div className={`card-content ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="card-inner">
          {!flipped ? (
            <div className="card-front">
              <ContentRenderer text={item.front} />
            </div>
          ) : (
            <div className="card-back">
              <div className="card-back-content">
                <ContentRenderer text={item.back} />
              </div>
              {item.explain && (
                <div className="card-explain">
                  <strong>💡 解析：</strong>
                  <ContentRenderer text={item.explain} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
