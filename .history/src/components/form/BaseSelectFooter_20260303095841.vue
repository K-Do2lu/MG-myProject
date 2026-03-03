<template>
     <BaseSelect
    v-bind="$attrs"
    :label="label"
    :placeholder="placeholder"
    :options="options"
    variant="footer"
    v-on="listeners"
  />
</template>

<script setup>
import BaseSelect from './BaseSelect.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  label: { type: String, default: '' },
  placeholder: String,
  options: { type: Array, default: () => [] },
})

// v-model + 기타 이벤트 그대로 전달
const listeners = { ... }
</script>

<style lang="scss" scoped>
@use "@scss/components/_form.scss";
</style>