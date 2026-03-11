<template>
  <div class="tab-page tab-page--loc">
    <div class="tab-page-inner inner--loc">
      <div class="content loc">
        <h2 class="sub-title">오시는 길</h2>

        <div class="loc-content">
          <!-- Google Map -->
          <div class="loc-content--map">
            <img src="@/assets/images/sample_map.png" alt="">
          </div>

          <div class="loc-content--info">

            <div class="loc-content--info--img"><img src="@/assets/images/logo_mgds2.png" alt="MG데이터시스템 로고"></div>

            <dl class="loc-content--info--list">
              <div class="list-item"><dt>주소</dt><dd>서울특별시 강남구 도산대로 123</dd></div>
              <div class="list-item"><dt>전화</dt><dd>02-1234-5678</dd></div>
              <div class="list-item"><dt>이메일</dt><dd>info@example.com</dd></div>
            </dl>

          </div>


        </div>
      </div>
    </div>
   </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
@import '@scss/pages/subPage/SubViewCommon.scss';
@import '@scss/pages/subPage/SubViewCompany.scss';
</style>
