<template>
    <h1>Form</h1>
    <section>
        <div class="cont">
            <div class="bx">
                <h2><em>Input</em></h2>
                <div class="bx">

                    <!-- input -->
                     <!-- .form-field -> form 공통 class -->
                     <div class="form-field">

                        <label class="form-field__label">
                            <span class="form-field__label-text">{{label}}</span>

                            <div class="form-input">
                                <!-- icon -->
                                <span class="form-input__icon form-input__icon--prefix" aria-hidden="true"><img src="/src/assets/vue.svg" alt=""></span>
                                <!-- input -->
                                <input
                                    type="text"
                                    class="form-input__control"
                                    :value="modelValue"
                                    :placeholder="placeholder"
                                    aria-describedby="search-error search-hint"
                                    aria-invalid="false"
                                    required
                                    />
                            </div>
                        </label>
                        <span id="search-hint" class="form-field__hint">최소 2자 이상 입력</span>
                        <span id="search-error" class="form-field__error" role="alert">에러 메시지</span>

                     </div>
      


                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
    modalValue: String,
    label: String,
    placeholder: String,
    hint: String,
    error: String,
    required: Boolean,
})

defineEmits(['update: modeValue'])

// 고유 ID (컴포넌트 인스턴스마다 다르게)
const fieldId = computed(() => `field-${Math.random().toString(36).slice(2, 9)}`)

// hint/error가 있을 때만 해당 ID를 aria-describedby에 포함
const describedByIds = computed(() => {
  const ids = []
  if (props.hint) ids.push(`${fieldId.value}-hint`)
  if (props.error) ids.push(`${fieldId.value}-error`)
  return ids.length ? ids.join(' ') : undefined
})
</script>

<style lang="scss" scoped></style>