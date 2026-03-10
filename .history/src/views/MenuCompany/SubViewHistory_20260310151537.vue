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
              <p class="item-year">2024</p>
              <div class="item-content">


                <div class="item-content--info accent">
                  <span class="info--date">2024.08</span>
                  <span class="info--text">새마을금고 정보시스템 인프라 중설 사업 수주</span>
                </div>

                <div class="item-content--info">
                  <span class="info--date">2024.08</span>
                  <span class="item-info--text">새마을금고 정보시스템 인프라 중설 사업 수주</span>
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
    year
  }
]

</script>

<style scoped lang="scss">
@import '@scss/pages/subPage/SubViewCommon.scss';
@import '@scss/pages/subPage/SubViewCompany.scss';
</style>