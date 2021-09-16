<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        操作子组件双向绑定更新父组件数据 v-modal
                    </div>
                    <gender-model-view v-model="gender1"></gender-model-view>
                    <div class="mt-20">
                        <el-button @click="getData('gender1')"
                            >获取性别</el-button
                        >
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">操作子组件同步更新父组件数据 .sync</div>
                    <gender-sync-view :gender.sync="gender2"></gender-sync-view>
                    <div class="mt-20">
                        <el-button @click="getData('gender2')"
                            >获取性别</el-button
                        >
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mt-20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        通过具名插槽让父组件可自定义元素在子组件内展示、还可逆向数据流子传父
                        slot-scope
                    </div>
                    <slot-scope-item>
                        <template v-slot="scope">
                            <el-tag type="success"
                                >陈慧娴：{{ scope.value }}</el-tag
                            >
                        </template>
                    </slot-scope-item>
                    <slot-scope-item message="爱要怎么说出口">
                        <template v-slot="scope">
                            <el-tag type="success"
                                >赵传：{{ scope.value }}</el-tag
                            >
                        </template>
                    </slot-scope-item>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">递归树形组件 tree</div>
                    <tree-view :tree="tree"></tree-view>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog
            ref="queryDialog1"
            title="dialog1"
            width="30%"
            @close="closeDialog"
        >
            <span>这是一段信息</span>
        </el-dialog>
        <el-dialog
            ref="queryDialog2"
            title="dialog2"
            width="30%"
            @close="closeDialog"
        >
            <span>这是二段信息</span>
        </el-dialog>
    </div>
</template>

<script>
import GenderModelView from "@/components/gender-model-view.vue";
import GenderSyncView from "@/components/gender-sync-view.vue";
import SlotScopeItem from "@/components/slot-scope-item.vue";
import TreeView from "@/components/tree-view.vue";
export default {
    name: "Custom",
    components: {
        GenderModelView,
        GenderSyncView,
        SlotScopeItem,
        TreeView,
    },
    data() {
        return {
            gender1: 1,
            gender2: 2,
            tree: [
                {
                    id: 1347,
                    label: "用户管理",
                    children: [
                        {
                            id: 1348,
                            label: "用户列表",
                            children: [
                                {
                                    id: 1349,
                                    label: "添加",
                                },
                                {
                                    id: 1350,
                                    label: "编辑",
                                },
                                {
                                    id: 1398,
                                    label: "删除",
                                },
                            ],
                        },
                    ],
                },
            ],
            dialogs: ["queryDialog1", "queryDialog2"],
        };
    },
    mounted() {
        // 通过队列和监听的方式依次自动展示弹窗
        // this.$refs[this.dialogs[0]].visible = true;
    },
    methods: {
        getData(key) {
            this.$message({
                type: "success",
                message: `${key}：${this[key]}`,
            });
        },
        closeDialog() {
            this.$refs[this.dialogs[0]].visible = false;
            if (this.dialogs.length) {
                this.dialogs.shift();
            }
        },
    },
    watch: {
        dialogs: {
            handler(newVal) {
                if (newVal && newVal.length) {
                    let timer = setTimeout(() => {
                        this.$refs[newVal[0]].visible = true;
                        clearTimeout(timer);
                    }, 300);
                }
            },
            deep: true,
        },
    },
};
</script>

<style>
</style>