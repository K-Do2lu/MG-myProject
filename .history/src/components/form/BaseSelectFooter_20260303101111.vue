<template>
     <BaseSelect
    v-bind="$attrs"
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :label="label"
    :placeholder="placeholder"
    :options="options"
    variant="footer"
  />
</template>

<script setup>
import BaseSelect from './BaseSelect.vue'

defineOptions({ inheritAttrs: false })

defineProps({
  modelValue: [String, Number],
  label: { type: String, default: '' },
  placeholder: String,
  options: { type: Array, default: () => [] },
})

defineEmits(['update:modelValue'])

const options = [
    { value: 'Family', label: '제목' },
    { value: 'content', label: '내용' },
  ]
</script>

<style lang="scss" scoped>
@use "@scss/components/_form.scss";
</style>