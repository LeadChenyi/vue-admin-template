<template>
    <div class="user-list-page">
        <div class="alike-container">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-card>
                        <div class="query">
                            <el-form :inline="true" :model="query">
                                <div>
                                    <el-form-item>
                                        <el-input
                                            placeholder="用户名称"
                                            v-model.trim="query.username"
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
                                        :loading="isLoadingSearch"
                                        >搜索</el-button
                                    >
                                    <el-button
                                        v-permission="['user:list:create']"
                                        type="primary"
                                        icon="el-icon-document-add"
                                        @click="handleCreate"
                                        >新增</el-button
                                    >
                                </div>
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
                                    prop="username"
                                    label="用户名称"
                                ></el-table-column>
                                <el-table-column label="是否禁用">
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
                                            v-permission="['user:list:update']"
                                            @click="handleEditor(scope.row._id)"
                                        >
                                            编辑
                                        </el-button>
                                        <el-button
                                            type="text"
                                            size="small"
                                            v-permission="['user:list:delete']"
                                            @click="handleDelete(scope.row._id)"
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
                                :page-sizes="[10, 20, 30]"
                                :total="total"
                                :current-page="query.currentPage"
                                :page-size="query.pageSize"
                                @current-change="handleCurrentChange"
                                @size-change="handleSizeChange"
                            ></el-pagination>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <el-dialog
            :title="isEdit ? '编辑用户' : '新增用户'"
            :visible.sync="showDialog"
            width="600px"
            @close="cancel"
        >
            <el-form :model="form" ref="form" label-width="100px">
                <el-form-item label="用户名称">
                    <el-input
                        v-model="form.username"
                        placeholder="请输入用户名称"
                        :disabled="isEdit ? true : false"
                    />
                </el-form-item>
                <el-form-item label="分配角色">
                    <el-checkbox-group v-model="form.role_ids">
                        <el-checkbox
                            :label="item._id"
                            v-for="(item, index) in roles"
                            :key="index"
                            >{{ item.name }}</el-checkbox
                        >
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="是否禁用">
                    <el-switch v-model="form.status" :width="50"></el-switch>
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
    </div>
</template>

<script>
export default {
    name: "UserList",
    data() {
        return {
            roles: [],
            users: [],
            total: 0,
            maxHeightTable: "auto",
            showDialog: false,
            isEdit: false,
            isLoadingSearch: false,
            isLoadingTable: false,
            isLoadingSubmit: false,
            query: {
                daterange: [],
                startDate: "",
                endDate: "",
                username: "",
                status: "all",
                currentPage: 1,
                pageSize: 10,
            },
            form: {
                username: "",
                status: false,
                role_ids: [],
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
    async created() {
        await this.initData();
        await this.getDataRole();
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
            this.isLoadingSearch = true;
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
            this.isLoadingTable = true;
            this.$request({
                url: "/user",
                params: {
                    username: this.query.username,
                    start_at: this.query.startDate,
                    end_at: this.query.endDate,
                    page: this.query.currentPage,
                    size: this.query.pageSize,
                    status: this.query.status,
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }

                    this.users = res.data;
                    this.total = res.count;
                })
                .finally(() => {
                    this.isLoadingTable = false;
                    if (this.isLoadingSearch) {
                        this.isLoadingSearch = false;
                    }
                });
        },
        changeStatus(row) {
            let msg = row.status ? "是否开启禁用状态" : "是否关闭禁用状态";
            this.$confirm(msg, "温馨提示", {
                type: "info",
            })
                .then((_) => {
                    this.$request({
                        url: `/user/status/${row._id}`,
                        method: "PUT",
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
        handleCreate() {
            this.isEdit = false;
            this.showDialog = true;
        },
        handleEditor(id) {
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            this.isEdit = true;
            this.$request({
                url: `/user/${id}`,
                method: "GET",
            })
                .then((res) => {
                    console.log(res);
                    this.showDialog = true;
                    loading.close();

                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    Object.assign(this.form, res.data);
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
                        url: `/user/${id}`,
                        method: "DELETE",
                    })
                        .then((res) => {
                            if (res.code != 200) {
                                this.$message.error(res.message);
                                return false;
                            }

                            this.$message.success(res.message);
                            this.initData();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((_) => {});
        },
        submit() {
            let url = this.isEdit ? `/user/${this.form._id}` : "/user/register";
            let method = this.isEdit ? "PUT" : "POST";
            this.isLoadingSubmit = true;
            if (this.form._id) {
                delete this.form._id;
                delete this.form.username;
            }
            this.$request({
                url,
                method,
                data: this.form,
            })
                .then((res) => {
                    console.log(res);
                    this.isLoadingSubmit = false;
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }

                    this.showDialog = false;
                    this.$message.success(res.message);
                    this.initData();
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoadingSubmit = false;
                });
        },
        cancel() {
            this.showDialog = false;
            this.form.username = "";
            this.form.status = false;
        },
        getDataRole() {
            this.$request({
                url: "/role",
            })
                .then((res) => {
                    console.log("getDataRole", res);
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }

                    this.roles = res.data;
                })
                .catch((_) => {});
        },
    },
};
</script>

<style>
</style>