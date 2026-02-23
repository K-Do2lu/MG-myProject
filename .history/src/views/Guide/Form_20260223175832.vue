<template>
    <h1>Form</h1>
    <section>
        <div class="cont">
            <div class="bx">
                <h2><em>Input</em></h2>
                <div class="bx">

                   
      


                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  hint: String,      // "최소 2자 이상 입력"
  error: String,     // validation 에러 메시지
  required: Boolean,
})

defineEmits(['update:modelValue'])

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