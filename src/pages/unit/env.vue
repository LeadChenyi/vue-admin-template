<template>
    <div class="alike-container">
        <el-card>
            <div slot="header">环境变量</div>
            <div>mode：{{ mode }}</div>
            <div>baseUrl：{{ baseUrl }}</div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Env",
    data() {
        return {
            mode: null,
            baseUrl: null,
        };
    },
    mounted() {
        this.mode = process.env.NODE_ENV;
        this.baseUrl = process.env.VUE_APP_BASE_URL;
    },
};
</script>

<style>
</style>