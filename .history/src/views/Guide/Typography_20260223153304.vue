<template>
    <h1>Typography</h1>
    <section>
        <div class="cont" v-for="(group, idx) in typoGroup" :key="idx">
            <div class="bx" v-for="item in group.items" :key="item.title">
                    <h2><em></em> Main</h2>
                    <div>Pretendard</div>
            </div>
        </div>
        <div class="cont">
            <div class="bx">
                <h2><em>Header</em> Fix</h2>
                <div>18px</div>
            </div>
            <div class="bx">
                <h2><em>Footer</em> PC (MO)</h2>
                <div>16px (14px) / 15px (13.5px)</div>
            </div>
        </div>
        <div class="cont">
            <div class="bx">
                <h2><em>subTitle, Info</em> PC (MO)</h2>
                <div>18px (16px)</div>
            </div>
            <div class="bx">
                <h2><em>subTitle2, Info2<</em> PC (MO)</h2>
                <div>20px[Fix], 22px[Fix], 16px (14px)</div>
            </div>
        </div>
        <div class="cont">
            <div class="bx">
                <h2><em>text + btn</em> PC (MO)</h2>
                <div>18px (14px)</div>
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
                {title:'', label: '', size: ''}
            ]
        }

        

    ]

</script>

<style lang="scss" scoped></style>