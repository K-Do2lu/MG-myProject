<template>
    <h1>Layout</h1>
    <section>
        <div class="cont">
            <div class="bx">
                <h2><em>Table</em> basic</h2>


                <div class="notice-table">
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
                                <td class="title" scope="row">
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
                                <td scope="row" class="num"><time :datetime="row.date">{{ row.date }}</time></td> 
                                <td scope="row" class="num">{{ row.views }}</td>
                            </tr>
                            <!-- empty row -->
                             <tr class="empty" v-if="empty">
                                <td colspan="3">데이터가 없습니다.</td>
                             </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';

    const rows = [
        {id: 10, title: '정규직(일반직) 및 계약직 상시채용', isImportant: true, hasAttachment: true,  date: '2026.02.24', views: 623},
        {id: 9, title: '정규직(일반직) 및 계약직 상시채용', isImportant: false, hasAttachment: true, date: '2026.02.23', views: 865},
    ]
    const empty = rows.length === 0
    const hasData = computed(() => row.data)

</script>

<style lang="scss" scoped>
@use "@scss/components/_table.scss";
section .cont{border: none;}
</style>