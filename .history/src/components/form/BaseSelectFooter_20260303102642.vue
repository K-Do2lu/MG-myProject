<template>
     <BaseSelect
    v-bind="$attrs"
    :model-value="modelValue"
    @update:modelValue="onSelect"
    :label="label"
    :placeholder="options[0].label"
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
    { value: 'https://www.kccwf.or.kr/home/comm/comm0001m01/mainPage.html', label: 'MG복지회' },
    { value: 'https://www.mgcap.co.kr/jsp/main/main.jsp', label: 'MG캐피탈' },
    { value: 'http://www.mgtvlive.com/', label: 'MGTV' },
  ]

  const onSelect = (value) => {
    emit('update:modelValue', value)
  if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
    window.open(value, '_blank', 'noopener,noreferrer')
  }
  }
</script>

<style lang="scss" scoped>
@use "@scss/components/_form.scss";
</style>