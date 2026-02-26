<template>
    <div class="base-table">
      <table>
        <caption class="visually-hidden">
          {{ caption }}
        </caption>
  
        <colgroup v-if="$slots.colgroup">
          <slot name="colgroup" />
        </colgroup>
  
        <thead v-if="$slots.header">
          <tr>
            <slot name="header" />
          </tr>
        </thead>
  
        <tbody>
          <!-- 데이터 행 -->
          <tr v-for="row in pageRows" :key="rowKey(row)">
            <slot name="row" :row="row" />
          </tr>
  
          <!-- 빈 상태 -->
          <tr v-if="pageRows.length === 0">
            <td :colspan="colspan" class="empty">
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- 페이징 -->
      <nav
        v-if="totalPages > 1"
        class="base-table__pagination"
        aria-label="페이지"
      >
        <button type="button" @click="goPrev" :disabled="currentPage === 1">
          이전
        </button>
  
        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          @click="goToPage(page)"
          :class="{ 'is-active': page === currentPage }"
          :aria-current="page === currentPage ? 'page' : undefined"
        >
          {{ page }}
        </button>
  
        <button
          type="button"
          @click="goNext"
          :disabled="currentPage === totalPages"
        >
          다음
        </button>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  
  const props = defineProps({
    rows: { type: Array, default: () => [] },
    caption: { type: String, default: '' },
    emptyText: { type: String, default: '데이터가 없습니다.' },
    pageSize: { type: Number, default: 10 },
    rowKey: { type: Function, default: (row) => row.id },
    colspan: { type: Number, default: 1 },
  })
  
  const currentPage = ref(1)
  
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(props.rows.length / props.pageSize))
  )
  
  const pageRows = computed(() => {
    const start = (currentPage.value - 1) * props.pageSize
    return props.rows.slice(start, start + props.pageSize)
  })
  
  function goToPage(page) {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
  }
  function goPrev() { goToPage(currentPage.value - 1) }
  function goNext() { goToPage(currentPage.value + 1) }
  </script>