<template>
  <div class="form-field" ref="fieldRef" :class="{'form-field--footer': variant === 'footer'}">
    <label class="form-field__label" :for="`${fieldId}-trigger`">
      <span class="form-field__label-text" :id="`${fieldId}-label`">{{ label }}</span>
    </label>

    <div class="form-select" :class="{ 'is-open': isOpen, 'form-select--footer': variant === 'footer' }">
      <span class="form-select__icon form-select__icon--prefix" aria-hidden="true">
        <slot name="prefix"></slot>
      </span>

      <button
        type="button"
        ref="triggerRef"
        class="form-select__trigger"
        :id="`${fieldId}-trigger`"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
        :aria-controls="`${fieldId}-listbox`"
        :aria-labelledby="`${fieldId}-label`"
        :aria-describedby="describedByIds"
        :aria-invalid="!!error"
        :aria-required="required || undefined"
        @click="toggle"
        @keydown="onTriggerKeydown"
      >
        <span class="form-select__value">{{ selectedLabel }}</span>
        <span class="form-select__icon form-select__icon--suffix" aria-hidden="true">
          <slot name="suffix">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </slot>
        </span>
      </button>

      <ul
        v-show="isOpen"
        ref="listboxRef"
        :id="`${fieldId}-listbox`"
        class="form-select__list"
        role="listbox"
        :aria-activedescendant="activeDescendant"
        :aria-labelledby="`${fieldId}-label`"
        tabindex="-1"
        @keydown="onListKeydown"
      >
        <li
          v-for="(opt, index) in options"
          :key="opt.value"
          :id="`${fieldId}-option-${index}`"
          class="form-select__option"
          role="option"
          :aria-selected="modelValue === opt.value"
          :class="{ 'is-selected': modelValue === opt.value, 'is-focused': focusedIndex === index }"
          @click.stop="selectOption(opt)"
          @mousemove="focusedIndex = index"
        >
          {{ opt.label }}
        </li>
      </ul>
    </div>

    <span v-if="hint" :id="`${fieldId}-hint`" class="form-field__hint">{{ hint }}</span>
    <span v-if="error" :id="`${fieldId}-error`" class="form-field__error" role="alert">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import { useFormField } from '@/composables/useFormField'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  options: { type: Array, default: () => [] },
  hint: String,
  error: String,
  required: Boolean,
  variant:{type: String, default: ']'},
})

const emit = defineEmits(['update:modelValue'])

const { fieldId, describedByIds } = useFormField('select', props)
const fieldRef = ref(null)
const triggerRef = ref(null)
const listboxRef = ref(null)

const isOpen = ref(false)
const focusedIndex = ref(-1)

const selectedLabel = computed(() => {
  const opt = props.options.find(o => o.value === props.modelValue)
  return opt ? opt.label : props.placeholder
})

const activeDescendant = computed(() => {
  if (focusedIndex.value < 0 || !props.options[focusedIndex.value]) return undefined
  return `${fieldId.value}-option-${focusedIndex.value}`
})

function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    focusedIndex.value = props.options.findIndex(o => o.value === props.modelValue)
    if (focusedIndex.value < 0) focusedIndex.value = 0
    nextTick(() => listboxRef.value?.focus())
  } else {
    triggerRef.value?.focus()
  }
}

function selectOption(opt) {
  emit('update:modelValue', opt.value)
  isOpen.value = false
  focusedIndex.value = -1
  nextTick(() => {
    triggerRef.value?.focus()
  })
}

function close() {
  isOpen.value = false
  focusedIndex.value = -1
  triggerRef.value?.focus()
}

function onTriggerKeydown(e) {
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown') {
    e.preventDefault()
    if (!isOpen.value) toggle()
    else if (e.key !== ' ') listboxRef.value?.focus()
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (!isOpen.value) toggle()
  }
}

function onListKeydown(e) {
  const len = props.options.length
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (props.options[focusedIndex.value]) selectOption(props.options[focusedIndex.value])
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    focusedIndex.value = focusedIndex.value < len - 1 ? focusedIndex.value + 1 : 0
    return
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    focusedIndex.value = focusedIndex.value > 0 ? focusedIndex.value - 1 : len - 1
    return
  }
  if (e.key === 'Home') {
    e.preventDefault()
    focusedIndex.value = 0
    return
  }
  if (e.key === 'End') {
    e.preventDefault()
    focusedIndex.value = len - 1
    return
  }
}

function handleClickOutside(e) {
  if (fieldRef.value && !fieldRef.value.contains(e.target)) close()
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
@use "@scss/components/_form.scss";
</style>