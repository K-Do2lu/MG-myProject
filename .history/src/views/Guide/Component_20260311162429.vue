<template>
  <h1>Components</h1>
  <section>
    <div class="cont">
      <div class="bx">
        <h2><em>Sub Banner</em></h2>
        <MenuSubBanner />
      </div>
    </div>

    <div class="cont">
      <div class="bx">
        <h2><em>Tab</em></h2>
        <BaseTab v-model="activeTab">
          <BaseTabPanel label="회사개요" value="overview">
            탭 1 내용
          </BaseTabPanel> 
          <BaseTabPanel label="CEO 인사말" value="greeting">
            탭 2 내용
          </BaseTabPanel>
          <BaseTabPanel label="연혁" value="history">
            탭 3 내용
          </BaseTabPanel>
          <BaseTabPanel label="오시는 길" value="directions">
            탭 4 내용
          </BaseTabPanel>
          <BaseTabPanel label="협력사 소개" value="partner">
            탭 5 내용
          </BaseTabPanel>
        </BaseTab>
      </div>
    </div>

    <div class="cont">
      <div class="bx">
        <h2><em>Title</em> subPage</h2>
         <h3 class="sub-title">공지사항</h3>
         <p class="sub-title--sub">공지사항 목록</p>
         <!-- page에서는 h2로 쓸 것 -->
      </div>
    </div>

    <div class="cont">
      <div class="bx">
        <h2><em>Table</em></h2>
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

    <div class="cont">
      <div class="bx">
        <h2><em>Top Button</em></h2>
        <BaseTopButton scroll-target=".el-tabs__content"/>
      </div>
    </div>

    <div class="cont">
      <div class="bx">
        <h2><em>Badge</em></h2>
        <BaseBadge :badgeList="badgeList" />
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref,onBeforeUnmount, onMounted, } from 'vue'
import MenuSubBanner from '@/views/MenuSubBanner.vue'
import BaseTab from '@/components/common/BaseTab.vue'
import BaseTabPanel from '@/components/common/BaseTabPanel.vue'
import BaseTable from '@/components/common/BaseTable.vue'
import BaseTopButton from '@/components/common/BaseTopButton.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'

// Tab
const activeTab = ref(null)

// Table
  const rows = ref([
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true, date: '2026.02.24', views: 623 },
    { title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865 },
    
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

  // Badge
  const badgeList = [
    {badge: "지하철 9호선", text: '가양역 8번 출구', color: 'nine'},
    {badge: "일반버스", text: '605, 654, 661, N26', color: 'normal'},
    {badge: "좌석버스", text: '60, 60-3, 88', color: 'seat'},
    {badge: "직행", text: '8000', color: 'direct'},
    {badge: "공항", text: '6003', color: 'airport'},
]

</script>

<style lang="scss">
@use '@scss/components/_tab.scss';
@use '@scss/components/_banner.scss';
@use "@scss/components/_table.scss";

section{.cont{border: none;}}
</style>