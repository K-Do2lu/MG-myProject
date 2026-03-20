// Vue가 "반응형"으로 추적할 수 있는 도구들.
// ref = 바뀌면 화면이 따라감, computed = 다른 값에서 자동으로 다시 계산, onUnmounted = 컴포넌트가 사라질 때 마무리
import { ref, computed, onUnmounted, watch } from 'vue';

/**
 * 슬라이더(캐러셀)에서 공통으로 나오는 것만 모은 함수.
 * 왜 빼냐면: 모달·메인배너·카드마다 똑같은 코드를 복붙하면 버그·수정이 N배로 늘어나기 때문.
 *
 * @param itemsRef - 배너/슬라이드 배열을 담은 ref. 왜 ref냐면 나중에 API로 채워질 때 길이가 바뀌어도 따라가게 하려고.
 * @param options - 화면마다 다를 수 있는 동작을 밖에서 조절하려고 (루프, 자동재생, 간격).
 */
export function useSlider(itemsRef, options = {}) {
  // 기본값: 모달처럼 끝에서 처음으로 돌아가고(loop), 3초마다 넘김(autoplay)
  const { loop = true, autoplay = true, interval = 3000 } = options;

  // "지금 몇 번째 슬라이드인지" — 버튼·스타일·자동재생이 전부 이 숫자 하나를 기준으로 맞춰야 어긋나지 않음
  const currentIndex = ref(0);

  // 길이를 computed로 두는 이유:
  // - 템플릿/함수에서 매번 itemsRef.value.length 쓰다가 .value 빼먹는 실수 방지
  // - 배열이 나중에 바뀌면(비동기 로딩) 여기도 같이 갱신되게 하기 쉬움
  const len = computed(() => itemsRef.value?.length ?? 0);

  // 슬라이드가 2장 이상일 때만 이전/다음 UI를 보여주고 싶을 때 씀 (1장이면 버튼 숨김)
  const showNav = computed(() => len.value > 1);

  // 자동재생 타이머 핸들. 왜 변수로 두냐면, 나중에 clearInterval 할 때 같은 걸 꺼야 해서.
  let timer = null;

  const stop = () => {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
    // 왜 null까지: "이미 꺼졌다"를 표시해서 start를 여러 번 호출해도 interval이 중복 생성되지 않게
  };

  const next = () => {
    const n = len.value;
    if (n <= 1) return; // 0장·1장이면 움직일 게 없음 — 에러·이상 동작 방지

    if (currentIndex.value < n - 1) {
      currentIndex.value += 1;
    } else if (loop) {
      currentIndex.value = 0; // 끝에서 다시 처음 (모달 배너 패턴)
    }
    // loop가 false면 마지막에서 그대로 멈춤 — "끝에서 멈추는" 슬라이더용
  };

  const prev = () => {
    const n = len.value;
    if (n <= 1) return;

    if (currentIndex.value > 0) {
      currentIndex.value -= 1;
    } else if (loop) {
      currentIndex.value = n - 1; // 처음에서 이전 누르면 마지막으로 (선택 동작)
    }
  };

  const goTo = (index) => {
    const n = len.value;
    if (n === 0) return;
    // 인덱스가 범위 밖으로 나가면 깨지므로 clamp
    currentIndex.value = Math.max(0, Math.min(index, n - 1));
  };

  const start = () => {
    if (!autoplay) return;
    if (len.value < 2) return; // 1장만 있으면 굳이 타이머 돌릴 이유 없음 (BaseModal과 동일한 이유)
    if (timer) return; // 이미 돌고 있으면 또 setInterval 하면 타이머가 겹쳐서 미친 듯이 넘어감

    timer = setInterval(next, interval);
  };

  // 컴포넌트가 사라진 뒤에도 interval이 남으면 메모리·콘솔 경고·의도치 않은 실행이 남을 수 있음 → 반드시 정리
  onUnmounted(() => {
    stop();
  });

  // 배너 개수가 2→1로 바뀌는 경우: 인덱스가 범위 밖에 남을 수 있음 → 한 번 맞춰 줌
  watch(len, (newLen) => {
    if (newLen === 0) {
      currentIndex.value = 0;
    } else if (currentIndex.value >= newLen) {
      currentIndex.value = newLen - 1;
    }
  });

  /**
   * 트랙 스타일: "여러 장을 가로로 한 줄로 붙이고", 보이는 창은 고정, 통째로 translateX로 밀기
   * - width: n장이면 트랙은 n×100% — 각 슬라이드 한 칸이 뷰포트 100%가 되게 맞춤
   * - translateX: -index * (100/n)% — 몇 번째인지에 따라 그만큼 왼쪽으로 이동
   *   (BaseModal은 50% 고정이었는데, 그건 "항상 2장"일 때만 맞음. n장이면 100/n % 가 맞음)
   */
  const trackStyle = computed(() => {
    const n = len.value;
    if (n <= 1) {
      return {
        width: '100%',
        transform: 'translateX(0)',
        transition: 'transform 0.5s ease-in-out',
      };
    }
    const step = 100 / n; // 한 장당 이동 비율 (%)
    return {
      width: `${n * 100}%`,
      transform: `translateX(-${currentIndex.value * step}%)`,
      transition: 'transform 0.5s ease-in-out',
    };
  });

  // 버튼 disabled: loop false일 때 끝/처음에서 더 못 가게
  const disableNav = computed(() => ({
    left: !loop && currentIndex.value === 0,
    right: !loop && currentIndex.value === len.value - 1,
  }));

  return {
    currentIndex,
    len,
    showNav,
    trackStyle,
    next,
    prev,
    goTo,
    start,
    stop,
    disableNav,
  };
}