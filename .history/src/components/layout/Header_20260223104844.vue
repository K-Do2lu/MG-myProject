<template>
  <header id="header" class="header">
    <div class="header-cont">

      <h1 class="logo">
        <a href="https://www.mgdatasystem.co.kr/">
          <img src="@/assets/images/logo_mgds.png" alt="MG데이터시스템">
        </a>
      </h1>

      <!-- 햄버거 버튼 -->
      <button
        class="btn-menu"
        @click="toggleMenu"
        :class="{ 'is-open': isMobileMenu }"
        :aria-expanded="isMobileMenu"
        aria-label="메뉴 열기">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- 네비 -->
      <nav
        class="gnb"
        :class="{ 'is-mobile-open': isMobileMenu }">

        <ul>
          <li v-for="(menu, idx) in menuData" :key="idx">

            <router-link
              :to="menu.link"
              class="depth1">
              {{ menu.title }}
            </router-link>

            <ul class="sub-menu">
              <li v-for="(sub, sIdx) in menu.subs" :key="sIdx">
                <router-link :to="sub.link">
                  {{ sub.name }}
                </router-link>
              </li>
            </ul>

          </li>

          <li class="logo-dshop">
            <a href="https://mgdshop.co.kr/main/index.do" target="_blank">
              <img src="@/assets/images/logo_dshop.png" alt="MGDshop">
            </a>
          </li>

        </ul>
      </nav>

      <!-- 모바일 배경 -->
      <div
        class="overlay"
        v-if="isMobileMenu"
        @click="toggleMenu">
      </div>

    </div>
  </header>
</template>


<script setup>
import { ref } from "vue";

const isHover = ref(false);

// 유지보수용 데이터: 메뉴가 추가되어도 이 객체만 수정하면 됨
const menuData = [
  { title: "COMPANY", link: "/sub1", subs: [
    { name: "회사개요", link: "/sub1/sub1_1" },
    { name: "CEO인사말", link: "/sub1/sub1_2" },
    { name: "연혁", link: "/sub1/sub1_3" },
    { name: "오시는 길", link: "/sub1/sub1_4" },
    { name: "협력사 소개", link: "/sub1/sub1_5" }
  ]},
  { title: "BUSINESS", link: "/sub2", subs: [{ name: "사업영역", link: "/sub2_1" }] },
  { title: "NOTICE", link: "/sub3", subs: [
    { name: "공지사항", link: "/sub3_1" },
    { name: "입찰공고", link: "/sub3_2" },
    { name: "일정관리", link: "/sub3_3" }
  ]},
  { title: "RECRUIT", link: "/sub4", subs: [
    { name: "채용공고", link: "/sub4_1" },
    { name: "인재상", link: "/sub4_2" },
    { name: "자료실", link: "/sub4_3" }
  ]}
];

// 햄버거
const isMobileMenu = ref(false);

const toggleMenu = () => {
  isMobileMenu.value = !isMobileMenu.value;

  // 모바일 메뉴 열릴 때 스크롤 방지
  document.body.style.overflow = isMobileMenu.value ? "hidden" : "";
}
</script>

<style scoped></style>