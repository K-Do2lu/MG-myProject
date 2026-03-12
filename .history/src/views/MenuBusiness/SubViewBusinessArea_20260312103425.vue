<template>
  <section class="tab-page tab-page--biz">
    <div class="tab-page-inner inner--biz">


      <div class="content biz">
        <h2 class="sub-title">사업영역</h2>
        <p class="sub-title--sub">금융 기업의 IT시스템 구축부터 운영, 유지보수까지 종합적인 솔루션을 제공하여 최적화된 업무 환경을 지원합니다.</p>

        <div class="biz-content">



          <div class="biz-content--img">

            
            <div class="img-item" v-for="(item, index) in imgList" :key="index">
              <p class="img-item--title">{{ item.title }}</p>
            </div>


          </div>


        </div>
      </div>





    </div>
  </section>
</template>

<script setup>
const imgList = [
{title: 'IT 시스템 구축 (SI)'},
{title: 'IT 시스템 d'},
{title: 'IT 시스템 유지보수'},
{title: 'IT 시스템 통합 구축'},
]
</script>

  
<style scoped>
@import '@scss/pages/subPage/SubViewCommon.scss';
</style>