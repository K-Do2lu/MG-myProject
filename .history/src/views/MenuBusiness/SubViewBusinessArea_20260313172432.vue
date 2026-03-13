<template>
  <section class="tab-page tab-page--biz">
    <div class="tab-page-inner inner--biz">


      <div class="content biz">
        <h2 class="sub-title">사업영역</h2>
        <p class="sub-title--sub">금융 기업의 IT시스템 구축부터 운영, 유지보수까지 종합적인 솔루션을 제공하여 최적화된 업무 환경을 지원합니다.</p>

        <div class="biz-content">
          <div class="biz-content--img">
            <div class="img-item" v-for="(item, index) in bizTitleList" :key="index" @click="scrollToScroll(index)">
              <div class="img-item--img"><img :src="$getImg(item.img)" alt=""></div>
              <p class="img-item--title">{{ item.title }}</p>
            </div>
          </div>

          <div class="biz-content--scroll">


            <!-- 01 -->
            <div class="scroll-item" v-for="(item, index) in bizScrollList" :key="index">
              <div class="scroll-item--img"><img :src="" alt=""></div>
              <div class="scroll-item--text">
                <h3 class="scroll-item--text--title">IT시스템 구축(SI)</h3>
                <p class="scroll-item--text--desc">IT시스템 인프라(H/W, S/W, N/W) 납품, 업무시스템 분석·설계 및 개발, 데이터 설계 및 이관사업까지 고객이 필요한 환경에 맞추어 IT시스템을 구축하여 드립니다.</p>
              </div>
            </div>


          </div>

        </div>
      </div>





    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const bizTitleList = [
  {img: 'ico_biz_01.png', title: 'IT시스템 구축(SI)'},
  {img: 'ico_biz_02.png', title: 'IT시스템 위탁운영'},
  {img: 'ico_biz_03.png', title: '새마을금고 전산장비 유지보수'},
  {img: 'ico_biz_04.png', title: '업무프로그램 개발·유지보수'},
  {img: 'ico_biz_05.png', title: '인프라 통합유지보수'},
]

const bizScrollList = [
  {img: 'sub_biz_01.png', title: 'IT시스템 구축(SI)', desc: 'IT시스템 인프라(H/W, S/W, N/W) 납품, 업무시스템 분석·설계 및 개발, 데이터 설계 및 이관사업까지 고객이 필요한 환경에 맞추어 IT시스템을 구축하여 드립니다.'},
  {img: 'sub_biz_02.png', title: 'IT시스템 위탁운영', desc: 'IT 인프라 운영부터 전문가 상주지원까지 고객이 안심하고 핵심 업무에 집중할 수 있도록, IT시스템 일상적 운영에 대한 통합 아웃소싱을 제공합니다.'},
  {img: 'sub_biz_03.png', title: '새마을금고 전산장비 유지보수', desc: '새마을금고 본·지점에서 사용하고 있는 IT장비의 납품부터 유지보수까지 새마을금고 창구에서 필요로 하는 모든 종류의 IT서비스를 제공합니다.'},
  {img: 'sub_biz_04.png', title: '업무프로그램 개발·유지보수', desc: '고객의 요구에 맞추어진 최적의 업무프로그램 이용환경을 제공하기 위하여, 업무프로 개발 및 유지보수를 함께 제공하고 있습니다.'},
  {img: 'sub_biz_05.png', title: '인프라 통합유지보수', desc: 'IT시스템 인프라(H/W, S/W, N/W) 납품, 업무시스템 분석·설계 및 개발, 데이터 설계 및 이관사업까지 고객이 필요한 환경에 맞추어 IT시스템을 구축하여 드립니다.'},
]

const scrollToScroll = (index) => {

}
</script>

  
<style scoped>
@import '@scss/pages/subPage/SubViewCommon.scss';
@import '@scss/pages/subPage/SubViewBiz.scss';
</style>