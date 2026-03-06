<template>
  <div class="form-field">
    <label class="form-field__label">
      <span :class="['form-field__label-text', { 'visually-hidden': hideLabel }]" :id="`${fieldId}-label`">{{ label }}</span>

      <div class="form-input">
        <span v-if="$slots.prefix" class="form-input__icon form-input__icon--prefix" aria-hidden="true">
          <slot name="prefix"></slot>
        </span>
        <input
          :id="`${fieldId}-input`"
          type="text"
          class="form-input__control"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :aria-describedby="describedByIds"
          :aria-invalid="!!error"
          :required="required"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <span v-if="$slots.suffix" class="form-input__icon form-input__icon--suffix" aria-hidden="true">
          <slot name="suffix"></slot>
        </span>
      </div>
    </label>

    <!-- 도움말 -->
    <span v-if="hint" :id="`${fieldId}-hint`" class="form-field__hint">{{ hint }}</span>
    <!-- 에러 -->
    <span v-if="error" :id="`${fieldId}-error`" class="form-field__error" role="alert">{{ error }}</span>
  </div>
</template>

<script setup>

import { useFormField } from '@/composables/useFormField'

// 1) props 정의 (자식이 부모한테 값을 받기 위해)
const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  hint: String,
  error: String,
  required: Boolean,
  disabled: Boolean,
})

// 2) emit 정의 (부모에 알릴 이벤트)
defineEmits(['update:modelValue'])

// 3) fieldId, describedByIds 생성 (useformField에서)
const { fieldId, describedByIds } = useFormField('input', props)
</script>
<style lang="scss" scoped>
@use "@scss/components/_form.scss";
</style>