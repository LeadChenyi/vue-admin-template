<template>
    <div class="index-sidebar">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :router="true"
                :unique-opened="false"
                :collapse-transition="false"
                :collapse="isCollapse"
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
        return {
            isCollapse: false,
        };
    },
    computed: {
        routes() {
            const blacklists = ["Login", "Tset"];
            return this.$router.options.routes.filter((item) => {
                return item.name && !blacklists.includes(item.name);
            });
        },
        activeMenu() {
            return this.$route.path;
        },
    },
    mounted() {
        console.log(this.$router.options.routes);
    },
};
</script>

<style>
</style>