<template>
  <footer id="footer" class="footer">
    <div class="footer-inner">
      <div class="footer-inner__top">
        <div class="inner-top__logo">
          <img src="@/assets/images/logo_footer.png" alt="MG데이터시스템 로고">
        </div>

        <div class="inner-top__info">
          <div class="info-list" role="list">
            <router-link
              v-for="value in footerSubList"
              :key="value.path"
              :to="value.path"
              role="listitem"
            >
              {{ value.name }}
            </router-link>
          </div>

          <div class="info-select">
            <BaseSelectFooter
              v-model="regionVal2"
              label="Family Site"
              :hide-label="true"
              :placeholder="regionOptions2[0]?.label"
              :options="regionOptions2"
            />
          </div>
        </div>
      </div>

      <div class="footer-inner__bottom">
        <address
          v-for="item in infoList"
          :key="item.value"
          class="inner-bottom__info"
        >
          <em>{{ item.value }}</em>
          <p>
            <template v-for="(line, i) in item.info" :key="i">
              <span>{{ line }}</span>
            </template>
          </p>
        </address>

        <p class="inner-bottom__copyright">
          Copyright ⓒ MG데이터시스템. All rights reserved.
          Designed &amp; Programmed by WHOIS
        </p>
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

const footerSubList = [
  { name: '개인정보처리방침', path: '/footer/privacy' },
  { name: '이용약관', path: '/footer/terms' },
  { name: '이메일주소', path: '/footer/email' },
]

const infoList = [
  { value: 'Office', info: ['(07648) 서울특별시 강서구 공항대로 390 새마을금고IT센터 7층'] },
  { value: '사업자등록번호', info: ['366-87-01915'] },
  {
    value: 'Contact',
    info: [
      'Tel. (관리)02-2699-2993 / 운영 및 개발 사업 02-2699-2995~6',
      'Fax. 02-2699-0056',
      'Email. mgds@mgdatasystem.co.kr',
    ],
  },
]
</script>

<style scoped>
@import "@scss/layout/_footer.scss";
</style>