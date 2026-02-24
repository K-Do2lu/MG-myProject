<template>
    <div class="form-field">


        
        <label for="form-field__label"><span class="form-field__label-text"></span>{{ label }}</label>

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


    </div>
</template>