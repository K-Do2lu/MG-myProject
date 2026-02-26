<template>
    <div class="notice-table">
                    <div v-if="search" class="notice-search">
                        <BaseSelect
                        v-model="regionVal"
                        :placeholder="regionOptions[0].label"
                        :options="regionOptions"
                    />
                        <BaseInput v-model="searchVal" placeholder="검색어를 입력해주세요.">
                        <template #suffix>
                        <img src="/src/assets/images/icons/ico_serch.png" alt="">
                        </template></BaseInput>
                    </div>
                    <div class="notice-count">총 <em>{{ rows.length }}</em>건</div>
                    <table>
                        <caption class="visually-hidden">공지사항 목록</caption>
                        <colgroup>
                            <col style="width: 70%;">
                            <col style="width: 15%;">
                            <col style="width: 15%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">제목</th>
                                <th scope="col">등록일</th>
                                <th scope="col">조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in rows" :key="row.id">
                                <td class="title" :colspan="isMobile ? 3 : 1" scope="row">
                                    <div class="notice-title">
                                        <a href="#" class="notice-title__text" @click.prevent>{{ row.title }}</a>
                                        <!-- 첨부파일 아이콘 -->
                                        <span v-if="row.hasAttachment" class="notice-title__icon">
                                            <img src="/src/assets/images/icons/ico_file.svg" alt="첨부파일 있음">
                                        </span>
                                        <!-- 뱃지 (중요 공지 등) -->
                                        <span v-if="row.isImportant" class="notice-title__badge"role="status" aria-label="중요 게시물">HOT</span>
                                    </div>
                                    <div class="notice-num">
                                        <span class="notice-num__date">
                                            <span class="label">등록일</span>
                                            <time :datetime="row.date">{{ row.date }}</time>
                                        </span>

                                        <span class="notice-num__views">
                                            <span class="label">조회수</span>
                                            {{ row.views }}
                                        </span>
                                    </div>
                                </td>
                                <td v-if="!isMobile" scope="row" class="num"><time :datetime="row.date">{{ row.date }}</time></td> 
                                <td v-if="!isMobile" scope="row" class="num">{{ row.views }}</td>
                            </tr>
                            <!-- empty row -->
                             <tr class="empty" v-if="empty">
                                <td colspan="3">데이터가 없습니다.</td>
                             </tr>
                        </tbody>
                    </table>

                    <!-- Paging -->
                    <nav class="notice-pagination" aria-label="공지사항 페이지" v-if="totalPages > 1">
                        <button type="button" @click="goPrev" :disabled="currentPage === 1">
                            이전
                        </button>

                        <button
                            v-for="page in totalPages"
                            :key="page"
                            type="button"
                            @click="goToPage(page)"
                            :class="{ 'is-active': page === currentPage }"
                            :aria-current="page === currentPage ? 'page' : undefined"
                        >
                            {{ page }}
                        </button>

                        <button type="button" @click="goNext" :disabled="currentPage === totalPages">
                            다음
                        </button>
                        </nav>
                </div>
</template>

<script setup></script>

<style scoped lang="scss">
@use "@scss/components/_table.scss";
</style>