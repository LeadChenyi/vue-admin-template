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
    </div>
</template>

<script>
export default {
    name: "Copy",
    data() {
        return {
            message: "Copy These Text",
            message2: "Hello World",
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
    },
};
</script>

<style>
</style>