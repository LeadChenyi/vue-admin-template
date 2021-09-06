<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">v-charts line</div>
                    <ve-line :data="lineData"></ve-line>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="mt-20" :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">echarts</div>
                    <echart-view
                        ref="queryWallace"
                        name="华莱士营业额"
                        :color="colors"
                        :value="wallaces"
                        v-if="wallaces"
                    ></echart-view>
                    <el-button @click="addWallaceJS"
                        >增加金山店营业额</el-button
                    >
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import EchartView from "@/components/echart-view";

export default {
    name: "Chart",
    components: {
        VeLine,
        EchartView,
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
            wallaces: [
                { value: 375, name: "金山店", color: "#409EFF" },
                { value: 360, name: "金祥店", color: "#67C23A" },
                { value: 320, name: "建新店", color: "#E6A23C" },
                { value: 1024, name: "万达店", color: "#F56C6C" },
                { value: 414, name: "世欧店", color: "#DCDFE6" },
            ],
            colors: [],
        };
    },
    mounted() {
        this.initWallaceColor();
    },
    methods: {
        initWallaceColor() {
            this.wallaces.forEach((item) => {
                this.colors.push(item.color);
            });
        },
        addWallaceJS() {
            this.wallaces.forEach((item, index) => {
                if (index == 0) {
                    item.value = item.value * 2;
                }
            });
            this.$refs.queryWallace.update();
        },
    },
    watch: {
        wallaces: {
            deep: true,
            handler: (newVal, oldVal) => {
                console.log("深度监听数组中对象属性值：", newVal);
            },
        },
    },
};
</script>

<style>
</style>