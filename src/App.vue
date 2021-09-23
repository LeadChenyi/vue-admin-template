<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import theme from "@/mixins/theme.js";
export default {
    name: "App",
    mixins: [theme],
    data() {
        return {
            resocures: ["https://map.qq.com/api/js"],
        };
    },
    created() {
        // 同步主题颜色
        this.syncThemeColor();

        // utils test area
        const scores1 = [100, [99, [88, [77, 66, 55]]]];
        const scores2 = [100, 99, 88, 77, 66, 55];
        const people = {
            name: "陈先生",
            age: 18,
            gender: "男",
        };
        const hello = "北京欢迎你";

        console.log(this.$utils.simple(scores1));
    },
};
</script>

<style lang="scss">
@import "./assets/style/app.css";
.pagination {
    margin-top: 20px;
}
.alike-container {
    padding: 20px;
}
</style>
