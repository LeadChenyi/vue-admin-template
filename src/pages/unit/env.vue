<template>
    <div class="env-page">
        <div>mode：{{ mode }}</div>
        <div>baseUrl：{{ baseUrl }}</div>
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