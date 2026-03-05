<template>
  <div class="tab-page tab-page--overview">
    <div class="tab-page-inner inner--overview">
      <div class="content intro">
        <div class="intro-title">
              <h3>MG DATA SYSTEM</h3>
              <p>더 나은 고객 디지털 금융IT의 발전으로<br>
                새마을금고와 함께 성장하는 미래를 만들어갈 것입니다.</p>
            </div>
      </div>
      <div class="content overview">
        <h2 class="sub-title">기업개요</h2>
        <div class="overview-content">
          <div class="overview-content--img"><img src="@/assets/images/sub_img_02.png" alt="MG 데이터시스템 로고"></div>
          <div class="overview-content--text" role="region" aria-label="기업개요">
            <dl class="overview-list" role="region" aria-label="기업개요">
              <div class="list-item"><dt>회사명</dt><dd>MG데이터시스템</dd></div>
              <div class="list-item"><dt>대표이사</dt><dd>박도형</dd></div>
              <div class="list-item"><dt>설립연도</dt><dd>2022.09</dd></div>
              <div class="list-item"><dt>직원수</dt><dd>42명(2024.06 기준)</dd></div>
            </dl>
          </div>
        </div>
      </div>
      <div class="content network">
        <h2 class="sub-title">조직도</h2>
        <div class="network-content">
          <div class="network-content--img"><img src="@/assets/images/sub_img_03.png" alt="조직도"></div>
        </div>
      </div>
      <div class="content ci">
        <h2 class="sub-title">회사CI</h2>
        <div class="ci-content">
          <p class="ci-content--text">
            <span>나-이웃-지역-사회가 함께 성장, 발전해가는 따뜻한 철학, 사람중심의 따뜻하고 풍요로운 이미지<br>
              내 가족의 일처럼 마음을 다하는 서비스, 믿을 수 있는 금융 서비스 체계적이고 앞서가는 새마을금고</span>
          </p>
          <div class="ci-content--cardList">

            <div class="cardList-card" v-for="(item, index) in cardList" :key="index">
              <p class="cardList-card--title">MG데이터시스템<strong>{{item.text}}</strong></p>
              <div class="cardList-card--img"><img :src="item.img" :alt="item.alt"></div>
            </div>



          </div>
        </div>
      </div>
  
   </div>
  </div>
</template>

<script setup>
const cardList = [
  {
    text: '국문 가로형',
    img: 'sub_img_04.png',
    alt: 'MG데이터시스템 국문 가로형 로고'
  },
  {
    text: '영문 세로형',
    img: '@/assets/images/sub_img_05.png',
    alt: 'MG데이터시스템 영문 세로형 로고'
  },
  {
    text: '국문 세로형',
    img: '@/assets/images/sub_img_06.png',
    alt: 'MG데이터시스템 국문 세로형 로고'
  },
  {
    text: '영문 세로형',
    img: '@/assets/images/sub_img_07.png',
    alt: 'MG데이터시스템 영문 세로형 로고'
  },
  {
    text: '응용 가로형1',
    img: '@/assets/images/sub_img_08.png',
    alt: 'MG데이터시스템 응용 가로형1 로고'
  },
  {
    text: '응용 가로형2',
    img: '@/assets/images/sub_img_09.png',
    alt: 'MG데이터시스템 응용 가로형2 로고'
  },
  {
    text: '응용 영문혼합형1',
    img: '@/assets/images/sub_img_10.png',
    alt: 'MG데이터시스템 응용 영문혼합형1 로고'
  },
  {
    text: '응용 영문혼합형2',
    img: '@/assets/images/sub_img_11.png',
    alt: 'MG데이터시스템 응용 영문혼합형2 로고'
  },
  
]

</script>

<style scoped lang="scss">
@import '@scss/pages/subPage/SubViewCommon.scss';
@import '@scss/pages/subPage/SubViewCompany.scss';
</style>