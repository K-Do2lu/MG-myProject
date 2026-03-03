<template>
  <BaseSelect
    v-bind="$attrs"
    list-position="top"
    :model-value="modelValue"
    @update:modelValue="onSelect"
    :label="label"
    :placeholder="options?.[0]?.label"
    :options="options"
    variant="footer"
    :hide-label="hideLabel"
  />
</template>

<script setup>
import { nextTick } from 'vue'
import BaseSelect from './BaseSelect.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: [String, Number],
  options: { type: Array, default: () => [] },
  // 기본은 'Family Site' + 숨김
  label: { type: String, default: 'Family Site' },
  hideLabel: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue'])

function onSelect(value) {
  emit('update:modelValue', value)
  if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
    nextTick(() => {
      window.open(value, '_blank', 'noopener,noreferrer')
    })
  }
}
</script>