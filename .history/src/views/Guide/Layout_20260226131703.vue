<template>
    <h1>Layout</h1>
    <section>
        <div class="cont">
            <div class="bx">
                <h2><em>Table</em> basic</h2>
                <div class="notice-table">
                    <div v-if="search" class="notice-search">
                        <BaseSelect
                        v-model="regionVal"
                        :placeholder="regionOptions[0].label"
                        :options="regionOptions"
                    />
                        <BaseInput v-model="searchVal" placeholder="검색어를 입력해주세요.">
                        <template #suffix>
                        <img src="/src/assets/images/icons/ico_serch.png" alt="">
                        </template></BaseInput>
                    </div>
                    <!-- 총 리스트 갯 수 -->
                    <div class="notice-count">총 <em>{{ rows.length }}</em>건</div>
                    
                    <table>
                        <caption class="visually-hidden">공지사항 목록</caption>
                        <colgroup>
                            <col style="width: 70%;">
                            <col style="width: 15%;">
                            <col style="width: 15%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">제목</th>
                                <th scope="col">등록일</th>
                                <th scope="col">조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in rows" :key="row.id">
                                <td class="title" :colspan="isMobile ? 3 : 1" scope="row">
                                    <div class="notice-title">
                                        <a href="#" class="notice-title__text" @click.prevent>{{ row.title }}</a>
                                        <!-- 첨부파일 아이콘 -->
                                        <span v-if="row.hasAttachment" class="notice-title__icon">
                                            <img src="/src/assets/images/icons/ico_file.svg" alt="첨부파일 있음">
                                        </span>
                                        <!-- 뱃지 (중요 공지 등) -->
                                        <span v-if="row.isImportant" class="notice-title__badge"role="status" aria-label="중요 게시물">HOT</span>
                                    </div>
                                    <div class="notice-num">
                                        <span class="notice-num__date">
                                            <span class="label">등록일</span>
                                            <time :datetime="row.date">{{ row.date }}</time>
                                        </span>

                                        <span class="notice-num__views">
                                            <span class="label">조회수</span>
                                            {{ row.views }}
                                        </span>
                                    </div>
                                </td>
                                <td v-if="!isMobile" scope="row" class="num"><time :datetime="row.date">{{ row.date }}</time></td> 
                                <td v-if="!isMobile" scope="row" class="num">{{ row.views }}</td>
                            </tr>
                            <!-- empty row -->
                             <tr class="empty" v-if="empty">
                                <td colspan="3">데이터가 없습니다.</td>
                             </tr>
                        </tbody>
                    </table>
                    <!-- Paging -->
                    <nav class="notice-pagination" aria-label="공지사항 페이지" v-if="totalPages > 1">
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

                        <button type="button" @click="goNext" :disabled="currentPage === totalPages">
                            다음
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const rows = ref([
  { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true,  hasAttachment: true,  date: '2026.02.24', views: 623 },
  { id: 9,  title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true,  date: '2026.02.23', views: 865 }
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