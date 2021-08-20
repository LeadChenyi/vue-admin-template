<template>
    <div class="alike-sidebar">
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
                <alike-menu-item
                    v-for="item in routes"
                    :key="item.path"
                    :menu="item"
                ></alike-menu-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import AlikeMenuItem from "./alike-menu-item";
import Variables from "@/assets/style/variables.scss";
export default {
    name: "AlikeSidebar",
    components: {
        AlikeMenuItem,
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