<!-- 버튼 목록 + 상태 관리 + provide -->
<template>
  <div class="base-tabs">
    <!-- 탭 버튼 영역 -->
    <div
      class="base-tabs__list"
      role="tablist"
      aria-orientation="horizontal"
    >
      <button
        v-for="(tab, tabIndex) in tabs"
        :key="tab.value"
        class="base-tabs__tab"
        :id="`tab-${tab.value}`"
        :class="{ 'is-active': tab.value === currentValue }"
        role="tab"
        :aria-selected="tab.value === currentValue"
        :aria-controls="`panel-${tab.value}`"
        type="button"
        @click="selectTab(tab.value)"
        @keydown="onKeydown($event, tabIndex)"
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
import { computed, provide, ref } from 'vue'

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

function onKeydown(event, index) {
  if (!tabs.value.length) return

  const lastIndex = tabs.value.length - 1

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown': {
      event.preventDefault()
      const nextIndex = index === lastIndex ? 0 : index + 1
      selectTab(tabs.value[nextIndex].value)
      break
    }
    case 'ArrowLeft':
    case 'ArrowUp': {
      event.preventDefault()
      const prevIndex = index === 0 ? lastIndex : index - 1
      selectTab(tabs.value[prevIndex].value)
      break
    }
    case 'Home': {
      event.preventDefault()
      selectTab(tabs.value[0].value)
      break
    }
    case 'End': {
      event.preventDefault()
      selectTab(tabs.value[lastIndex].value)
      break
    }
    case 'Enter':
    case ' ': {
      event.preventDefault()
      selectTab(tabs.value[index].value)
      break
    }
  }
}

provide('BaseTabs_registerTab', registerTab)
provide('BaseTabs_currentValue', currentValue)
</script>