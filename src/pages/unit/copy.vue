<template>
    <div class="copy-page">
        <el-divider>指令方式</el-divider>
        <el-input placeholder="请输入内容" v-model="message">
            <el-button
                slot="append"
                v-clipboard:copy="message"
                v-clipboard:success="successCopy"
                v-clipboard:error="errorCopy"
                >复制</el-button
            >
        </el-input>
        <el-divider>Promise方式</el-divider>
        <el-input placeholder="请输入内容" v-model="message2">
            <el-button slot="append" @click="changeCopy">复制</el-button>
        </el-input>

        <el-divider>sortable</el-divider>
        <ul id="list-group" v-sortable="{onUpdate:changeSortable}">
            <li
                class="list-group-item"
                v-for="item in sorts"
                :key="item.id"
            >
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import Sortable from 'sortablejs'

Vue.directive('sortable', {
  inserted: function (el, binding) {
    new Sortable(el, binding.value || {})
  }
})

export default {
    name: "Copy",
    data() {
        return {
            message: "Copy These Text",
            message2: "Hello World",
            sorts: [
                { id: 1, title: "Item 1" },
                { id: 2, title: "Item 2" },
                { id: 3, title: "Item 3" },
            ],
        };
    },
    methods: {
        successCopy(e) {
            console.log("复制成功: " + e.text);
        },
        errorCopy(e) {
            console.log("复制失败：" + e);
        },
        changeCopy() {
            this.$copyText(this.message2).then(
                (e) => {
                    console.log("复制成功: " + e.text);
                },
                (e) => {
                    console.log("复制失败：" + e);
                }
            );
        },
        changeSortable(e){
      //splice(1、目标位置 2、删除个数 3、新增元素)
      //删除数组中oldIndex的元素并且将该元素保留，插入到newIndex的位置后面
      this.sorts.splice(e.newIndex, 0, this.sorts.splice(e.oldIndex, 1)[0]);

      //标记最新顺序
      this.sorts.forEach((item,index) => {
        item.no = index;
      })
      console.log(this.sorts);
    }
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