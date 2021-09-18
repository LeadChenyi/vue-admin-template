<template>
    <div
        ref="queryLayout"
        class="alike-layout"
        :class="{
            'alike-layout--mobile': isMobile,
            'alike-layout--collapse': isCollapse,
        }"
    >
        <!-- 移动端菜单遮罩层 -->
        <template v-if="isMobile">
            <div
                class="alive-layout-mask"
                :hidden="isCollapse"
                @click="closeCollapse"
            ></div>
        </template>

        <alike-sidebar></alike-sidebar>

        <div class="alike-layout-page">
            <div class="alike-header">
                <alike-navbar
                    :fullScreenEnabled="fullScreenEnabled"
                    @changeFullScreen="changeFullScreen"
                    @clickSetting="clickSetting"
                ></alike-navbar>
                <alike-tag></alike-tag>
            </div>
            <div class="alike-main">
                <transition>
                    <keep-alive :include="getTags">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>

        <!-- 设置抽屉 -->
        <el-drawer
            title="设置"
            :visible.sync="isShowDrawerSetting"
            direction="rtl"
            size="20%"
        >
            <alike-drawer-setting></alike-drawer-setting>
        </el-drawer>
    </div>
</template>

<script>
import AlikeSidebar from "./alike-sidebar";
import AlikeNavbar from "./alike-navbar";
import AlikeTag from "./alike-tag";
import AlikeDrawerSetting from "./alike-drawer-setting";

export default {
    name: "Index",
    components: {
        AlikeSidebar,
        AlikeNavbar,
        AlikeTag,
        AlikeDrawerSetting,
    },
    data() {
        return {
            fullScreenEnabled: false,
            isShowDrawerSetting: false,
        };
    },
    created() {
        let mobileStatus = this.$utils.isMobileOrMiniClient();
        this.$store.dispatch("app/setMobile", mobileStatus);
    },
    beforeMount() {
        window.addEventListener(
            "resize",
            this.$utils.debounce(this.onWindowResize, 300)
        );
        window.addEventListener("keydown", this.onKeyDown);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onWindowResize);
        window.removeEventListener("keydown", this.onKeyDown);
    },
    methods: {
        onWindowResize() {
            // 更新设备模型状态
            const rect = document.body.getBoundingClientRect();
            let mobileStatus;
            if (rect.width <= 1024) {
                mobileStatus = true;
            } else {
                mobileStatus = false;
            }
            this.$store.dispatch("app/setMobile", mobileStatus);

            // 更新全屏状态
            this.fullScreenEnabled = this.checkFS();
        },
        onKeyDown(event) {
            let e =
                event || window.event || arguments.callee.caller.arguments[0];
            if (e.keyCode == 122) {
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                this.changeFullScreen(true);
            }
        },
        closeCollapse() {
            this.$store.dispatch("app/setCollapse", true);
        },
        clickSetting() {
            this.isShowDrawerSetting = !this.isShowDrawerSetting;
        },
        changeFullScreen(value) {
            if (value) {
                this.openFS(this.$refs.queryLayout);
            } else {
                this.closeFS();
            }
        },
        checkFS() {
            let isFull =
                document.mozFullScreen ||
                document.fullScreen ||
                document.webkitIsFullScreen ||
                document.webkitRequestFullScreen ||
                document.mozRequestFullScreen ||
                document.msFullscreenEnabled;
            if (isFull === undefined) isFull = false;
            return isFull;
        },
        openFS(ele) {
            // 开启的时候需要指定元素
            if (ele.requestFullscreen) {
                ele.requestFullscreen();
            } else if (ele.mozRequestFullScreen) {
                /* Firefox */
                ele.mozRequestFullScreen();
            } else if (ele.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                ele.webkitRequestFullscreen();
            } else if (ele.msRequestFullscreen) {
                /* IE/Edge */
                ele.msRequestFullscreen();
            }
        },
        closeFS() {
            // 关闭的时候只需委托给文档（因为一个显示器只有一个浏览器窗口能全屏）
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                /* IE/Edge */
                document.msExitFullscreen();
            }
        },
    },
    computed: {
        isCollapse() {
            return this.$store.getters["app/getCollapse"];
        },
        isMobile() {
            return this.$store.getters["app/getMobile"];
        },
        getTags() {
            return this.$store.getters["app/getTags"];
        },
    },
};
</script>

<style scoped>
.alike-layout {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
}
.alive-layout-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.alike-layout-page {
    height: 100%;
    transition: margin-left 0.28s;
    margin-left: 210px;
    position: relative;
}
.alike-main {
    width: 100%;
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #f5f6fa;
}
.alike-drawer-setting {
    padding: 20px;
}

/* 移动端模式 */
.alike-layout--mobile .alike-layout-page {
    margin-left: 64px;
}

/* 折叠模式 */
.alike-layout--collapse .alike-sidebar {
    width: 64px !important;
}
.alike-layout--collapse .alike-layout-page {
    margin-left: 64px !important;
}
</style>