<template>
    <div class="alike-container p-20">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">echarts line</div>
                    <ve-line :data="lineData"></ve-line>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import veLine from "v-charts/lib/line.common";
export default {
    name: "Chart",
    components: {
        veLine,
    },
    data() {
        return {
            lineData: {
                columns: ["日期", "销售量"],
                rows: [
                    { 日期: "1月1日", 销售量: 123 },
                    { 日期: "1月2日", 销售量: 1223 },
                    { 日期: "1月3日", 销售量: 2123 },
                    { 日期: "1月4日", 销售量: 4123 },
                    { 日期: "1月5日", 销售量: 3123 },
                    { 日期: "1月6日", 销售量: 7123 },
                ],
            },
        };
    },
};
</script>

<style>
</style>