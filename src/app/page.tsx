'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const fetchAnimalImage = async (type: 'cat' | 'dog') => {
    setIsLoading(true)
    try {
      const url = `https://api.the${type === 'dog' ? 'dog' : 'cat'}api.com/v1/images/search`;
      const response = await fetch(url)
      const data = await response.json()
      setImageUrl(data[0]?.url)
    } catch (error) {
      console.error('이미지를 가져오는데 실패했습니다:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.buttonContainer}>
        <button 
          onClick={() => fetchAnimalImage('cat')}
          className={styles.button}
          disabled={isLoading}
        >
          고양이 보기
        </button>
        <button 
          onClick={() => fetchAnimalImage('dog')}
          className={styles.button}
          disabled={isLoading}
        >
          강아지 보기
        </button>
      </div>

      <div className={styles.imageContainer}>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          imageUrl && (
            <div className={styles.imageWrapper}>
              <Image 
                src={imageUrl}
                alt="동물 이미지"
                fill
                sizes="(max-width: 500px) 100vw, 500px"
                priority
                className={styles.image}
              />
            </div>
          )
        )}
      </div>
    </main>
  )
} 