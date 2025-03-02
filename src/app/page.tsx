'use client'
import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>('')
  
  const fetchAnimalImage = async (type: 'cat' | 'dog') => {
    try {
      const response = await fetch(`https://g92maytncj.execute-api.ap-northeast-2.amazonaws.com/dev/${type === 'dog' ? '?type=dog' : ''}`)
      const data = await response.json()
      console.log(data)
      setImageUrl(data.url)
    } catch (error) {
      console.error('이미지를 가져오는데 실패했습니다:', error)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.buttonContainer}>
        <button 
          onClick={() => fetchAnimalImage('cat')}
          className={styles.button}
        >
          고양이 보기
        </button>
        <button 
          onClick={() => fetchAnimalImage('dog')}
          className={styles.button}
        >
          강아지 보기
        </button>
      </div>

      {imageUrl && (
        <div className={styles.imageContainer}>
          <img 
            src={imageUrl} 
            alt="동물 이미지" 
            className={styles.image}
          />
        </div>
      )}
    </main>
  )
} 