<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <div slot="header">指令绑定方式</div>
                    <el-input placeholder="请输入内容" v-model="field1">
                        <el-button
                            slot="append"
                            v-clipboard:copy="field1"
                            v-clipboard:success="successCopy"
                            v-clipboard:error="errorCopy"
                            >复制</el-button
                        >
                    </el-input>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">方法回调方式</div>
                    <el-input placeholder="请输入内容" v-model="field2">
                        <el-button slot="append" @click="changeCopy(field2)"
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
            field1: "this is field one",
            field2: "this is field two",
        };
    },
    methods: {
        successCopy(e) {
            this.$message({
                type: "success",
                message: `复制成功:${e.text}`,
            });
        },
        errorCopy(e) {
            this.$message({
                type: "error",
                message: e,
            });
        },
        changeCopy(value) {
            this.$copyText(value).then(
                (e) => {
                    this.$message({
                        type: "success",
                        message: `复制成功:${e.text}`,
                    });
                },
                (e) => {
                    this.$message({
                        type: "error",
                        message: e,
                    });
                }
            );
        },
    },
};
</script>

<style>
</style>