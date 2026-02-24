<template>
<!-- prefix -->
 <div class="form-field">
    <label class="form-field__label">
        <span class="form-field__label-text">label</span>

        <span v-if="$slots.prefix" class="form-input__icon form-input__icon--prefix" aria-hidden="true">
            <slot name="prefix"></slot>
        </span>

        <div class="form-input">
            <input
                type="text"
                id=""
                class="form-input__control"
                :value=""
                placeholder=""
                required="true"
                @input="$emit('update:modelValue', $event.target.value)"
                >
        </div>

        <span v-if="$slots.suffix" class="form-input__icon form-input__icon--suffix" aria-hidden="true">
            <slot name="suffix"></slot>
        </span>

    </label>

    <span class="form-field__hint">hint가 있을때만 표시</span>
    <span class="form-field__error"role="alert">error 메시지</span>
 </div>


<!-- Origin -->
  <div class="form-field" v-if="test">
    <label class="form-field__label">
      <span class="form-field__label-text" :id="`${fieldId}-label`">{{ label }}</span>

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
    <span v-if="hint" :id="`${fieldId}-hint`" class="form-field__hint">{{ hint }}</span>
    <span v-if="error" :id="`${fieldId}-error`" class="form-field__error" role="alert">{{ error }}</span>
  </div>
</template>

<script setup>
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

// import { useFormField } from '@/composables/useFormField'

// const props = defineProps({
//   modelValue: String,
//   label: String,
//   placeholder: String,
//   hint: String,
//   error: String,
//   required: Boolean,
//   disabled: Boolean,
// })

// defineEmits(['update:modelValue'])

// const { fieldId, describedByIds } = useFormField('input', props)
// </script>
