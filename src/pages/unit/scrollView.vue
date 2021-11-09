<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">better-scroll - PC端场景</div>
                    <div class="wrapper" ref="betterScrollFinder">
                        <ul class="content">
                            <li v-for="item in 50" :key="item">
                                content message number {{ item }}.
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">mescroll - 移动端场景</div>
                    <mescroll-vue
                        ref="meScrollFinder"
                        :down="meDownOptions"
                        :up="meUpOptions"
                        @init="initMeScroll"
                    >
                        <ul class="content">
                            <li v-for="item in 50" :key="item">
                                content message number {{ item }}.
                            </li>
                        </ul>
                    </mescroll-vue>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import BetterScroll from "better-scroll";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
    name: "ScrollView",
    components: {
        MescrollVue,
    },
    data() {
        return {
            meDownOptions: {
                callback: this.downMeScroll,
            },
            meUpOptions: {
                // callback: this.upMeScroll,
            },
        };
    },
    mounted() {
        new BetterScroll(this.$refs.betterScrollFinder, {});
    },
    methods: {
        initMeScroll(mescroll) {
            console.log(mescroll);
        },
        downMeScroll() {},
        upMeScroll() {},
    },
};
</script>

<style>
.wrapper {
    width: 200px;
    height: 300px;
    overflow: hidden;
    background-color: #f5f6fa;
}
.mescroll {
    width: 200px;
    height: 300px;
    background-color: #f5f6fa;
}
</style>