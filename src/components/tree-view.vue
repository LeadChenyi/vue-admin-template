<template>
    <ul class="tree-view">
        <li class="tree-item" v-for="(item, index) in tree" :key="index">
            <h3>{{ item.label }}</h3>
            <tree-view
                class="tree-view-sub"
                v-if="item.children"
                :tree="item.children"
            ></tree-view>
        </li>
    </ul>
</template>

<script>
export default {
    name: "tree-view",
    props: {
        tree: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style scoped>
.tree-view-sub .tree-item {
    margin-left: 40px;
}
</style>