<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">el-date-picker 时间选择控件</div>
                    <div class="query">
                        <el-form :inline="true" :model="query">
                            <div>
                                <el-form-item>
                                    <el-date-picker
                                        type="date"
                                        placeholder="开始时间"
                                        v-model="query.startDate"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%"
                                    ></el-date-picker>
                                </el-form-item>
                                <el-form-item>
                                    <el-date-picker
                                        type="date"
                                        placeholder="结束时间"
                                        v-model="query.endDate"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item>
                                    <el-date-picker
                                        v-model="query.daterange"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd"
                                        :picker-options="pickerOptions"
                                        @change="changeDate"
                                    ></el-date-picker>
                                </el-form-item>
                                <el-button
                                    type="primary"
                                    icon="el-icon-search"
                                    @click="handleSearch"
                                    >搜索</el-button
                                >
                            </div>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Form",
    data() {
        return {
            query: {
                daterange: [],
                startDate: "",
                endDate: "",
                userName: "",
                status: "all",
                currentPage: 1,
                pageSize: 10,
            },
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
        };
    },
    methods: {
        changeDate(date) {
            if (date) {
                this.query.startDate = date[0];
                this.query.endDate = date[1];
            } else {
                this.query.startDate = "";
                this.query.endDate = "";
            }
        },
        handleSearch() {
            console.log(this.query);
        },
    },
};
</script>

<style>
</style>