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
                    @changeFullScreen="changeFullScreen"
                    @changeSetting="changeSetting"
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
        >
            <div class="drawer-setting">
                <el-color-picker
                    v-model="themeColor"
                    @change="changeTheme"
                ></el-color-picker>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import AlikeSidebar from "./alike-sidebar";
import AlikeNavbar from "./alike-navbar";
import AlikeTag from "./alike-tag";
import Variables from "@/assets/style/variables.scss";
// 锁定版本，以免将来 Element 升级时受到非兼容性更新的影响。
const version = require("element-ui/package.json").version;
const ORIGINAL_THEME = Variables.colorPrimary;

export default {
    name: "Index",
    components: {
        AlikeSidebar,
        AlikeNavbar,
        AlikeTag,
    },
    data() {
        return {
            isShowDrawerSetting: false,
            themeColor: Variables.colorPrimary,
        };
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
    mounted() {
        // get common data
        // 枚举
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onWindowResize);
    },
    watch: {
        async themeColor(val) {
            const oldVal = this.chalk ? this.themeColor : ORIGINAL_THEME;
            if (typeof val !== "string") return;
            const themeCluster = this.getThemeCluster(val.replace("#", ""));
            const originalCluster = this.getThemeCluster(
                oldVal.replace("#", "")
            );

            const getHandler = (variable, id) => {
                return () => {
                    const originalCluster = this.getThemeCluster(
                        ORIGINAL_THEME.replace("#", "")
                    );
                    const newStyle = this.updateStyle(
                        this[variable],
                        originalCluster,
                        themeCluster
                    );
                    let styleTag = document.getElementById(id);
                    if (!styleTag) {
                        styleTag = document.createElement("style");
                        styleTag.setAttribute("id", id);
                        styleTag.setAttribute("type", "text/css");
                        document.head.appendChild(styleTag);
                    }
                    styleTag.innerText = newStyle;
                };
            };

            if (!this.chalk) {
                const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
                await this.getCSSString(url, "chalk");
            }

            const chalkHandler = getHandler("chalk", "chalk-style");

            chalkHandler();

            const styles = [].slice
                .call(document.querySelectorAll("style"))
                .filter((style) => {
                    const text = style.innerText;
                    return (
                        new RegExp(oldVal, "i").test(text) &&
                        !/Chalk Variables/.test(text)
                    );
                });

            styles.forEach((style) => {
                const { innerText } = style;
                if (typeof innerText !== "string") return;
                style.innerText = this.updateStyle(
                    innerText,
                    originalCluster,
                    themeCluster
                );
            });
        },
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
        changeSetting() {
            this.isShowDrawerSetting = !this.isShowDrawerSetting;
        },
        updateStyle(style, oldCluster, newCluster) {
            console.log("更新了样式...");
            let newStyle = style;
            oldCluster.forEach((color, index) => {
                newStyle = newStyle.replace(
                    new RegExp(color, "ig"),
                    newCluster[index]
                );
            });
            return newStyle;
        },
        getCSSString(url, variable) {
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        this[variable] = xhr.responseText.replace(
                            /@font-face{[^}]+}/,
                            ""
                        );
                        resolve();
                    }
                };
                xhr.open("GET", url);
                xhr.send();
            });
        },
        getThemeCluster(theme) {
            const tintColor = (color, tint) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);

                if (tint === 0) {
                    return [red, green, blue].join(",");
                } else {
                    red += Math.round(tint * (255 - red));
                    green += Math.round(tint * (255 - green));
                    blue += Math.round(tint * (255 - blue));

                    red = red.toString(16);
                    green = green.toString(16);
                    blue = blue.toString(16);

                    return `#${red}${green}${blue}`;
                }
            };

            const shadeColor = (color, shade) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);

                red = Math.round((1 - shade) * red);
                green = Math.round((1 - shade) * green);
                blue = Math.round((1 - shade) * blue);

                red = red.toString(16);
                green = green.toString(16);
                blue = blue.toString(16);

                return `#${red}${green}${blue}`;
            };

            const clusters = [theme];
            for (let i = 0; i <= 9; i++) {
                clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
            }
            clusters.push(shadeColor(theme, 0.1));
            return clusters;
        },
        changeTheme(e) {
            // v-model themeColor
            console.log("changeTheme", e);
        },
        changeFullScreen(value) {
            if (value) {
                this.openFS(this.$refs.queryLayout);
            } else {
                this.closeFS();
            }
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

<style>
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
.alike-sidebar-board {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
}
.alike-sidebar-board__image {
    width: 100%;
    height: 60px;
}
.alike-layout-page {
    height: 100%;
    transition: margin-left 0.28s;
    margin-left: 210px;
    position: relative;
}
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
.alike-sidebar .el-menu {
    border-right: none !important;
}
.alike-navbar-collapse {
    height: 100%;
    line-height: 60px;
    padding: 0px 15px;
    display: inline-block;
    cursor: pointer;
}
.alike-navbar-breadcrumb {
    flex: 1;
}
.alike-navbar-dropdown {
    margin-right: 15px;
}
.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
}
.alike-main {
    width: 100%;
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #f5f6fa;
}
.alike-container {
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
.el-menu--collapse .el-menu-item > span,
.el-menu--collapse .el-submenu .el-submenu__title > span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}
</style>