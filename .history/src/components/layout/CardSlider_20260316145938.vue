<template>
    <div class="card-slider">
      <button
        type="button"
        class="card-slider__btn card-slider__btn--prev"
      >
        <span class="visually-hidden">이전 카드 보기</span>
        <img src="@/assets/images/icons/ico_slider_leftArrow.png" alt="" aria-hidden="true" />
      </button>

      <div class="card-slider__viewport">
        <div class="card-slider__track">
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
      >
        <span class="visually-hidden">다음 카드 보기</span>
        <img src="@/assets/images/icons/ico_slider_rightArrow.png" alt="" aria-hidden="true" />
      </button>
    </div>
  </template>

  <script setup>
  import { ref, computed } from 'vue';

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

  const slideStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * (100 / viewCount)}%)`,
    transition: 'transform 0.5s ease-in-out'
  };
});
const next = () => {
    if(currentIndex.value > 0){
        currentIndex.value--;
    } else {
        current
    }
}


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