<template>
  <footer id="footer" class="footer">

    <div class="footer-inner">

      <div class="footer-inner__top">
        <div class="inner-top__logo">
          <img src="@/assets/images/logo_footer.png" alt="logo">
        </div>

        <div class="inner-top__info">
            <div class="top-info__list">
                <a href="">개인정보처리방침</a>
                <a href="">이용약관</a>
                <a href="">이메일주소</a>
            </div>
            <div class="innter-top__select"></div>
        </div>

        

        <div class="inner-top__select">
            <BaseSelectFooter
            v-model="regionVal2"
            :options="regionOptions2"
            />
        </div>
      </div>

      <div class="footer-inner__bottom">
        <!-- v-for -->
        <div class="inner-bottom__info">
            <em>Office</em>
            <p>
              <span>(09648) 서울특별시 강서구 공항대로 390 새마을금고IT센터 7층</span>
            </p>
        </div>
        <!-- //v-for -->
      </div>


    </div>
    
   

  </footer>
</template>

<script setup>
import { ref } from 'vue'

const regionVal2 = ref('FamilySite')
const regionOptions2 = [
  { value: 'FamilySite', label: 'Family Site' },
  { value: 'https://www.kfcc.co.kr/', label: 'MG새마을금고' },
  { value: 'https://www.mginfo.co.kr/', label: 'MG신용정보' },
  { value: 'http://www.mgts.co.kr/Default.asp', label: 'MG토탈서비스' },
  { value: 'https://www.kccwf.or.kr/home/comm/comm0001m01/mainPage.html', label: 'MG복지회' },
  { value: 'https://www.mgcap.co.kr/jsp/main/main.jsp', label: 'MG캐피탈' },
  { value: 'http://www.mgtvlive.com/', label: 'MG TV' },
]
  </script>
  
<style lang="scss" scoped>
@use "@scss/layout/_footer.scss";
</style>