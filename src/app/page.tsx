'use client'
import { useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  
  const apiUrls = useMemo(() => ({
    cat: 'https://api.thecatapi.com/v1/images/search?size=small',
    dog: 'https://api.thedogapi.com/v1/images/search?size=small'
  }), []);
  
  const fetchAnimalImage = useCallback(async (type: 'cat' | 'dog') => {
    setIsLoading(true);
    setIsImageLoading(true);
    try {
      const response = await fetch(apiUrls[type]);
      const data = await response.json();
      setImageUrl(data[0]?.url || '');
    } catch (error) {
      console.error('이미지를 가져오는데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrls]);


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
        <div className={styles.imageWrapper}>
          {(isLoading || !imageUrl) ? (
            <div className={styles.skeleton}></div>
          ) : (
            <>
              {isImageLoading && <div className={styles.skeleton}></div>}
              <Image 
                src={imageUrl}
                alt="동물 이미지"
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 500px"
                className={`${styles.image} ${!isImageLoading ? styles.loaded : ''}`}
                priority
                quality={75}
                style={{ width: '100%', height: 'auto' }}
                onLoad={(event) => {
                  setIsImageLoading(false);
                }}
              />
            </>
          )}
        </div>
      </div>
    </main>
  )
} 