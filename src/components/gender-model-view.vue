<template>
    <div class="gender-model-view">
        <el-radio
            v-for="item in genders"
            :value="gender"
            :label="item.value"
            :key="item.value"
            @change="changeGender(item.value)"
            >{{ item.name }}</el-radio
        >
    </div>
</template>

<script>
/**
 * 双向数据绑定需要注意一点，触发事件派遣时传递值的数据类型要与父组件定义给子组件props中的数据类型一致
 * 父组件绑定数据：
 *  v-modal="gender"
 * 子组件定义模型并派遣触发事件：
 *  model: {
 *     prop: "gender",
 *     event: "change",
 *  }
 *  this.$emit('change',value);
 */
export default {
    props: {
        source: {
            type: Array,
            default: () => [],
        },
        gender: {
            type: Number,
            default: 1,
        },
    },
    model: {
        prop: "gender",
        event: "change",
    },
    data() {
        return {
            genders: [
                {
                    name: "男",
                    value: 1,
                },
                {
                    name: "女",
                    value: 2,
                },
            ],
        };
    },
    mounted() {
        if (this.source && this.source.length) {
            this.genders = this.source;
        }
    },
    methods: {
        changeGender(value) {
            this.$emit("change", value);
        },
    },
};
</script>