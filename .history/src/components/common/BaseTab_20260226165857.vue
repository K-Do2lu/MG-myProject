<!-- 버튼 목록 + 상태 관리 +  -->
<template>
    <div class="base-tabs">
      <!-- 탭 버튼 영역 -->
      <div class="base-tabs__list" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="base-tabs__tab"
          :class="{ 'is-active': tab.value === currentValue }"
          role="tab"
          :aria-selected="tab.value === currentValue"
          type="button"
          @click="selectTab(tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>
  
      <!-- 탭 패널 영역 -->
      <div class="base-tabs__panels">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, provide, ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: null,
    },
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const tabs = ref([]) // { label, value } 목록
  const currentValue = computed({
    get: () => props.modelValue ?? tabs.value[0]?.value ?? null,
    set: (val) => emit('update:modelValue', val),
  })
  
  function registerTab(tabInfo) {
    const exists = tabs.value.some((t) => t.value === tabInfo.value)
    if (!exists) {
      tabs.value.push(tabInfo)
    }
  }
  
  function selectTab(value) {
    currentValue.value = value
  }
  
  provide('BaseTabs_registerTab', registerTab)
  provide('BaseTabs_currentValue', currentValue)
  </script>