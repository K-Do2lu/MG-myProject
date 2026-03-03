<template>
  <footer id="footer" class="footer">

    <div class="footer-inner">

      <div class="footer-inner__top">
        <div class="inner-top__logo">
          <img src="@/assets/images/logo_footer.png" alt="logo">
        </div>

        <div class="inner-top__info">
          <a href="">개인정보처리방침</a>
          <a href="">이용약관</a>
          <a href="">이메일주소</a>
        </div>

        <div class="inner-top__select">
            <BaseSelectFooter v-model="selectValue" :options="selectOptions" />
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
  </script>
  
<style lang="scss" scoped>
@use "@scss/layout/_footer.scss";
</style>