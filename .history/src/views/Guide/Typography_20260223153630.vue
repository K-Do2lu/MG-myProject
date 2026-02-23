<template>
    <h1>Typography</h1>
    <section>
        <div class="cont" v-for="(group, idx) in typoGroup" :key="idx">
            <div class="bx" v-for="item in group.items" :key="item.title">
                    <h2><em>{{ item.title }}</em> {{item.label}}</h2>
                    <div>{{item.size}}</div>
            </div>
        </div>
        <div class="cont">
            <div class="bx">
                <h2><em>Title</em> PC (MO)</h2>
                <div>40px (25px)</div>
            </div>
            <div class="bx">
                <h2><em>subTitle</em> PC (MO)</h2>
                <div>36px (26px)</div>
            </div>
        </div>
    </section>
</template>

<script setup>

    const typoGroup = [
        {
            items: [
                {title:'font-family', label: 'main', size: 'Pretendard'}
            ]
        },
        {
            items: [
                {title:'Header', label: 'Fix', size: '18px'},
                {title:'Footer', label: 'PC (MO)', size: '16px (14px) / 15px (13.5px)'},
            ]
        },
        {
            items: [
                {title:'subTitle, Info', label: 'PC (MO)', size: '18px (16px)'},
                {title:'subTitle2, Info2', label: 'PC (MO)', size: '20px[Fix], 22px[Fix], 16px (14px)'},
            ]
        },
        {
            items: [
                {title:'text + btn', label: 'PC (MO)', size: '18px (16px)'},
                {title:'subTitle2, Info2', label: 'PC (MO)', size: '18px (14px)'},
            ]
        },
        {
            items: [
                {title:'Title', label: 'PC (MO)', size: '18px (16px)'},
                {title:'subTitle2, Info2', label: 'PC (MO)', size: '18px (14px)'},
            ]
        }

        

    ]

</script>

<style lang="scss" scoped></style>