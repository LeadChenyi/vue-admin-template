<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">访客</div>
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
                    <el-table :data="users" style="width: 100%">
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
                rows: [
                    { 日期: "1月1日", PV: 123, UV: 323 },
                    { 日期: "1月2日", PV: 124, UV: 423 },
                    { 日期: "1月3日", PV: 223, UV: 523 },
                    { 日期: "1月4日", PV: 224, UV: 423 },
                    { 日期: "1月5日", PV: 133, UV: 323 },
                    { 日期: "1月6日", PV: 132, UV: 223 },
                    { 日期: "1月7日", PV: 121, UV: 213 },
                ],
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
                columns: ["位置", "客流量"],
                rows: [
                    { 位置: "北京", 客流量: 1998 },
                    { 位置: "上海", 客流量: 2010 },
                    { 位置: "广东", 客流量: 3688 },
                ],
            },
            users: [
                {
                    date: "2021-08-25 12:12:12",
                    name: "陈先生",
                    type: "sign",
                    label: "签到",
                    comment: "完成了签到",
                },
                {
                    date: "2021-08-25 17:17:17",
                    name: "陈先生",
                    type: "invite",
                    label: "邀请",
                    comment: "发起了好友邀请",
                },
                {
                    date: "2021-08-25 18:18:18",
                    name: "陈先生",
                    type: "invite",
                    label: "邀请",
                    comment: "好友接收了邀请",
                },
            ],
        };
    },
};
</script>

<style>
</style>