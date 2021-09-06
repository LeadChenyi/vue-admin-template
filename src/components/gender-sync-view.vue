<template>
    <div class="gender-sync-view">
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
 * 父组件绑定数据：
 *  :gender.sync="gender"
 * 子组件派遣同步更新事件：
 *  this.$emit('update:gender',value);
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
            this.$emit("update:gender", value);
        },
    },
};
</script>