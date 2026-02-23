<template>
    <h1>color</h1>
    <section>
        <!-- Primary -->
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
        <!-- // Primary -->
        <!-- Text -->
        <div class="cont">
            <div class="bx">
                <h2><em>Text</em> Primary/Secondary</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#333333</span></div>
            </div>
            <div class="bx">
                <h2><em>Text</em> Highlight</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#0B386A</span></div>
            </div>
            <div class="bx">
                <h2><em>Text</em> Highlight-hover</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#0B386A</span></div>
            </div>
        </div>
        <!-- // Text -->
         <!-- background -->
        <div class="cont">
            <div class="bx">
                <h2><em>Background</em> base</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#ffffff</span></div>
            </div>
            <div class="bx">
                <h2><em>Background</em> Secondary</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#fbfbfb</span></div>
            </div>
        </div>
        <!-- // background -->
         <!-- Gray -->
         <div class="cont">
            <div class="bx">
                <h2><em>Gray</em> border-business, Partner</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#eeeeee</span></div>
            </div>
            <div class="bx">
                <h2><em>Gray</em> border-history</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#e5e5e5</span></div>
            </div>
            <div class="bx">
                <h2><em>Gray</em> border-CI</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#f0f0f0</span></div>
            </div>
            <div class="bx">
                <h2><em>Gray</em> border-map</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#dddddd</span></div>
            </div>
        </div>
          <!-- // Gray -->

          <div class="cont" v-for="(item, idx) in colorCont" :key="idx">
            <div class="bx">
                <h2><em>Gray</em> border-business, Partner</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#eeeeee</span></div>
            </div>
            <div class="bx">
                <h2><em>Gray</em> border-history</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#e5e5e5</span></div>
            </div>
            <div class="bx">
                <h2><em>Gray</em> border-CI</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#f0f0f0</span></div>
            </div>
            <div class="bx">
                <h2><em>Gray</em> border-map</h2>
                <div class="bx-color"><span class="color-bg"></span><span class="color-txt">#dddddd</span></div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref } from 'vue';

    const colorCont = [

        {}

    ]


</script>

<style lang="scss" scoped>
  section{
    .cont{.color-bg{box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);}}
    .cont:nth-child(1){
        .bx{
            &:nth-child(1) .color-bg{background: #0B386A;}
            &:nth-child(2) .color-bg{background: #1B1B1B;}
            &:nth-child(3) .color-bg{background: #0B386A;}
        }
    }
    .cont:nth-child(2){
        .bx{
            &:nth-child(1) .color-bg{background: #333333;}
            &:nth-child(2) .color-bg{background: #0B386A;}
            &:nth-child(3) .color-bg{background: #0B386A;}
        }
    }
    .cont:nth-child(3){
        .bx{
            &:nth-child(1) .color-bg{background: #ffffff; }
            &:nth-child(2) .color-bg{background: #fbfbf1;}
        }
    }
    .cont:nth-child(4){
        .bx{
            &:nth-child(1) .color-bg{background: #eeeeee;}
            &:nth-child(2) .color-bg{background: #e5e5e5;}
            &:nth-child(3) .color-bg{background: #f0f0f0;}
            &:nth-child(4) .color-bg{background: #dddddd;}
        }
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