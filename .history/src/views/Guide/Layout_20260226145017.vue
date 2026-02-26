<template>
    <h1>Layout</h1>
    <section>
        <div class="cont">
            <div class="notice-table">
  <!-- 검색/필터는 테이블 밖, Layout에 그대로 둠 -->
  <BaseTable
    :rows="rows"
    caption="공지사항 목록"
    empty-text="등록된 공지사항이 없습니다."
    :page-size="10"
    :colspan="isMobile ? 3 : 1"
  >
    <template #colgroup>
      <col style="width: 70%">
      <col style="width: 15%">
      <col style="width: 15%">
    </template>

    <template #header>
      <th scope="col">제목</th>
      <th scope="col">등록일</th>
      <th scope="col">조회수</th>
    </template>

    <template #row="{ row }">
      <td class="title" :colspan="isMobile ? 3 : 1">…제목/뱃지/등록일·조회수…</td>
      <td v-if="!isMobile" class="num">…</td>
      <td v-if="!isMobile" class="num">…</td>
    </template>
  </BaseTable>
</div>
        </div>
    </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const rows = ref([
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 },

])

// paging
const pageSize = ref(10)
const currentPage = ref(1)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(rows.value.length / pageSize.value))
)

const pageRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return rows.value.slice(start, start + pageSize.value)
})

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}
function goPrev() {
  goToPage(currentPage.value - 1)
}
function goNext() {
  goToPage(currentPage.value + 1)
}

// 빈 상태 (현재 페이지 기준으로 보고 싶으면 pageRows 기준으로)
const empty = computed(() => pageRows.value.length === 0)

// 검색/필터 관련
const isMobile = ref(false)
const searchVal = ref('')
const regionVal = ref('')
const regionOptions = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
]
const search = ref(true)

// 반응형 (모바일 여부)
let mq
const updateIsMobile = () => {
  if (!mq) return
  isMobile.value = mq.matches
}

onMounted(() => {
  mq = window.matchMedia('(max-width: 500px)')
  updateIsMobile()
  mq.addEventListener('change', updateIsMobile)
})

onBeforeUnmount(() => {
  if (mq) mq.removeEventListener('change', updateIsMobile)
})
</script>

<style lang="scss" scoped>
@use "@scss/components/_table.scss";
section .cont{border: none;}
</style>