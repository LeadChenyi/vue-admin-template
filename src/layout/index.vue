<template>
    <div
        class="index-layout"
        :class="{
            'index-layout--mobile': isMobile,
            'index-layout--collapse': isCollapse,
        }"
    >
        <template v-if="isMobile">
            <div
                class="index-mask"
                :hidden="isCollapse"
                @click="closeCollapse"
            ></div>
        </template>

        <index-sidebar></index-sidebar>
        <div class="index-container">
            <index-navbar></index-navbar>
            <div class="index-main">
                <transition>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import IndexSidebar from "./index-sidebar";
import IndexNavbar from "./index-navbar";
export default {
    name: "Index",
    components: {
        IndexSidebar,
        IndexNavbar,
    },
    created() {
        let mobileStatus = this.$utils.isMobileOrMiniClient();
        this.$store.dispatch("app/setMobile", mobileStatus);
    },
    beforeMount() {
        window.addEventListener(
            "resize",
            this.$utils.debounce(this.onWindowResize)
        );
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onWindowResize);
    },
    methods: {
        onWindowResize() {
            const rect = document.body.getBoundingClientRect();
            let mobileStatus;
            if (rect.width <= 1024) {
                mobileStatus = true;
            } else {
                mobileStatus = false;
            }
            this.$store.dispatch("app/setMobile", mobileStatus);
        },
        closeCollapse() {
            this.$store.dispatch("app/setCollapse", true);
        },
    },
    computed: {
        isCollapse() {
            return this.$store.getters["app/getCollapse"];
        },
        isMobile() {
            return this.$store.getters["app/getMobile"];
        },
    },
};
</script>

<style>
.index-layout {
    width: 100%;
    height: 100%;
}
.index-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.index-sidebar {
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

.index-container {
    height: 100%;
    transition: margin-left 0.28s;
    margin-left: 210px;
    position: relative;
}
.index-navbar {
    height: 50px;
    position: relative;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    align-items: center;
}
.index-sidebar .el-menu {
    border-right: none !important;
}
.index-navbar-collapse {
    height: 100%;
    line-height: 50px;
    padding: 0px 15px;
    display: inline-block;
    cursor: pointer;
}
.index-navbar-breadcrumb {
    flex: 1;
}
.index-navbar-dropdown {
    margin-right: 15px;
}
.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
}
.index-main {
    width: 100%;
    height: calc(100% - 50px);
}

/* 折叠模式 */
.index-layout--collapse .index-sidebar {
    width: 64px;
}
.index-layout--collapse .index-container {
    margin-left: 64px;
}
.el-menu--collapse .el-menu-item > span,
.el-menu--collapse .el-submenu .el-submenu__title > span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}

/* 移动端模式 */
.index-layout--mobile .index-sidebar {
}
.index-layout--mobile .index-container {
    margin-left: 64px;
}
</style>