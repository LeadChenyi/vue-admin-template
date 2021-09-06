<template>
    <div class="alike-menu-item" v-if="!menu.meta.hidden">
        <el-menu-item
            v-if="hasSingleRoute(menu, menu.children)"
            :index="only.path"
            :disabled="only.disabled"
        >
            <i v-if="only.meta" :class="only.meta.icon"></i>
            <span slot="title" v-if="only.meta">{{ only.meta.title }}</span>
        </el-menu-item>
        <el-submenu :index="menu.path" v-else>
            <template slot="title">
                <i v-if="menu.meta" :class="menu.meta.icon"></i>
                <span v-if="menu.meta">{{ menu.meta.title }}</span>
            </template>
            <alike-menu-item
                v-for="item in menu.children"
                :key="item.path"
                :menu="item"
            ></alike-menu-item>
        </el-submenu>
    </div>
</template>

<script>
export default {
    name: "AlikeMenuItem",
    props: {
        menu: Object,
    },
    data() {
        return {
            only: null,
        };
    },
    methods: {
        hasSingleRoute(parent, children) {
            if (parent.meta.flat && children.length == 1) {
                this.only = children[0];
                return true;
            } else if (children == undefined) {
                this.only = parent;
                return true;
            }

            return false;
        },
    },
};
</script>

<style>
.el-submenu .el-menu-item {
    background-color: #1f2d3d !important;
}
.el-submenu .el-menu-item:hover,
.el-submenu .el-menu-item.is-active {
    background-color: #001528 !important;
}
</style>