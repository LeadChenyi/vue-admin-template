<template>
    <div class="index-menu-item" v-if="!menu.meta.hidden">
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
            <index-menu-item
                v-for="item in menu.children"
                :key="item.path"
                :menu="item"
            ></index-menu-item>
        </el-submenu>
    </div>
</template>

<script>
export default {
    name: "IndexMenuItem",
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
            // 晋升路由：当子路由只有一个元素时，当前路由不展示
            if (parent.meta.promote && children.length == 1) {
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
</style>