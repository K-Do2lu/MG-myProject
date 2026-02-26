<template>
    <h1>Layout</h1>
  
    <section>
      <div class="cont">
        <!--  -->
        <div class="notice-table">
            <BaseTable
            :rows="rows"
            caption="공지사항 목록"
            empty-text="등록된 공지사항이 없습니다."
            :page-size="10"
            :colspan="isMobile ? 1 : 3"
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
                <td v-if="!isMobile" scope="row" class="num">
                {{ row.views }}
                </td>
            </template>
            </BaseTable>
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
  ])
  
  const isMobile = ref(false)
  let mq
  
  onMounted(() => {
    mq = window.matchMedia('(max-width: 500px)')
    isMobile.value = mq.matches
    mq.addEventListener('change', () => { isMobile.value = mq.matches })
  })
  
  onBeforeUnmount(() => {
    if (mq) mq.removeEventListener('change', () => { isMobile.value = mq.matches })
  })
  </script>
  
  <style lang="scss" scoped>
  @use "@scss/components/_table.scss";
  section .cont { border: none; }
  </style>