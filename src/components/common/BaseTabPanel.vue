<!-- 실제 탭 내용 -->
<template>
  <div
    v-if="isActive"
    class="base-tab__panel"
    role="tabpanel"
    :id="panelId"
    :aria-labelledby="labelId"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed, inject, onMounted } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
})

const registerTab = inject('BaseTabs_registerTab', null)
const currentValue = inject('BaseTabs_currentValue', null)

const panelId = computed(() => `panel-${props.value}`)
const labelId = computed(() => `tab-${props.value}`)

onMounted(() => {
  if (registerTab) {
    registerTab({
      label: props.label,
      value: props.value,
    })
  }
})

const isActive = computed(() => {
  if (!currentValue) return false
  return currentValue.value === props.value
})
</script>

