<template>
    <div class="alike-navbar">
        <!-- 左侧菜单折叠 -->
        <div class="alike-navbar-iconitem" @click="handleCollapse">
            <i
                :class="[
                    activeCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold',
                ]"
            />
        </div>

        <!-- 面包屑 -->
        <el-breadcrumb class="alike-navbar-breadcrumb" separator="/">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item
                    v-for="item in getBreadcrumbs"
                    :key="item.path"
                >
                    {{ item.meta.title }}
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>

        <!-- 全屏 -->
        <div class="alike-navbar-iconitem" @click="handleFullScreen">
            <i
                :class="[
                    fullScreenEnabled ? 'el-icon-aim' : 'el-icon-full-screen',
                ]"
            />
        </div>

        <!-- 下拉菜单 -->
        <el-dropdown
            class="alike-navbar-dropdown"
            trigger="click"
            @command="onCommandSetting"
        >
            <div class="alike-navbar-user-wrap">
                <img
                    class="alike-navbar-user-avatar"
                    :src="getUserInfo && getUserInfo.avatar"
                />
                <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="center">中心</el-dropdown-item>
                <el-dropdown-item command="notice">通知</el-dropdown-item>
                <el-dropdown-item command="setting">设置</el-dropdown-item>
                <el-dropdown-item divided command="logout"
                    >退出</el-dropdown-item
                >
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: "AlikeNavbar",
    props: {
        fullScreenEnabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        getBreadcrumbs() {
            return this.$route.matched.filter((item) => {
                return !item.meta.flat;
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
                    this.$emit("clickSetting");
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
            this.$emit("changeFullScreen", !this.fullScreenEnabled);
        },
        logout() {
            this.$request({
                url: "/user/logout",
                method: "POST",
            })
                .then((res) => {
                    console.log(res);
                    if (res.statusCode != 200) {
                        this.$message({
                            type: "error",
                            message: res.message,
                        });
                        return false;
                    }
                    this.$message({
                        type: "success",
                        message: res.message,
                    });
                    this.$cookie.remove("webyi_jwt_token");
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
.alike-navbar {
    height: 60px;
    position: relative;
    overflow: hidden;
    background-color: #ffffff;
    /* box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08); */
    border-bottom: 1px solid #f6f6f6;
    display: flex;
    align-items: center;
    box-sizing: border-box;
}
.alike-navbar-iconitem {
    height: 100%;
    line-height: 60px;
    padding: 0px 15px;
    display: inline-block;
    cursor: pointer;
    font-size: 20px;
}
.alike-navbar-breadcrumb {
    flex: 1;
    font-size: 16px !important;
}
.alike-navbar-breadcrumb .el-breadcrumb__item .el-breadcrumb__inner {
    color: #999999;
}
.alike-navbar-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #666666;
}
.alike-navbar-dropdown {
    margin-right: 15px;
}
.alike-navbar-user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
}
</style>