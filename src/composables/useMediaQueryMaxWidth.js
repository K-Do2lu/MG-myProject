import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * (max-width: Npx) 미디어쿼리 일치 여부
 * @param {number} maxWidthPx
 */
export function useMediaQueryMaxWidth(maxWidthPx) {
  const matches = ref(false)
  let mq

  function update() {
    if (mq) matches.value = mq.matches
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    mq = window.matchMedia(`(max-width: ${maxWidthPx}px)`)
    update()
    mq.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    if (mq) mq.removeEventListener('change', update)
  })

  return { matches }
}
