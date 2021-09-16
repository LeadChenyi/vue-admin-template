<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            resocures: ["https://map.qq.com/api/js"],
        };
    },
    created() {
        // this.$utils.createAsyncLoadScript(this.resocures);
        // console.log(this.$utils.zeroize("15", 100));
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
