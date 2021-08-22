<template>
    <div class="alike-container p-20">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <div slot="header">数据导出</div>
                    <el-table :data="tableData1" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>
                    <div>
                        <excel-export :sheet="sheet1" filename="登记表">
                            <div>导出</div>
                        </excel-export>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header">数据导出</div>
                    <el-table :data="tableData2" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                    </el-table>
                    <div>
                        <excel-import :on-success="onSuccessExcelImport">
                            <div>导入</div>
                        </excel-import>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { ExcelExport, ExcelImport } from "pikaz-excel-js";
export default {
    name: "Excel",
    components: {
        ExcelExport,
        ExcelImport,
    },
    data() {
        return {
            sheet1: [
                {
                    title: "水果的味道",
                    tHeader: ["荔枝", "柠檬"],
                    table: [{ litchi: "甜", lemon: "酸" }],
                    keys: ["litchi", "lemon"],
                    sheetName: "水果的味道",
                },
            ],
            tableData1: [
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
            tableData2: [],
        };
    },
    methods: {
        onSuccessExcelImport(data, file) {
            console.log(data);
            // this.tableData2 = data;
        },
    },
};
</script>

<style>
</style>