<template>
    <div class="menu-page">
        <div class="alike-container">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-card>
                        <div class="query">
                            <el-form :inline="true" :model="query">
                                <div>
                                    <el-form-item>
                                        <el-input
                                            placeholder="菜单标题"
                                            v-model.trim="query.title"
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
                                                label="未禁用"
                                                :value="false"
                                            ></el-option>
                                            <el-option
                                                label="已禁用"
                                                :value="true"
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
                                        v-permission="['menu:handle:create']"
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
                                :data="menus"
                                :max-height="maxHeightTable"
                                header-cell-class-name="table-header"
                                v-loading="isLoadingTable"
                                element-loading-text="数据加载中..."
                            >
                                <el-table-column
                                    prop="title"
                                    label="菜单标题"
                                ></el-table-column>
                                <el-table-column
                                    prop="type"
                                    label="菜单类型"
                                ></el-table-column>
                                <el-table-column
                                    prop="char"
                                    label="权限字符"
                                ></el-table-column>
                                <el-table-column
                                    prop="parent_id"
                                    label="上级目录"
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
                                            v-permission="[
                                                'menu:handle:update',
                                            ]"
                                            type="text"
                                            size="small"
                                            @click="handleEditor(scope.row._id)"
                                        >
                                            编辑
                                        </el-button>
                                        <el-button
                                            v-permission="[
                                                'menu:handle:delete',
                                            ]"
                                            type="text"
                                            size="small"
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
            :title="isEdit ? '编辑菜单权限' : '新增菜单权限'"
            :visible.sync="showDialog"
            width="600px"
            @close="cancel"
        >
            <el-form :model="form" ref="form" label-width="100px">
                <el-form-item label="上级目录">
                    <el-cascader
                        clearable
                        placeholder="请选择上级目录"
                        v-model="form.parent_id"
                        :options="menuOptions"
                        :props="{
                            checkStrictly: true,
                            label: 'title',
                            value: '_id',
                        }"
                        :show-all-levels="false"
                        @change="changeCascader"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="菜单标题">
                    <el-input
                        v-model="form.title"
                        placeholder="请输入菜单标题"
                    />
                </el-form-item>
                <el-form-item label="菜单类型">
                    <el-radio-group v-model="form.type">
                        <el-radio
                            :label="key"
                            v-for="(value, key) in menuTypeEnums"
                            :key="key"
                            >{{ value }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="菜单路径">
                    <el-input
                        v-model="form.path"
                        placeholder="请输入菜单路径"
                    />
                </el-form-item>
                <el-form-item label="权限字符">
                    <el-input
                        v-model="form.char"
                        placeholder="请输入权限字符"
                    />
                </el-form-item>
                <el-form-item label="菜单图标">
                    <el-input
                        v-model="form.icon"
                        placeholder="请输入菜单图标"
                    />
                </el-form-item>
                <el-form-item label="菜单排序">
                    <el-input
                        v-model="form.sort"
                        placeholder="请输入菜单排序，值越大越靠前，默认为0"
                    />
                </el-form-item>
                <el-form-item label="是否隐藏">
                    <el-switch v-model="form.hidden" :width="50"></el-switch>
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
    name: "UserMenu",
    data() {
        return {
            menus: [],
            menuOptions: [],
            total: 0,
            maxHeightTable: "auto",
            showDialog: false,
            isEdit: false,
            isLoadingSearch: false,
            isLoadingTable: false,
            isLoadingSubmit: false,
            menuTypeEnums: null,
            query: {
                daterange: [],
                startDate: "",
                endDate: "",
                title: "",
                status: "all",
                currentPage: 1,
                pageSize: 10,
            },
            form: {
                title: "",
                type: "catalog",
                path: "",
                char: "",
                parent_id: 0,
                icon: "",
                sort: 0,
                hidden: false,
                status: false,
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
        this.menuTypeEnums = this.$store.getters["app/getEnums"].MenuName;
        this.initData();
    },
    computed: {
        getMenuTypeEnums() {
            let temps = [];
            for (let key in this.menuTypeEnums) {
                temps.push({
                    label: key,
                    name: this.menuTypeEnums[key],
                });
            }
            return temps;
        },
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
                url: "/menu",
                params: {
                    title: this.query.title,
                    status: this.query.status,
                    start_at: this.query.startDate,
                    end_at: this.query.endDate,
                    page: this.query.currentPage,
                    size: this.query.pageSize,
                },
            })
                .then((res) => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }

                    this.menus = res.data;
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
                        url: `/menu/status/${row._id}`,
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
                url: `/menu/${id}`,
                method: "GET",
            })
                .then((res) => {
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
                        url: `/menu/${id}`,
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
            let url = this.isEdit ? `/menu/${this.form._id}` : "/menu/create";
            let method = this.isEdit ? "PUT" : "POST";
            this.isLoadingSubmit = true;
            if (this.form._id) {
                delete this.form._id;
            }
            console.log(this.form);

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
            this.form.title = "";
            this.form.type = "catalog";
            this.form.path = "";
            this.form.char = "";
            this.form.parent_id = 0;
            this.form.icon = "";
            this.form.sort = 0;
            this.form.hidden = false;
            this.form.status = false;
        },
        changeCascader(ids) {
            this.form.parent_id = ids.length ? ids[ids.length - 1] : "0";
        },
        lavalGroup(item, tree) {
            let children = [];
            tree.forEach((child) => {
                if (item._id == child.parent_id) {
                    this.lavalGroup(child, tree);
                    children.push(child);
                }
            });
            if (children.length) {
                item.children = children;
            }
            return item;
        },
    },
    watch: {
        menus: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal && newVal != oldVal) {
                    this.menuOptions = [];
                    newVal.forEach((item) => {
                        if (item.parent_id == 0 || item.parent_id == null) {
                            this.menuOptions.push(
                                this.lavalGroup(item, newVal)
                            );
                        }
                    });
                }
            },
        },
    },
};
</script>

<style>
</style>