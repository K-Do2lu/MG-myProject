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
                                <th>제목</th>
                                <th>등록일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>제목제목제목</td>
                                <td>0000.00.00</td>
                                <td>000</td>
                            </tr>

                            <!-- empty row -->
                             <tr>
                                <td colspan="3">등록된 공지사항이 없습니다.</td>
                             </tr>
                        </tbody>
                    </table>

                </div>


            </div>
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@scss/components/_form.scss";
    @import "@"
</style>