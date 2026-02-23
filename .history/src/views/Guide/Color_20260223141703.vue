<template>
    <h1>color</h1>
    <section>



        <div class="cont">
            <div class="bx">
                <h2><em>Primary</em> Highlight</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#0B386A</span></div>
            </div>
            <div class="bx">
                <h2><em>Secondary</em> Footer</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#1B1B1B</span></div>
            </div>
            <div class="bx">
                <h2><em>Highlight</em> hover</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#0B386A</span></div>
            </div>
        </div>







        <div class="cont">
            <div class="bx">
                <h2><em>Text</em> Primary/Secondary</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#333333</span></div>
            </div>
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped>
  section{
    .bx{
        &:nth-child(1) .color-bg{background: #0B386A;}
        &:nth-child(2) .color-bg{background: #1B1B1B;}
        &:nth-child(3) .color-bg{background: #0B386A;}
        &:nth-child(3) .color-bg{background: #0B386A;}
    }
    .bx-color{
        display: flex;
        align-items: center;
        gap: 12px;
        .color-bg {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: transparent;
        }
    }
  }


</style>