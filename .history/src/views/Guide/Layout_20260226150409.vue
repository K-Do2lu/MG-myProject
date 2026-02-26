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
                </template>
              </BaseInput>
            </div>
            <div class="notice-count">총 <em>{{ rows.length }}</em>건</div>
  
            <BaseTable
              :rows="rows"
              caption="공지사항 목록"
              empty-text="등록된 공지사항이 없습니다."
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
    </section>
  </template>
  
  <script setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import BaseTable from '@/components/common/BaseTable.vue'
  
  const rows = ref([
    { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { id: 9, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { id: 8, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { id: 7, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { id: 6, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { id: 5, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { id: , title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { id: 9, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { id: 9, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { id: 9, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { id: 9, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { id: 9, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { id: 9, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { id: 9, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
  ])
  
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
  section .cont { border: none; }
  </style>