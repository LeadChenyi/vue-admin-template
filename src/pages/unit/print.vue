<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">print.js 打印文章</div>
                    <div ref="queryArticle">
                        歌德曾经说过，没有人事先了解自己到底有多大的力量，直到他试过以后才知道。这似乎解答了我的疑惑。
                        带着这些问题，我们来审视一下生活的意义。
                        从这个角度来看，
                        爱迪生说过一句富有哲理的话，失败也是我需要的，它和成功对我一样有价值。这启发了我，
                        俾斯麦说过一句富有哲理的话，对于不屈不挠的人来说，没有失败这回事。这似乎解答了我的疑惑。
                        达尔文说过一句富有哲理的话，敢于浪费哪怕一个钟头时间的人，说明他还不懂得珍惜生命的全部价值。我希望诸位也能好好地体会这句话。
                        问题的关键究竟为何？
                        生活的意义，发生了会如何，不发生又会如何。 一般来说，
                        在这种困难的抉择下，本人思来想去，寝食难安。
                        这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。
                        要想清楚，生活的意义，到底是一种怎么样的存在。 我认为，
                        可是，即使是这样，生活的意义的出现仍然代表了一定的意义。
                        而这些并不是完全重要，更加重要的问题是，
                        了解清楚生活的意义到底是一种怎么样的存在，是解决一切问题的关键。
                    </div>
                    <div class="mt-20">
                        <el-button @click="printElement('queryArticle')"
                            >打印</el-button
                        >
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">print.js 打印表格</div>
                    <div ref="queryTable">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="日期"
                                width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                width="180"
                            >
                            </el-table-column>
                            <el-table-column prop="address" label="地址">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="mt-20">
                        <el-button @click="printElement('queryTable')"
                            >打印</el-button
                        >
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mt-20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">vue-print-nb 打印文章</div>
                    <div id="article">
                        歌德曾经说过，没有人事先了解自己到底有多大的力量，直到他试过以后才知道。这似乎解答了我的疑惑。
                        带着这些问题，我们来审视一下生活的意义。
                        从这个角度来看，
                        爱迪生说过一句富有哲理的话，失败也是我需要的，它和成功对我一样有价值。这启发了我，
                        俾斯麦说过一句富有哲理的话，对于不屈不挠的人来说，没有失败这回事。这似乎解答了我的疑惑。
                        达尔文说过一句富有哲理的话，敢于浪费哪怕一个钟头时间的人，说明他还不懂得珍惜生命的全部价值。我希望诸位也能好好地体会这句话。
                        问题的关键究竟为何？
                        生活的意义，发生了会如何，不发生又会如何。 一般来说，
                        在这种困难的抉择下，本人思来想去，寝食难安。
                        这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。
                        要想清楚，生活的意义，到底是一种怎么样的存在。 我认为，
                        可是，即使是这样，生活的意义的出现仍然代表了一定的意义。
                        而这些并不是完全重要，更加重要的问题是，
                        了解清楚生活的意义到底是一种怎么样的存在，是解决一切问题的关键。
                    </div>
                    <div class="mt-20">
                        <el-button v-print="'#article'">打印</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">vue-print-nb 打印表格</div>
                    <div id="table">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="日期"
                                width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                width="180"
                            >
                            </el-table-column>
                            <el-table-column prop="address" label="地址">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="mt-20">
                        <el-button v-print="'#table'">打印</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Print from "@/common/public/print.js";
import print from "vue-print-nb";
export default {
    name: "Print",
    directives: {
        print,
    },
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄",
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄",
                },
            ],
        };
    },
    methods: {
        printElement(ref) {
            Print.action(this.$refs[ref]);
        },
    },
};
</script>

<style>
</style>