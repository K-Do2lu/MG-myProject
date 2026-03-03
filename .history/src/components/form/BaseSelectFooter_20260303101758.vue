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
    { value: 'FamilySite', label: 'Family Site' },
    { value: 'https://www.kfcc.co.kr/', label: 'MG새마을금고' },
    { value: 'https://www.mginfo.co.kr/', label: 'MG신용정보' },
    { value: 'http://www.mgts.co.kr/Default.asp', label: 'MG토탈서비스' },
    { value: 'https://www.kccwf.or.kr/home/comm/comm0001m01/mainPage.html', label: 'MG토탈서비스' },
  ]
</script>

<style lang="scss" scoped>
@use "@scss/components/_form.scss";
</style>