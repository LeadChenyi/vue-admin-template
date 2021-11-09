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

        // test area
        // this.standAloneRequest();
    },
    methods: {
        standAloneRequest() {
            this.$axios
                .get("http://api.webyi.top/api")
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
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
