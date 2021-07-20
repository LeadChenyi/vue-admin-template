<template>
    <div class="index-navbar">
        <!-- 左侧菜单折叠 -->
        <div class="index-navbar-collapse" @click="handleCollapse">
            <i
                :class="[
                    activeCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold',
                ]"
            />
        </div>

        <!-- 全屏 -->
        <div class="index-navbar-collapse" @click="handleFullScreen">
            <i
                :class="[
                    isFullScreen ? 'el-icon-remove' : 'el-icon-circle-plus',
                ]"
            />
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
                    :src="getUserInfo && getUserInfo.avatar"
                />
                <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="setting">设置</el-dropdown-item>
                <el-dropdown-item command="notice">通知</el-dropdown-item>
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
            isFullScreen: false,
        };
    },
    computed: {
        getBreadcrumbs() {
            return this.$route.matched.filter((item) => {
                return !item.meta.inherit;
            });
        },
        activeCollapse() {
            return this.$store.getters["app/getCollapse"];
        },
        getUserInfo() {
            // getUserInfo返回值是一个对象，需要具体到某个属性时运用短路逻辑
            return this.$store.getters["app/getUserInfo"];
        },
    },
    methods: {
        onCommandSetting(value) {
            switch (value) {
                case "logout":
                    this.logout();
                    break;
                case "setting":
                    this.$emit("changeSetting");
                    break;
            }
        },
        handleCollapse() {
            this.$store.dispatch(
                "app/setCollapse",
                !this.$store.state.app.isCollapse
            );
        },
        handleFullScreen() {
            this.isFullScreen = !this.isFullScreen;
            this.$emit("changeFullScreen", this.isFullScreen);
        },
        logout() {
            this.$request({
                url: "/logout",
                method: "POST",
            })
                .then((res) => {
                    console.log(res);
                    if (res.code != 200) {
                        this.$message({
                            type: "error",
                            message: res.message,
                        });
                        return false;
                    }

                    this.$cookie.remove("token");
                    this.$store.dispatch("app/setUserInfo", null);
                    this.$store.dispatch("app/setRouters", null);
                    this.$router.push({
                        name: "Login",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style>
</style>