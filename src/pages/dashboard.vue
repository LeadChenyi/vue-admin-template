<template>
    <div class="dashboard-page">
        <div>dashboard</div>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {};
    },
    mounted() {
        this.$api.index
            .getProjects()
            .then((res) => {
                console.log("getProject", res);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
</script>

<style>
</style>