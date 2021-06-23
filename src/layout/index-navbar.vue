<template>
    <div class="index-navbar">
        <!-- 左侧菜单折叠 -->
        <div class="index-navbar-collapse">
            <i class="el-icon-s-unfold" />
        </div>

        <!-- 面包屑 -->
        <el-breadcrumb class="index-navbar-breadcrumb" separator="/">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item
                    v-for="item in getBreadcrumbs"
                    :key="item.path"
                >
                    {{ item.meta.title }}
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>

        <!-- 下拉菜单 -->
        <el-dropdown
            class="index-navbar-dropdown"
            trigger="click"
            @command="onCommandSetting"
        >
            <div class="user-wrap">
                <img
                    class="user-avatar"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="notice">设置</el-dropdown-item>
                <el-dropdown-item command="center">通知</el-dropdown-item>
                <el-dropdown-item command="center">中心</el-dropdown-item>
                <el-dropdown-item divided command="logout"
                    >退出</el-dropdown-item
                >
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: "IndexNavbar",
    data() {
        return {
            breadcrumbs: [
                {
                    title: "个人中心",
                },
                {
                    title: "我的收藏",
                },
            ],
        };
    },
    computed: {
        getBreadcrumbs() {
            return this.$route.matched;
        },
    },
    methods: {
        onCommandSetting(e) {
            console.log("onCommand", e);
        },
    },
};
</script>

<style>
</style>