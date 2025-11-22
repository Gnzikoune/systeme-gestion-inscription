import { type News, defaultNews } from "@/lib/data/news"

const NEWS_STORAGE_KEY = "csgr_ia_news"

export function getNewsFromStorage(): News[] {
  if (typeof window === "undefined") return defaultNews

  try {
    const stored = localStorage.getItem(NEWS_STORAGE_KEY)
    if (!stored) {
      return []
    }
    return JSON.parse(stored)
  } catch (error) {
    console.error("Error reading news from localStorage:", error)
    return []
  }
}

export function saveNewsToStorage(news: News[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news))
  } catch (error) {
    console.error("Error saving news to localStorage:", error)
  }
}

export function addNewsToStorage(news: News): void {
  const allNews = getNewsFromStorage()
  allNews.push(news)
  saveNewsToStorage(allNews)
}

export function updateNewsInStorage(id: string, updates: Partial<News>): void {
  const allNews = getNewsFromStorage()
  const index = allNews.findIndex((n) => n.id === id)
  if (index !== -1) {
    allNews[index] = { ...allNews[index], ...updates, date_modification: new Date().toISOString() }
    saveNewsToStorage(allNews)
  }
}

export function deleteNewsFromStorage(id: string): void {
  const allNews = getNewsFromStorage()
  const filtered = allNews.filter((n) => n.id !== id)
  saveNewsToStorage(filtered)
}

export function generateNewsId(): string {
  return `news-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}
