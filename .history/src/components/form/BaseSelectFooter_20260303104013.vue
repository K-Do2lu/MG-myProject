<template>
     <BaseSelect
    v-bind="$attrs"
    :model-value="modelValue"
    @update:modelValue="onSelect"
    :label="label"
    :placeholder="options[0]?.label"
    :options="options"
    variant="footer"
  />
</template>

<script setup>
import { nextTick } from 'vue'
import BaseSelect from './BaseSelect.vue'

defineOptions({ inheritAttrs: false })

defineProps({
  modelValue: [String, Number],
  label: { type: String, default: '' },
  placeholder: String,
  options: { type: Array, default: () => [] },
})


const emit = defineEmits(['update:modelValue'])

const onSelect = (value) => {
    emit('update:modelValue', value)
    if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
        window.open(value, '_blank', 'noopener,noreferrer')
    }
}
const onSelect = (value) => {
  emit('update:modelValue', value)
  if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
    nextTick(() => {
      window.open(value, '_blank', 'noopener,noreferrer')
    })
  }
}
</script>

<style lang="scss" scoped>
@use "@scss/components/_form.scss";
</style>