<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card>
                    <div slot="header">数据列表</div>
                    <div class="query">
                        <el-form :inline="true" :model="query">
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
                            </div>
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
                                    <el-input
                                        placeholder="用户名"
                                        v-model.trim="query.nickname"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-select
                                        v-model="query.status"
                                        placeholder="状态"
                                    >
                                        <el-option
                                            label="不限"
                                            value="all"
                                        ></el-option>
                                        <el-option
                                            label="启用"
                                            :value="true"
                                        ></el-option>
                                        <el-option
                                            label="禁用"
                                            :value="false"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <el-button
                                type="primary"
                                icon="el-icon-search"
                                @click="handleSearch"
                                :loading="isLoadingSearch"
                                >搜索</el-button
                            >
                        </el-form>
                    </div>

                    <div class="table">
                        <el-table
                            :data="users"
                            :max-height="maxHeightTable"
                            header-cell-class-name="table-header"
                            v-loading="isLoadingTable"
                            element-loading-text="数据加载中..."
                        >
                            <el-table-column
                                prop="nickName"
                                label="用户昵称"
                            ></el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <el-switch
                                        v-model="scope.row.status"
                                        :width="50"
                                        @change="changeStatus(scope.row)"
                                    ></el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="handleEditor(scope.row.id)"
                                    >
                                        编辑
                                    </el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="handleDelete(scope.row.id)"
                                    >
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <div class="pagination">
                        <el-pagination
                            background
                            layout="total, sizes, prev, pager, next"
                            :page-sizes="[10, 20, 30, 50, 100]"
                            :current-page="query.currentPage"
                            :page-size="query.pageSize"
                            :total="total"
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                        ></el-pagination>
                    </div>

                    <el-dialog
                        title="表单"
                        :visible.sync="showDialog"
                        width="600px"
                        @close="cancel"
                    >
                        <el-form :model="form" ref="form" label-width="100px">
                            <el-form-item label="用户昵称">
                                <el-input
                                    v-model="form.nickname"
                                    placeholder="请输入用户昵称"
                                />
                            </el-form-item>
                            <el-form-item label="用户状态">
                                <el-switch
                                    v-model="form.status"
                                    :width="50"
                                ></el-switch>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancel">取 消</el-button>
                            <el-button
                                type="primary"
                                @click="submit"
                                :loading="isLoadingSubmit"
                                >确 定</el-button
                            >
                        </div>
                    </el-dialog>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            users: [
                {
                    id: 1,
                    nickName: "那么好",
                    status: true,
                },
                {
                    id: 2,
                    nickName: "真的好",
                    status: true,
                },
                {
                    id: 3,
                    nickName: "就是好",
                    status: true,
                },
            ],
            total: 100,
            maxHeightTable: "auto",
            isLoadingSearch: false,
            isLoadingTable: false,
            isLoadingSubmit: false,
            showDialog: false,
            query: {
                daterange: [],
                startDate: "",
                endDate: "",
                nickname: "",
                status: "all",
                currentPage: 1,
                pageSize: 10,
            },
            form: {
                nickname: "",
                status: true,
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
    created() {
        this.initData();
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
            this.query.currentPage = 1;
            this.initData();
        },
        handleCurrentChange(page) {
            this.query.currentPage = page;
            this.initData();
        },
        handleSizeChange(size) {
            this.query.currentPage = 1;
            this.query.pageSize = size;
            this.initData();
        },
        initData() {
            // this.isLoadingTable = true;
            // this.$request({
            //     url:'/'
            // }).then((res)=>{
            //     this.isLoadingTable = false;
            //     if (res.code != 200) {
            //         this.$message.error(res.message);
            //         return false;
            //     }
            //     console.log(res);
            // }).catch((err)=>{
            //     this.isLoadingTable = false;
            //     console.log(err);
            // })
        },
        handleEditor(id) {
            this.showDialog = true;
            this.$request({
                url: `/${id}`,
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
        handleDelete(id) {
            this.$confirm("是否确认删除该条数据", "温馨提示", {
                type: "warning",
            })
                .then((_) => {
                    this.$request({
                        url: `/${id}`,
                    })
                        .then((res) => {
                            if (res.code != 200) {
                                this.$message.error(res.message);
                                return false;
                            }

                            this.$message.success(res.message);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((_) => {});
        },
        changeStatus(row) {
            let msg = row.status ? "是否开启状态" : "是否关闭状态";
            this.$confirm(msg, "温馨提示", {
                type: "info",
            })
                .then((_) => {
                    this.$request({
                        url: "/",
                    })
                        .then((res) => {
                            if (res.code != 200) {
                                this.$message.error(res.message);
                                row.status = !row.status;
                                return false;
                            }

                            this.$message.success(res.message);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((_) => {
                    row.status = !row.status;
                });
        },
        submit() {
            this.showDialog = false;
            this.isLoadingSubmit = true;
            this.$request({
                url: "/",
            })
                .then((res) => {
                    this.isLoadingSubmit = false;
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    console.log(res);
                })
                .catch((err) => {
                    this.isLoadingSubmit = false;
                    console.log(err);
                });
        },
        cancel() {
            this.showDialog = false;
            this.form.nickname = "";
            this.form.status = true;
        },
    },
};
</script>

<style>
</style>