<template>
    <div class="index-sidebar">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :router="true"
                :unique-opened="false"
                :collapse-transition="false"
                :collapse="activeCollapse"
                mode="vertical"
                text-color="#bfcbd9"
                active-text-color="#409EFF"
                background-color="#304156"
            >
                <index-menu-item
                    v-for="item in routes"
                    :key="item.path"
                    :menu="item"
                ></index-menu-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import IndexMenuItem from "./index-menu-item";
export default {
    name: "IndexSidebar",
    components: {
        IndexMenuItem,
    },
    data() {
        return {};
    },
    computed: {
        routes() {
            return this.$store.getters["app/getRouters"];
        },
        activeMenu() {
            return this.$route.path;
        },
        activeCollapse() {
            return this.$store.getters["app/getCollapse"];
        },
    },
    mounted() {
        // console.log(this.$router.options.routes);
    },
};
</script>

<style>
</style>