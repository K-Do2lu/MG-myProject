<template>
    <div class="card-slider">
      <button
        type="button"
        class="card-slider__btn card-slider__btn--prev"
        @click="prev"
      >
        <span class="visually-hidden">이전 카드 3개 보기</span>
        <img src="@/assets/images/icons/ico_slider_leftArrow.png" alt="" aria-hidden="true" />
      </button>
  
      <div
        class="card-slider__viewport"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
      >
        <div
          class="card-slider__track"
          :style="trackStyle"
        >
          <BaseCard
            v-for="card in cardList"
            :key="card.id"
            :date="card.date"
            :title="card.title"
            :content="card.content"
          />
        </div>
      </div>
  
      <button
        type="button"
        class="card-slider__btn card-slider__btn--next"
        @click="next"
      >
        <span class="visually-hidden">다음 카드 3개 보기</span>
        <img src="@/assets/images/icons/ico_slider_rightArrow.png" alt="" aria-hidden="true" />
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import BaseCard from '@/components/common/BaseCard.vue'
  
  const visibleCount = 3
  
  const cardList = [
    { id: 1, date: '2026-03-16', title: 'Card 1', content: 'Card 1 content' },
    { id: 2, date: '2026-03-16', title: 'Card 2', content: 'Card 2 content' },
    { id: 3, date: '2026-03-16', title: 'Card 3', content: 'Card 3 content' },
    { id: 4, date: '2026-03-16', title: 'Card 4', content: 'Card 4 content' },
    { id: 5, date: '2026-03-16', title: 'Card 5', content: 'Card 5 content' },
    { id: 6, date: '2026-03-16', title: 'Card 6', content: 'Card 6 content' },
  ]
  
  const currentPage = ref(0) // 0: 카드 1~3, 1: 카드 4~6 ...
  
  const pageCount = computed(() =>
    Math.ceil(cardList.length / visibleCount)
  )
  
  const trackStyle = computed(() => {
    const x = currentPage.value * 100 // 한 페이지를 100% 폭으로 보고 왼쪽으로 이동
    return {
      transform: `translateX(-${x}%)`,
    }
  })
  
  const next = () => {
    currentPage.value = (currentPage.value + 1) % pageCount.value
  }
  
  const prev = () => {
    currentPage.value = (currentPage.value + 1) % pageCount.value
  }
  
  /* 자동 슬라이드(autoplay) */
  const autoplayDelay = 3000 // 4초마다 이동 (원하는 값으로 조정)
  let autoplayTimer = null
  
  const startAutoplay = () => {
    stopAutoplay()
    autoplayTimer = setInterval(() => {
      next()
    }, autoplayDelay)
  }
  
  const stopAutoplay = () => {
    if (autoplayTimer !== null) {
      clearInterval(autoplayTimer)
      autoplayTimer = null
    }
  }
  
  onMounted(() => {
    startAutoplay()
  })
  
  onBeforeUnmount(() => {
    stopAutoplay()
  })
  </script>
  
  <style lang="scss" scoped>
  @use "@scss/abstract" as ab;
  
  .card-slider {
    @include ab.flex(flex, null, center, space-between, 16px);
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* 카드가 보이는 프레임 */
  .card-slider__viewport {
    flex: 1 1 auto;
    overflow: hidden;
  }
  
  /* 실제로 좌우로 슬라이드되는 트랙 */
  .card-slider__track {
    display: flex;
    transition: transform .3s ease; // 슬라이드 애니메이션
  }
  
  /* 한 화면에 카드 3개씩 딱 맞게 */
  .card-slider__track > :deep(.base-card) {
    flex: 0 0 calc(100% / 3);
  }
  
  /* 좌/우 버튼 공통 스타일 */
  .card-slider__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid ab.$color-scale-30;
    background: ab.$color-scale-0;
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease;
  
    img {
      width: 20px;
      height: 20px;
    }
  
    &:hover {
      background: ab.$color-scale-10;
      border-color: ab.$color-scale-60;
    }
  }
  
  /* 좌/우 버튼 위치 여백 (필요시 조정) */
  .card-slider__btn--prev {
    margin-right: 8px;
  }
  
  .card-slider__btn--next {
    margin-left: 8px;
  }
  </style>