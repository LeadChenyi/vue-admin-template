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
                :active-text-color="getColorPrimary"
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
import Variables from "@/assets/style/variables.scss";
export default {
    name: "IndexSidebar",
    components: {
        IndexMenuItem,
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
        getColorPrimary() {
            // 改为数据状态管理
            return Variables.colorPrimary;
        },
    },
    mounted() {
        // console.log(this.$router.options.routes);
    },
};
</script>

<style>
</style>