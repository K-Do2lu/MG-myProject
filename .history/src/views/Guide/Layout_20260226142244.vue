<template>
    <h1>Layout</h1>

    <section>
        <div class="cont">
            <BaseTable
                :rows="rows"
                caption="공지사항 목록"
                empty-text="등록된 공지사항이 없습니다."
                :page-size="10"
                :colspan="isMobile ? 1 : 3"
                >
                <!-- colgroup -->
                <template #colgroup>
                    <col style="width: 70%">
                    <col style="width: 15%">
                    <col style="width: 15%">
                </template>

                <!-- 헤더 -->
                <template #header>
                    <th scope="col">제목</th>
                    <th scope="col">등록일</th>
                    <th scope="col">조회수</th>
                </template>

                <!-- 행 -->
                <template #row="{ row }">
                    <td class="title" :colspan="isMobile ? 3 : 1" scope="row">
                    <!-- 지금 Layout.vue에서 쓰는 notice-title / notice-num 그대로 -->
                    </td>
                    <td v-if="!isMobile" scope="row" class="num">
                    <time :datetime="row.date">{{ row.date }}</time>
                    </td>
                    <td v-if="!isMobile" scope="row" class="num">
                    {{ row.views }}
                    </td>
                </template>
                </BaseTable>
        </div>
    </section>
</template>

<script setup>

</script>