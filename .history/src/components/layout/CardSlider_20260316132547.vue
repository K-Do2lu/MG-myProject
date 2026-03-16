<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.card-slider {
  @include ab.flex(flex, null, center, space-between, 16px);
  max-width: 1200px;
  margin: 0 auto;
}

/* 카드가 보이는 영역(프레임) */
.card-slider__viewport {
  flex: 1 1 auto;
  overflow: hidden;
}

/* 실제로 좌우로 슬라이드되는 트랙 */
.card-slider__track {
  display: flex;
  transition: transform .4s ease; // 버튼 클릭 시 주르륵 애니메이션
}

/* 한 화면에 카드 3개씩 딱 맞게 보이도록 */
.card-slider__track > :deep(.base-card) {
  flex: 0 0 calc(100% / 3); // 3등분
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

/* 좌/우 버튼 위치 여백 (필요에 따라 조정) */
.card-slider__btn--prev {
  margin-right: 8px;
}

.card-slider__btn--next {
  margin-left: 8px;
}
</style>