<template>
    <div class="card-slider">
      <button
        type="button"
        class="card-slider__btn card-slider__btn--prev"
        @click="prevSlide"
      >
        <span class="visually-hidden">이전 카드 보기</span>
        <img src="@/assets/images/icons/ico_slider_leftArrow.png" alt="" aria-hidden="true" />
      </button>

      <div class="card-slider__viewport" @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay">
        <div class="card-slider__track"
        :style="slideStyle">
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
        @click="nextSlide"
      >
        <span class="visually-hidden">다음 카드 보기</span>
        <img src="@/assets/images/icons/ico_slider_rightArrow.png" alt="" aria-hidden="true" />
      </button>
    </div>
  </template>

  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const cardList = [
    { id: 1, date: '2026-03-16', title: 'Card 1', content: 'Card 1 content' },
    { id: 2, date: '2026-03-16', title: 'Card 2', content: 'Card 2 content' },
    { id: 3, date: '2026-03-16', title: 'Card 3', content: 'Card 3 content' },
    { id: 4, date: '2026-03-16', title: 'Card 4', content: 'Card 4 content' },
    { id: 5, date: '2026-03-16', title: 'Card 5', content: 'Card 5 content' },
    { id: 6, date: '2026-03-16', title: 'Card 6', content: 'Card 6 content' },
  ]

  const currentIndex = ref(0);
  const totalItems = cardList.length;
  const viewCount = 3;
  let timer = null; // 타이머를 담을 변수

  const slideStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * (100 / viewCount)}%)`,
    transition: 'transform 0.5s ease-in-out'
  };
});
// 다음 버튼
const nextSlide = () => {
  if (currentIndex.value < totalItems - viewCount) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // 마지막이면 처음으로 (루프)
  }
};

// 이전 버튼
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = totalItems - viewCount; // 처음이면 마지막으로
  }
};

// 자동 재생 시작
const startAutoPlay = () => {
    timer = setInterval(() => {
        nextSlide();
    }, 3000);
}
// 자동 재생 정지 (사용자가 버튼을 누르거나 마우스를 올렸을 때 대비)
const stopAutoPlay = () => {
  if (timer) clearInterval(timer);
};

// [중요] 컴포넌트가 마운트될 때 시작, 사라질 때 정지
onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay(); // 메모리 누수 방지!
});

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

  /* 트랙(기본 가로 배치) */
  .card-slider__track {
    display: flex;
    gap: 20px;
  }

  /* 한 화면에 카드 3개씩 딱 맞게 */
  .card-slider__track > :deep(.base-card) {
    flex: 0 0 calc(100% / 3 - 20px);
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