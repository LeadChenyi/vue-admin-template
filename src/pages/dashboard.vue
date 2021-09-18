<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">活跃量</div>
                    <ve-line
                        :settings="lineSettings"
                        :data="lineData"
                    ></ve-line>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mt-20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">城市分布</div>
                    <ve-map :settings="mapSettings" :data="mapData"></ve-map>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">监控日志</div>
                    <el-table
                        :data="logs"
                        v-loading="isLoadingTable"
                        element-loading-text="数据加载中..."
                        style="width: 100%"
                    >
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="用户名称"
                            width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="label"
                            label="模块类型"
                            width="180"
                        >
                        </el-table-column>
                        <el-table-column prop="comment" label="操作描述">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import veLine from "v-charts/lib/line.common";
import veMap from "v-charts/lib/map.common";
export default {
    name: "Dashboard",
    components: {
        veLine,
        veMap,
    },
    data() {
        return {
            lineSettings: {
                stack: { 日期: ["PV", "UV"] },
                area: true,
            },
            lineData: {
                columns: ["日期", "PV", "UV"],
            },
            mapSettings: {
                position: "china",
                label: false,
                itemStyle: {
                    normal: {
                        // borderColor: "#00f",
                    },
                },
                zoom: 1,
            },
            mapData: {
                columns: ["位置", "活跃量"],
            },
            logs: [],
            loading: null,
            isLoadingTable: false,
        };
    },
    created() {
        this.loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
        });
        this.initData();
    },
    methods: {
        initData() {
            this.isLoadingTable = true;
            Promise.all([
                this.$request({
                    url: "/flows",
                }),
                this.$request({
                    url: "/cityFlows",
                }),
                this.$request({
                    url: "/logs",
                }),
            ])
                .then((res) => {
                    // console.log(res);
                    // 动态添加属性可同步视图渲染
                    this.$set(this.lineData, "rows", res[0].data);
                    this.$set(this.mapData, "rows", res[1].data);
                    this.logs = res[2].data;
                })
                .finally(() => {
                    this.loading.close();
                    this.isLoadingTable = false;
                });
        },
        getProjects() {
            // mock data
            this.$request({
                url: `/index/projects`,
            })
                .then((res) => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style>
</style>