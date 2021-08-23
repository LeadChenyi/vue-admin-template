<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        动态表单规则挂载到el-form-item组件上
                    </div>
                    <el-form
                        :model="formData1"
                        ref="formData1"
                        label-width="100px"
                        :inline="true"
                    >
                        <div
                            class="packet-item"
                            v-for="(item, index) in formData1.packets"
                            :key="index"
                        >
                            <el-form-item
                                label="红包份数"
                                :prop="'packets.' + index + '.number'"
                                :rules="{
                                    label: '红包份数',
                                    required: true,
                                    validator: $validation.isNumber,
                                    trigger: 'blur',
                                }"
                            >
                                <el-input
                                    v-model="item.number"
                                    placeholder="请输入红包份数"
                                />
                            </el-form-item>
                            <el-form-item
                                label="红包金额"
                                :prop="'packets.' + index + '.money'"
                                :rules="{
                                    label: '红包金额',
                                    required: true,
                                    validator: $validation.isMoney,
                                    trigger: 'blur',
                                }"
                            >
                                <el-input
                                    type="number"
                                    step="0.01"
                                    v-model="item.money"
                                    placeholder="请输入红包金额"
                                />
                            </el-form-item>
                            <el-button
                                type="primary"
                                @click="onCreate(formData1)"
                                v-if="index == 0"
                                >添加</el-button
                            >
                            <el-button
                                type="danger"
                                @click="onDelete(formData1, index)"
                                v-else
                                >删除</el-button
                            >
                        </div>
                        <div>
                            <el-button
                                type="primary"
                                @click="onSubmit('formData1', formData1)"
                                >提交</el-button
                            >
                        </div>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        动态表单规则挂载到el-form-item组件上（非必填可为空）
                    </div>
                    <el-form
                        :model="formData2"
                        ref="formData2"
                        label-width="100px"
                        :inline="true"
                    >
                        <div
                            class="packet-item"
                            v-for="(item, index) in formData2.packets"
                            :key="index"
                        >
                            <el-form-item
                                label="红包份数"
                                :prop="'packets.' + index + '.number'"
                                :rules="{
                                    label: '红包份数',
                                    required: false,
                                    validator: $validation.isEmptyNumber,
                                    trigger: 'blur',
                                }"
                            >
                                <el-input
                                    v-model="item.number"
                                    placeholder="请输入红包份数"
                                />
                            </el-form-item>
                            <el-form-item
                                label="红包金额"
                                :prop="'packets.' + index + '.money'"
                                :rules="{
                                    label: '红包金额',
                                    required: false,
                                    validator: $validation.isEmptyMoney,
                                    trigger: 'blur',
                                }"
                            >
                                <el-input
                                    type="number"
                                    step="0.01"
                                    v-model="item.money"
                                    placeholder="请输入红包金额"
                                />
                            </el-form-item>
                            <el-button
                                type="primary"
                                @click="onCreate(formData2)"
                                v-if="index == 0"
                                >添加</el-button
                            >
                            <el-button
                                type="danger"
                                @click="onDelete(formData2, index)"
                                v-else
                                >删除</el-button
                            >
                        </div>
                        <div>
                            <el-button
                                type="primary"
                                @click="onSubmit('formData2', formData2)"
                                >提交</el-button
                            >
                        </div>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mt-20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        静态表单规则挂载到el-form组件上，动态表单规则挂载到el-form-item组件上
                    </div>
                    <el-form
                        :model="formData3"
                        ref="formData3"
                        label-width="100px"
                        :inline="true"
                        :rules="rules3"
                    >
                        <div>
                            <el-form-item label="红包标题" prop="title">
                                <el-input
                                    v-model="formData3.title"
                                    placeholder="请输入红包标题"
                                />
                            </el-form-item>
                            <el-form-item label="红包类型" prop="type">
                                <el-radio-group v-model="formData3.type">
                                    <el-radio :label="1">普通</el-radio>
                                    <el-radio :label="2">拼手气</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div
                            class="packet-item"
                            v-for="(item, index) in formData3.packets"
                            :key="index"
                        >
                            <el-form-item
                                label="红包份数"
                                :prop="'packets.' + index + '.number'"
                                :rules="{
                                    label: '红包份数',
                                    required: true,
                                    validator: $validation.isNumber,
                                    trigger: 'blur',
                                }"
                            >
                                <el-input
                                    v-model="item.number"
                                    placeholder="请输入红包份数"
                                />
                            </el-form-item>
                            <el-form-item
                                label="红包金额"
                                :prop="'packets.' + index + '.money'"
                                :rules="{
                                    label: '红包金额',
                                    required: true,
                                    validator: $validation.isMoney,
                                    trigger: 'blur',
                                }"
                            >
                                <el-input
                                    type="number"
                                    step="0.01"
                                    v-model="item.money"
                                    placeholder="请输入红包金额"
                                />
                            </el-form-item>
                            <el-button
                                type="primary"
                                @click="onCreate(formData3)"
                                v-if="index == 0"
                                >添加</el-button
                            >
                            <el-button
                                type="danger"
                                @click="onDelete(formData3, index)"
                                v-else
                                >删除</el-button
                            >
                        </div>
                        <div>
                            <el-button
                                type="primary"
                                @click="onSubmit('formData3', formData3)"
                                >提交</el-button
                            >
                        </div>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">
                        静态表单规则挂载到el-form组件上，动态表单规则挂载到el-form-item组件上（规则都写在data对象中-非必填可为空）
                    </div>
                    <el-form
                        :model="formData4"
                        ref="formData4"
                        label-width="100px"
                        :inline="true"
                        :rules="rules4"
                    >
                        <div>
                            <el-form-item label="红包标题" prop="title">
                                <el-input
                                    v-model="formData4.title"
                                    placeholder="请输入红包标题"
                                />
                            </el-form-item>
                            <el-form-item label="红包类型" prop="type">
                                <el-radio-group v-model="formData4.type">
                                    <el-radio :label="1">普通</el-radio>
                                    <el-radio :label="2">拼手气</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div
                            class="packet-item"
                            v-for="(item, index) in formData4.packets"
                            :key="index"
                        >
                            <el-form-item
                                label="红包份数"
                                :prop="'packets.' + index + '.number'"
                                :rules="rules4.packets.number"
                            >
                                <el-input
                                    v-model="item.number"
                                    placeholder="请输入红包份数"
                                />
                            </el-form-item>
                            <el-form-item
                                label="红包金额"
                                :prop="'packets.' + index + '.money'"
                                :rules="rules4.packets.money"
                            >
                                <el-input
                                    type="number"
                                    step="0.01"
                                    v-model="item.money"
                                    placeholder="请输入红包金额"
                                />
                            </el-form-item>
                            <el-button
                                type="primary"
                                @click="onCreate(formData4)"
                                v-if="index == 0"
                                >添加</el-button
                            >
                            <el-button
                                type="danger"
                                @click="onDelete(formData4, index)"
                                v-else
                                >删除</el-button
                            >
                        </div>
                        <div>
                            <el-button
                                type="primary"
                                @click="onSubmit('formData4', formData4)"
                                >提交</el-button
                            >
                        </div>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Rule",
    data() {
        // 尤其在有动态表单字段时，不推荐将自定义规则方法写入局部
        const localIsEmptyNumber = (rule, value, callback) => {
            let index = rule.field.split(".")[1];
            value = this.formData4.packets[index].number;

            let label = rule.label || "";
            let pattern = /^[1-9][0-9]*$/;
            if (value == "") {
                callback();
            } else if (value == 0) {
                callback(new Error(`${label}不得为0`));
            } else if (!pattern.test(value)) {
                callback(new Error(`${label}只能为正整数`));
            } else {
                callback();
            }
        };

        const localIsEmptyMoney = (rule, value, callback) => {
            let index = rule.field.split(".")[1];
            value = this.formData4.packets[index].money;

            let label = rule.label || "";
            if (value == "") {
                callback();
            } else if (value == 0) {
                callback(new Error(`${label}不得为0`));
            } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                callback(new Error(`${label}只能保留两位小数`));
            } else {
                callback();
            }
        };

        return {
            formData1: {
                packets: [
                    {
                        number: "",
                        money: "",
                    },
                ],
            },
            formData2: {
                packets: [
                    {
                        number: "",
                        money: "",
                    },
                ],
            },
            formData3: {
                title: "",
                type: "",
                packets: [
                    {
                        number: "",
                        money: "",
                    },
                ],
            },
            rules3: {
                title: [
                    {
                        required: true,
                        message: "请输入红包标题",
                        trigger: "blur",
                    },
                ],
                type: [
                    {
                        required: true,
                        message: "请选择选择类型",
                        trigger: "change",
                    },
                ],
            },
            formData4: {
                title: "",
                type: "",
                packets: [
                    {
                        number: "",
                        money: "",
                    },
                ],
            },
            rules4: {
                title: [
                    {
                        required: false,
                        message: "请输入红包标题",
                        trigger: "blur",
                    },
                ],
                type: [
                    {
                        required: false,
                        message: "请选择选择类型",
                        trigger: "change",
                    },
                ],
                packets: {
                    number: {
                        label: "红包份数",
                        required: false,
                        validator: localIsEmptyNumber,
                        trigger: "blur",
                    },
                    money: {
                        label: "红包金额",
                        required: false,
                        validator: localIsEmptyMoney,
                        trigger: "blur",
                    },
                },
            },
        };
    },
    methods: {
        onSubmit(ref, ctx) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.$message({
                        type: "success",
                        message: `验证通过：${JSON.stringify(ctx)}`,
                    });
                }
            });
        },
        onCreate(ctx) {
            ctx.packets.push({
                number: "",
                money: "",
            });
        },
        onDelete(ctx, index) {
            ctx.packets.splice(index, 1);
        },
    },
};
</script>

<style>
</style>