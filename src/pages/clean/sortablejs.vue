<template>
    <div class="unit-page">
        <el-divider>sortablejs</el-divider>
        <div class="list-group" v-sortable="{ onUpdate: changeSortable }">
            <div class="list-group-item" v-for="item in sorts" :key="item.id">
                {{ item.title }}
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import Sortable from "sortablejs";
Vue.directive("sortable", {
    inserted: function (el, binding) {
        new Sortable(el, binding.value || {});
    },
});

export default {
    data() {
        return {
            sorts: [
                { id: 1, title: "Item 1" },
                { id: 2, title: "Item 2" },
                { id: 3, title: "Item 3" },
            ],
        };
    },
    methods: {
        changeSortable(e) {
            //splice(1、目标位置 2、删除个数 3、新增元素)
            //删除数组中oldIndex的元素并且将该元素保留，插入到newIndex的位置后面
            this.sorts.splice(
                e.newIndex,
                0,
                this.sorts.splice(e.oldIndex, 1)[0]
            );

            //标记最新顺序
            this.sorts.forEach((item, index) => {
                item.no = index;
            });
            console.log(this.sorts);
        },
    },
};
</script>

<style scoped>
.list-group {
    position: relative;
    overflow: hidden;
}
.list-group-item {
    position: relative;
    display: block;
    padding: 10px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>