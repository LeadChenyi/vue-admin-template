<template>
    <div class="alike-container p-20">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <div slot="header">指令方式</div>
                    <el-input placeholder="请输入内容" v-model="message">
                        <el-button
                            slot="append"
                            v-clipboard:copy="message"
                            v-clipboard:success="successCopy"
                            v-clipboard:error="errorCopy"
                            >复制</el-button
                        >
                    </el-input>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">方法方式</div>
                    <el-input placeholder="请输入内容" v-model="message2">
                        <el-button slot="append" @click="changeCopy"
                            >复制</el-button
                        >
                    </el-input>
                </el-card>
            </el-col>
        </el-row>
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