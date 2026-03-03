<template>
  <BaseSelect
    v-bind="$attrs"
    list-position="top"
    :model-value="modelValue"
    @update:modelValue="onSelect"
    label="Family Site"
    :placeholder="options[0]?.label"
    :options="options"
    variant="footer"
    :hide-label="true"
  />
</template>

<script setup>
import { nextTick } from 'vue'
import BaseSelect from './BaseSelect.vue'

defineOptions({ inheritAttrs: false })

defineProps({
  modelValue: [String, Number],
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

<style lang="scss" scoped>
@use "@scss/components/_form.scss";
</style>