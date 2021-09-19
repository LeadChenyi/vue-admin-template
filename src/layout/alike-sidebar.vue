<template>
    <div class="alike-sidebar">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <div class="alike-sidebar-board">
                <img
                    class="alike-sidebar-board__image"
                    src="@/assets/image/common/webyi_brand.png"
                    alt="logo"
                />
            </div>
            <el-menu
                :default-active="activeMenu"
                :router="true"
                :unique-opened="true"
                :collapse-transition="false"
                :collapse="activeCollapse"
                mode="vertical"
                text-color="#bfcbd9"
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
    },
    mounted() {
        // console.log(this.$router.options.routes);
    },
};
</script>

<style>
.alike-sidebar {
    transition: width 0.28s;
    width: 210px;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
}
.alike-sidebar .el-scrollbar {
    height: 100%;
}
.alike-sidebar .el-scrollbar__wrap {
    overflow-x: hidden;
}
.alike-sidebar .el-menu {
    border-right: none !important;
}
.alike-sidebar-board {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
}
.alike-sidebar-board__image {
    width: 180px;
    height: 50px;
    margin-left: 12px;
}
</style>