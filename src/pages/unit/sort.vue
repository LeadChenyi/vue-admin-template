<template>
    <div class="unit-page">
        <el-divider>sortablejs</el-divider>
        <div id="list-group" v-sortable="{ onUpdate: changeSortable }">
            <div class="list-group-item" v-for="item in sorts" :key="item.id">
                {{ item.title }}
            </div>
        </div>

        <el-divider>vue-draggable</el-divider>
        <div class="drag-wrapper" v-drag-and-drop:options="options">
            <ul class="drag-list">
                <li class="drag-item">Item 1</li>
                <li class="drag-item">Item 2</li>
                <li class="drag-item">Item 3</li>
            </ul>
            <ul class="drag-list">
                <li class="drag-item">Item 4</li>
                <li class="drag-item">Item 5</li>
                <li class="drag-item">Item 6</li>
            </ul>
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
    name: "Sort",
    data() {
        return {
            sorts: [
                { id: 1, title: "Item 1" },
                { id: 2, title: "Item 2" },
                { id: 3, title: "Item 3" },
            ],
            options: {
                reactivityEnabled: false,
                dropzoneSelector: ".drag-list",
                draggableSelector: ".drag-item",
                onDragend(event) {
                    console.log(event);
                },
            },
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
.drag-wrapper {
    display: flex;
    justify-content: center;
}

ul {
    display: flex;
    flex-direction: column;
    padding: 3px !important;
    min-height: 70vh;
    width: 100px;
    float: left;
    list-style-type: none;
    overflow-y: auto;
    border: 2px solid #888;
    border-radius: 0.2em;
    background: #8adccc;
    color: #555;
    margin-right: 5px;
}

/* drop target state */
ul[aria-dropeffect="move"] {
    border-color: #68b;
    background: #fff;
}

/* drop target focus and dragover state */
ul[aria-dropeffect="move"]:focus,
ul[aria-dropeffect="move"].dragover {
    outline: none;
    box-shadow: 0 0 0 1px #fff, 0 0 0 3px #68b;
}

/* draggable items */
li {
    display: block;
    list-style-type: none;
    margin: 0 0 2px 0;
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
    line-height: 1.3;
}

li:hover {
    box-shadow: 0 0 0 2px #68b, inset 0 0 0 1px #ddd;
}

/* items focus state */
li:focus {
    outline: none;
    box-shadow: 0 0 0 2px #68b, inset 0 0 0 1px #ddd;
}

/* items grabbed state */
li[aria-grabbed="true"] {
    background: #5cc1a6;
    color: #fff;
}

@keyframes nodeInserted {
    from {
        opacity: 0.2;
    }
    to {
        opacity: 0.8;
    }
}

.item-dropzone-area {
    height: 30px;
    background: #888;
    opacity: 0.8;
    animation-duration: 0.5s;
    animation-name: nodeInserted;
}
</style>