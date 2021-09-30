<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import theme from "@/mixins/theme.js";
export default {
    name: "App",
    mixins: [theme],
    data() {
        return {
            resocures: ["https://map.qq.com/api/js"],
        };
    },
    created() {
        // 同步主题颜色
        this.syncThemeColor();

        // utils test area
        const nums = [7, 5, 3, 1, 9];
        const scores1 = [100, [99, [88, [77, 66, 55]]]];
        const scores2 = [100, 99, 88, 77, 66, 55];
        const scores3 = [100, 99, 88, 77, 66, 55, 66, 77, 88, 99];
        const logs = [
            {
                name: "签到",
                content: "完成了签到",
                value: 1,
            },
            {
                name: "打卡",
                content: "完成了打卡",
                value: 2,
            },
            {
                name: "登记",
                content: "完成了登记",
                value: 3,
            },
            {
                name: "打榜",
                content: "完成了打榜",
                value: 4,
            },
            {
                name: "邀请",
                content: "完成了邀请",
                value: 5,
            },
        ];

        const books = [
            {
                name: "金庸小说",
                children: [
                    {
                        name: "天龙八部",
                    },
                    {
                        name: "射雕英雄传",
                    },
                ],
            },
            {
                name: "四大名著",
                children: [
                    {
                        name: "水浒传",
                    },
                    {
                        name: "三国演义",
                    },
                    {
                        name: "红楼梦",
                    },
                    {
                        name: "西游记",
                    },
                ],
            },
        ];

        const people = {
            name: "陈先生",
            age: 18,
            gender: "男",
        };
        const hello = "北京欢迎你，北京欢迎你，北京欢迎你";
        const message = "什么是快乐星球，色情你我他？你妈的？";
        const username = "此言很差矣";
        const mobile = "13866668888";
        console.log(this.$utils.countStringIndex(mobile, "6"));
    },
};
</script>

<style lang="scss">
@import "./assets/style/app.css";
.pagination {
    margin-top: 20px;
}
.alike-container {
    padding: 20px;
}
</style>
