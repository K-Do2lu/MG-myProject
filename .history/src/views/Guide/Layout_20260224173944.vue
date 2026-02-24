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
                            <tr v-for="row in rows" :key="id">
                                <td scope="row">{{row.id}}</td>
                                <td scope="row" class="num">{{row.date}}</td>
                                <td scope="row" class="num">0{{row.views}}</td>
                            </tr>
                            <!-- <tr>
                                <td scope="row">제목제목제목</td>
                                <td scope="row" class="num">0000.00.00</td>
                                <td scope="row" class="num">000</td>
                            </tr> -->

                            <!-- empty row -->
                             <tr class="empty" >
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
    const rows = [
        {id: 10, title: '정규직(일반직) 및 계약직 상시채용', date: '2026-02-24', views: 623},
        {id: 9, title: '정규직(일반직) 및 계약직 상시채용', date: '2026-02-23', views: 625},
    ]
</script>

<style lang="scss" scoped>
@import "@scss/components/_table.scss";
section .cont{border: none;}
</style>