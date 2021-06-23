<template>
    <div class="index-layout" :class="{ 'index-layout--mobile': isMobile }">
        <!-- <div class="index-mask"></div> -->
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
    data() {
        return {
            isMobile: false,
        };
    },
    beforeMount() {
        window.addEventListener("resize", this.onWindowResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onWindowResize);
    },
    methods: {
        onWindowResize() {
            const rect = document.body.getBoundingClientRect();
            if (rect.width <= 1024) {
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
        },
    },
};
</script>

<style>
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
    min-height: 100%;
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
.index-navbar-collapse {
    height: 100%;
    line-height: 50px;
    padding: 0px 15px;
    display: inline-block;
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
</style>