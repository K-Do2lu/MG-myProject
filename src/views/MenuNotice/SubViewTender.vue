<template>
  <div class="tab-page tab-page--tender">
    <div class="tab-page-inner inner--tender">
      <div class="content tender">
        <h2 class="sub-title">입찰공고</h2>
         <!-- table -->
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
                </template>
              </BaseInput>
            </div>
            <p v-if="loading" class="notice-loading" role="status" aria-label="불러오는 중">불러오는 중…</p>
            <p v-else-if="fetchError" class="notice-error">{{ fetchError }}</p>
            <div class="notice-count">총 <em>{{ rows.length }}</em>건</div>
  
            <BaseTable
              :rows="rows"
              caption="입찰공고 목록"
              empty-text="데이터가 없습니다."
              :page-size="7"
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
                <td class="title" :colspan="isMobile ? 3 : 1" scope="row">
                  <div class="notice-title">
                    <a href="#" class="notice-title__text" @click.prevent>{{ row.title }}</a>
                    <span v-if="row.hasAttachment" class="notice-title__icon">
                      <img src="/src/assets/images/icons/ico_file.svg" alt="첨부파일 있음">
                    </span>
                    <span v-if="row.isImportant" class="notice-title__badge" role="status" aria-label="중요 게시물">HOT</span>
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
                <td v-if="!isMobile" scope="row" class="num">
                  <time :datetime="row.date">{{ row.date }}</time>
                </td>
                <td v-if="!isMobile" scope="row" class="num">{{ row.views }}</td>
              </template>
            </BaseTable>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { supabase } from '@/supabase'

const rows = ref([])
const loading = ref(true)
const fetchError = ref(null)

function formatTenderDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

async function loadTenders() {
  loading.value = true
  fetchError.value = null

  const { data, error: sbError } = await supabase
    .from('tender') // Supabase 실제 테이블명으로 변경
    .select('id, title, created_at, content, view_count, is_hot, has_file')
    .order('created_at', { ascending: false })

  if (sbError) {
    fetchError.value = sbError.message
    rows.value = []
  } else {
    rows.value = (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      date: formatTenderDate(row.created_at),
      views: row.view_count ?? 0,
      isImportant: Boolean(row.is_hot),
      hasAttachment: Boolean(row.has_file),
    }))
  }
  loading.value = false
}

const isMobile = ref(false)
const searchVal = ref('')
const regionVal = ref('')
const regionOptions = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
]
const search = ref(true)

let mq
const updateIsMobile = () => {
  if (!mq) return
  isMobile.value = mq.matches
}

onMounted(() => {
  loadTenders()
  mq = window.matchMedia('(max-width: 500px)')
  updateIsMobile()
  mq.addEventListener('change', updateIsMobile)
})

onBeforeUnmount(() => {
  if (mq) mq.removeEventListener('change', updateIsMobile)
})
</script>

<style scoped></style>