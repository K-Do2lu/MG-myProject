<template>
    <div class="tab-page tab-page--notice">
      <SubViewNoticeDetail
        v-if="detailId != null"
        :post-id="detailId"
        @close="detailId = null"
      />
      <div v-else class="tab-page-inner inner--notice">
        <div class="content notice">

          <h2 class="sub-title">공지사항</h2>
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
            <p v-if="loading" class="notice-loading">불러오는 중…</p>
            <p v-else-if="fetchError" class="notice-error">{{ fetchError }}</p>
            <div class="notice-count">총 <em>{{ rows.length }}</em>건</div>
  
            <BaseTable
              :rows="rows"
              caption="공지사항 목록"
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
                    <button
                      v-if="row.id != null && row.id !== ''"
                      type="button"
                      class="notice-title__text notice-title__btn"
                      @click="openDetail(row)"
                    >
                      {{ row.title }}
                    </button>
                    <span v-else class="notice-title__text">{{ row.title }}</span>
                    <span v-if="row.hasAttachment" class="notice-title__icon">
                      <img src="/src/assets/images/icons/ico_file.svg" alt="첨부파일 있음">
                    </span>
                    <a
                      v-if="row.downloadUrl"
                      :href="row.downloadUrl"
                      class="notice-title__download"
                      target="_blank"
                      rel="noopener noreferrer"
                      @click.stop
                    >
                      {{ row.attachmentName || '첨부 다운로드' }}
                    </a>
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
  import SubViewNoticeDetail from '@/views/MenuNotice/SubViewNoticeDetail.vue'
  import { getBoardAttachmentPublicUrl } from '@/utils/boardStorage'

  const detailId = ref(null)

  function openDetail(row) {
    if (row?.id == null || row.id === '') return
    detailId.value = row.id
  }

  const rows = ref([])
  const loading = ref(true)
  const fetchError = ref(null)
  
  /** DB의 날짜 컬럼(ISO 문자열) → 화면용 'YYYY.MM.DD' */
  function formatNoticeDate(iso) {
    if (!iso) return ''
    const d = new Date(iso)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}.${m}.${day}`
  }
  
  async function loadNotices() {
  loading.value = true
  fetchError.value = null
  const { data, error: sbError } = await supabase
    .from('notice')
    .select('*')
    .order('created_at', { ascending: false })
  if (sbError) {
    fetchError.value = sbError.message
    rows.value = []
  } else {
    rows.value = (data ?? []).map((row) => {
      const path = row.attachment_path
      return {
        id: row.id,
        title: row.title,
        date: formatNoticeDate(row.created_at),
        views: row.view_count ?? 0,
        isImportant: Boolean(row.is_hot),
        hasAttachment: Boolean(row.has_file),
        attachmentPath: path || null,
        attachmentName: row.attachment_name || '',
        downloadUrl: path ? getBoardAttachmentPublicUrl(path) : '',
      }
    })
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
    loadNotices()
    mq = window.matchMedia('(max-width: 500px)')
    updateIsMobile()
    mq.addEventListener('change', updateIsMobile)
  })
  
  onBeforeUnmount(() => {
    if (mq) mq.removeEventListener('change', updateIsMobile)
  })
  </script>
  
  <style scoped>
  .notice-title__btn {
    border: none;
    background: none;
    padding: 0;
    font: inherit;
    color: inherit;
    text-align: inherit;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
  .notice-title__btn:hover {
    text-decoration: underline;
  }

  .notice-title__download {
    flex-shrink: 0;
    font-size: 13px;
    color: #1565c0;
    text-decoration: underline;
    max-width: 42%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .notice-title__download:hover {
    color: #0d47a1;
  }
  </style>