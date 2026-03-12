<template>
  <section class="tab-page tab-page--biz">
    <div class="tab-page-inner inner--biz">


      <div class="content biz">
        <h2 class="sub-title">사업영역</h2>
        <p class="sub-title--sub">금융 기업의 IT시스템 구축부터 운영, 유지보수까지 종합적인 솔루션을 제공하여 최적화된 업무 환경을 지원합니다.</p>

        <div class="biz-content">
          <div class="biz-content--img">
            <div class="img-item" v-for="(item, index) in bizList" :key="index">
              <div class="img-item--img"><img :src="$getImg(item.img)" alt=""></div>
              <p class="img-item--title">{{ item.title }}</p>
            </div>
          </div>

          <div class="biz-content--scroll">


            <div class="scroll-item">
              <div class="scroll-item--img"><img src="@/assets/images/sub_biz_01.png" alt=""></div>
              <div class="scroll-item-text">
                <h3></h3>
                <p></p>
              </div>
            </div>


          </div>

        </div>
      </div>





    </div>
  </section>
</template>

<script setup>
const bizList = [
  {img: 'ico_biz_01.png', title: 'IT시스템 구축(SI)'},
  {img: 'ico_biz_02.png', title: 'IT시스템 위탁운영'},
  {img: 'ico_biz_03.png', title: '새마을금고 전산장비 유지보수'},
  {img: 'ico_biz_04.png', title: '업무프로그램 개발·유지보수'},
  {img: 'ico_biz_05.png', title: '인프라 통합유지보수'},
]

</script>

  
<style scoped>
@import '@scss/pages/subPage/SubViewCommon.scss';
@import '@scss/pages/subPage/SubViewBiz.scss';
</style>