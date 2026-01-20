<template>
  <header id="header" class="header">
    <h1 class="logo">
      <a href="/">LOGO</a>
    </h1>

    <button
      type="button"
      class="btn-menu"
      aria-controls="gnb"
      :aria-expanded="isOpen.toString()"
      @click="toggle"
    >
      메뉴
    </button>

    <nav id="gnb" class="gnb" :hidden="!isOpen">
      <ul>
        <li><a href="#">Menu 1</a></li>
        <li><a href="#">Menu 2</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const onKeydown = (e) => {
  if (e.key === "Escape" && isOpen.value) {
    isOpen.value = false;
  }
};

// 컴포넌트 살아 있을 때만 이벤트 등록
onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

// 페이진 전환 시 이벤트 누수 방지
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>
