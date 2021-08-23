<template>
    <div class="alike-container">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">Pikaz 数据导出</div>
                    <el-table :data="tableData1" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>
                    <div class="mt-20">
                        <excel-export :sheet="sheet1" :filename="fileNamePikaz">
                            <el-button>导出</el-button>
                        </excel-export>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">Pikaz 数据导入</div>
                    <el-table :data="tableData2" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>
                    <div class="mt-20">
                        <excel-import :on-success="onSuccessExcelPikaz">
                            <el-button>导入</el-button>
                        </excel-import>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mt-20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">PanJiaChen 数据导出</div>
                    <el-table :data="tableData3" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>
                    <div class="mt-20">
                        <el-button @click="handleExport">导出</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">PanJiaChen 数据导入</div>
                    <uploader-excel
                        :on-success="onSuccessExcel"
                        :before-upload="beforeUploadExcel"
                    />
                    <el-table :data="tableData4" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { ExcelExport, ExcelImport } from "pikaz-excel-js";
import UploaderExcel from "@/components/uploader-excel";
export default {
    name: "Excel",
    components: {
        ExcelExport,
        ExcelImport,
        UploaderExcel,
    },
    data() {
        return {
            fileNamePikaz: "",
            sheet1: [
                {
                    // title: "",   // 导出的数据不进行导入时可设置表头，否则数据导入时需要其它配置
                    tHeader: ["date", "name", "address"],
                    table: [],
                    keys: ["date", "name", "address"],
                    sheetName: "sheet1",
                },
            ],
            tableData1: [
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄",
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄",
                },
            ],
            tableData2: [],
            tableData3: [
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄",
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄",
                },
            ],
            tableData4: [],
        };
    },
    methods: {
        onSuccessExcelPikaz(res, file) {
            console.log("onSuccessExcelPikaz", res);
            this.tableData2 = res[0].data;
        },
        beforeUploadExcel(file) {
            const isLimit1M = file.size > 1024 * 1024 * 1;

            if (isLimit1M) {
                this.$message({
                    message: "上传文件不得大于1M",
                    type: "warning",
                });
                return false;
            }

            // 验证通过必须返回结果，否则不会触发on-success钩子函数
            return true;
        },
        onSuccessExcel({ results, header }) {
            this.tableData4 = [...this.tableData4, ...results];
        },
        handleExport() {
            import("@/common/lib/export2excel").then((excel) => {
                const tHead = ["date", "name", "address"];
                const data = this.JsonToArray(tHead, this.tableData3);
                excel.export_json_to_excel({
                    header: tHead,
                    data,
                    filename: `PanJiaChen_${new Date().getTime()}`,
                    autoWidth: true,
                    bookType: "xlsx",
                });
            });
        },
        JsonToArray(keys, datas) {
            // 语法糖简化回调方法
            // return datas.map((item) =>
            //     keys.map((key) => {
            //         return item[key];
            //     })
            // );

            // 常规写法
            return datas.map((item) => {
                return keys.map((key) => {
                    return item[key];
                });
            });
        },
    },
    watch: {
        tableData1: {
            handler(newVal) {
                this.sheet1[0].table = newVal;
                this.fileNamePikaz = `Pikaz_${new Date().getTime()}`;
                console.log("sheet1", this.sheet1);
            },
            immediate: true,
        },
    },
};
</script>

<style>
</style>