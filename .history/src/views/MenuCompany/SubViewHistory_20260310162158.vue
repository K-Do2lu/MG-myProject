<template>
  <div class="tab-page tab-page--history">
    <div class="tab-page-inner inner--history">
      <div class="content history">
        <h2 class="sub-title">연혁</h2>

        <div class="history-content">
          <div class="history-content--fix">
            <div class="history-content--fix--img">
              <img src="@/assets/images/sub_img_13.png" alt="">
            </div>
            <div class="history-content--fix--title">
              <h3 lang="en"><em>GROWTH</em> HIGHLIGHTS</h3>
              나은 미래, 더 나은 가치를 위해 성장을 거듭하는 MGDS가 되겠습니다.
            </div>
          </div>

          <div class="history-content--scroll">
            <div v-for="(item, idx) in historyList" :key="idx" class="history-content--scroll--item">
              <p class="item-year">{{ item.year }}</p>
              <div class="item-content">


                <div v-for="(item, idx) in item.events" :key="idx" class="item-content--info" :class="{accent : item.accent === true}">
                  <span class="info--date">{{ item.date }}</span>
                  <span class="info--text">{{ item.text }}</span>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
</template>

<script setup>
const historyList = [
  {
    year: '2024',
    events: [
      {date: '2024.08.', text: '새마을금고 정보시스템 인프라 증설 사업 수주', accent: true},
      {date: '2024.07.', text: '새마을금고 정보보호 강화 구푹 사업 수주', accent: true},
      {date: '2024.02.', text: '새마을금고 공제디지털전담반 IT도급 사업 수주', accent: false},
    ]
  },
  {
    year: '2023',
    events: [
      {date: '2023.11', text: '새마을금고 보안시스템 유지보수 사업 수행', accent: false},
      {date: '2023.07', text: '새마을금고복지회 통합유지보수 용역 수주', accent: false},
      {date: '2023.05', text: '새마을금고 정보시스템 단위업무 운영 용역 수주', accent: true},
      {date: '2023.04', text: '정보통신공사업 등록', accent: false},
    ]
  },
  {
    year: '2022',
    events: [
      {date: '2022.12.', text: '새마을금고 보안시스템 유지보수 사업 수행', accent: false},
      {date: '2023.07', text: '새마을금고복지회 통합유지보수 용역 수주', accent: false},
      {date: '2023.05', text: '새마을금고 정보시스템 단위업무 운영 용역 수주', accent: true},
      {date: '2023.04', text: '정보통신공사업 등록', accent: false},
    ]
  }
]

</script>

<style scoped lang="scss">
@import '@scss/pages/subPage/SubViewCommon.scss';
@import '@scss/pages/subPage/SubViewCompany.scss';
</style>