<template>
    <div class="role-page">
        <div class="alike-container">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-card>
                        <div class="query">
                            <el-form :inline="true" :model="query">
                                <div>
                                    <el-form-item>
                                        <el-input
                                            placeholder="角色名称"
                                            v-model.trim="query.roleName"
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
                                :data="roles"
                                :max-height="maxHeightTable"
                                header-cell-class-name="table-header"
                                v-loading="isLoadingTable"
                                element-loading-text="数据加载中..."
                            >
                                <el-table-column
                                    prop="roleName"
                                    label="角色名称"
                                ></el-table-column>
                                <el-table-column
                                    prop="roleCode"
                                    label="权限字符"
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
                                <el-table-column
                                    prop="remark"
                                    label="描述备注"
                                ></el-table-column>
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
            :title="isEdit ? '编辑角色' : '新增角色'"
            :visible.sync="showDialog"
            width="600px"
            @close="cancel"
        >
            <el-form :model="form" ref="form" label-width="100px">
                <el-form-item label="角色名称">
                    <el-input
                        v-model="form.roleName"
                        placeholder="请输入角色名称"
                    />
                </el-form-item>
                <el-form-item label="权限字符">
                    <el-input
                        v-model="form.roleCode"
                        placeholder="请输入角色权限字符"
                    />
                </el-form-item>
                <el-form-item label="权限分配">
                    <el-tree
                        ref="queryTree"
                        :data="tree"
                        show-checkbox
                        accordion
                        node-key="menuCode"
                        :props="{ label: 'menuName', value: 'menuCode' }"
                        @check="checkTree"
                    ></el-tree>
                </el-form-item>
                <el-form-item label="是否禁用">
                    <el-switch v-model="form.status" :width="50"></el-switch>
                </el-form-item>
                <el-form-item label="描述备注">
                    <el-input
                        type="textarea"
                        v-model="form.remark"
                        placeholder="请输入角色描述备注"
                    />
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
    name: "UserRole",
    data() {
        return {
            tree: [],
            roles: [],
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
                roleName: "",
                status: "all",
                currentPage: 1,
                pageSize: 10,
            },
            form: {
                roleName: "",
                roleCode: "",
                menuCodekeys: [],
                status: false,
                remark: "",
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
        await this.getTree();
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
                url: "/roles",
                params: this.query,
            })
                .then((res) => {
                    console.log(res);
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }

                    this.roles = res.data;
                    this.total = res.total;
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
                        url: `/update/status/${row.id}`,
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
                url: `/role/${id}`,
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
                    this.$nextTick(()=>{
                        this.$refs.queryTree.setCheckedKeys(this.form.menuCodekeys);
                    })
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
                        url: `/delete/${id}`,
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
            let url = this.isEdit ? `/update/${this.form.id}` : "/create";
            let method = this.isEdit ? "PUT" : "POST";
            this.isLoadingSubmit = true;
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
            this.form.roleName = "";
            this.form.roleCode = "";
            this.form.menuCodekeys = [];
            this.form.status = false;
            this.form.remark = "";
            this.$refs.queryTree.setCheckedKeys(this.form.menuCodekeys);
        },
        lavalGroup(item, tree) {
            let children = [];
            tree.forEach((child) => {
                if (item.id == child.parentId) {
                    this.lavalGroup(child, tree);
                    children.push(child);
                }
            });
            if (children.length) {
                item.children = children;
            }
            return item;
        },
        getTree() {
            this.$request({
                url: "/menus",
            })
                .then((res) => {
                    res.data.forEach((item) => {
                        if (item.parentId == 0 || item.parentId == null) {
                            this.tree.push(this.lavalGroup(item, res.data));
                        }
                    });
                    console.log("tree", this.tree);
                })
                .catch((_) => {});
        },
        checkTree(current, tree) {
            console.log("current checked status", current);
            console.log("tree checked status", tree);
            this.form.menuCodekeys = tree.checkedKeys;
        },
    },
};
</script>

<style>
</style>