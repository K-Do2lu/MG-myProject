<template>
    <div class="form-field">
            <label for="form-field__label"><span class="form-field__label-text"></span>{{ label }}

            <div class="form-select">
                <!-- prefix icon: select 왼쪽에 표시 (위치 아이콘 등) -->
                <!-- aria-hidden: 스크린리더에서 건너뜀 (장식용용) -->
                <span class="form-select__icon form-select__icon--prefix" aria-hidden="true"><slot name="prefix"></slot></span>

                <!-- select: 실제 선택 요소 -->
                <select
                    class="form-select__control"
                    :value="modelValue"
                    :aria-describedby="describedByIds"
                    :aria-invalid="!!error"
                    :required="required"
                    @change="$emit('update:modelValue', $event.target.value)"
                >
                    <option value="">{{ placeholder }}</option>

                    <option v-for="opt in options" :value="opt.value" :key="opt.value">
                        {{ opt.label }}
                    </option>
                </select>

                <!-- suffix icon: select 오른쪽 화살표 (기본값) -->
                <!-- slot에 내용 없으면 기본 svg 화살표 표시 -->
                <span class="form-select__icon form-select__icon--suffix" aria-hidden="true">
                    <slot name="suffix">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                    </slot>
                </span>
            </div>
        </label>

         <!-- hint: 도움말 (예: "선택해주세요") -->
            <!-- v-if: hint가 있을 때만 렌더링 -->
            <!-- :id: aria-describedby와 연결해 스크린리더로 읽히게 함 -->
            <span v-if="hint" :id="`${fieldId}-hint`" class="form-field__hint">{{ hint }}</span>

        <!-- error: 유효성 에러 메시지 -->
        <!-- role="alert": 에러 시 스크린리더가 즉시 읽음 -->
        <span v-if="error" :id="`${fieldId}-error`" class="form-field__error" role="alert">{{ error }}</span>
    </div>
</template>

<script setup>
    import { computed } from 'vue'

    // defineProps: 부모에서 전달받는 데이터 정의
    const props = defineProps({
    // v-model로 양방향 바인딩되는 값 (부모의 regionVal 등)
    modelValue: [String, Number],

    // 라벨 텍스트 (예: "지역")
    label: String,

    // 첫 번째 option 텍스트 (예: "선택하세요")
    placeholder: String,

    // 선택 옵션 배열 [{ value: 'seoul', label: '서울' }, ...]
    options: {
        type: Array,
        default: () => [],
    },

    // 도움말
    hint: String,

    // 유효성 에러 메시지 (부모의 computed에서 계산)
    error: String,

    // 필수 여부
    required: Boolean,
    })

    // defineEmits: 부모에 알리는 이벤트
    // 'update:modelValue': v-model 업데이트 (Vue 3 v-model 규칙)
    defineEmits(['update:modelValue'])

    // fieldId: hint/error의 id, aria-describedby 연결용
    // Math.random().toString(36).slice(2, 9): 짧은 고유 문자열 생성
    // 인스턴스마다 다른 id로 접근성과 DOM 충돌 방지
    const fieldId = computed(() => `select-${Math.random().toString(36).slice(2, 9)}`)

    // describedByIds: aria-describedby 값
    // hint/error가 있을 때만 해당 요소 id를 나열
    // 스크린리더가 "이 select에는 추가 설명이 있다"고 인식
    const describedByIds = computed(() => {
    const ids = []
    if (props.hint) ids.push(`${fieldId.value}-hint`)
    if (props.error) ids.push(`${fieldId.value}-error`)
    return ids.length ? ids.join(' ') : undefined
    })
</script>