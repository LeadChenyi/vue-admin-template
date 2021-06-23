<template>
    <div class="index-menu-item">
        <el-menu-item
            v-if="!hasSingleRoute"
            :index="menu.path"
            :disabled="menu.disabled"
        >
            <i v-if="menu.meta" :class="menu.meta.icon"></i>
            <span slot="title" v-if="menu.meta">{{ menu.meta.title }}</span>
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
    computed: {
        hasSingleRoute() {
            return this.menu.children && this.menu.children.length;
        },
    },
};
</script>

<style>
</style>