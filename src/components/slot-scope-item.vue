<template>
    <div class="slot-scope-item">
        <slot :value="message"></slot>
    </div>
</template>

<script>
/**
 * 逆向数据流子传父：
 * 子组件传递数据
 *  <slot :value="message"></slot>
 * 父组件接收数据
 *  <template slot-scope="scope">{{scope.value}}</template>
 */
export default {
    name: "SlotScopeItem",
    props: {
        message: {
            type: String,
            default: "千千阙歌",
        },
    },
};
</script>

<style>
</style>