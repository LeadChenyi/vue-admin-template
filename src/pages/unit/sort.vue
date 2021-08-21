<template>
    <div class="alike-container p-20">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <div slot="header">vuedraggable 单列拖拽</div>
                    <draggable
                        v-model="sorts1"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <div
                            class="sort-item"
                            v-for="item in sorts1"
                            :key="item.id"
                        >
                            {{ item.name }}
                        </div>
                    </draggable>
                    <div class="mt-20">
                        <el-button @click="showSortData(sorts1)"
                            >显示最终排序</el-button
                        >
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">vuedraggable 指定拖拽元素类</div>
                    <draggable
                        v-model="sorts2"
                        @start="drag = true"
                        @end="drag = false"
                        draggable=".sort-item"
                    >
                        <div
                            class="sort-item"
                            v-for="item in sorts2"
                            :key="item.id"
                        >
                            {{ item.name }}
                        </div>
                    </draggable>
                    <div class="mt-20">
                        <el-button @click="showSortData(sorts2)"
                            >显示最终排序</el-button
                        >
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">vuedraggable animation默认动画</div>
                    <draggable
                        v-model="sorts3"
                        @start="drag = true"
                        @end="drag = false"
                        animation="1000"
                    >
                        <transition-group>
                            <div
                                class="sort-item"
                                v-for="item in sorts3"
                                :key="item.id"
                            >
                                {{ item.name }}
                            </div>
                        </transition-group>
                    </draggable>
                    <div class="mt-20">
                        <el-button @click="showSortData(sorts3)"
                            >显示最终排序</el-button
                        >
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">
                        vuedraggable transition-group自定义动画
                    </div>
                    <draggable
                        v-model="sorts4"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <transition-group
                            type="transition"
                            :name="'ani-draggable'"
                        >
                            <div
                                class="sort-item"
                                v-for="item in sorts4"
                                :key="item.id"
                            >
                                {{ item.name }}
                            </div>
                        </transition-group>
                    </draggable>
                    <div class="mt-20">
                        <el-button @click="showSortData(sorts4)"
                            >显示最终排序</el-button
                        >
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mt-20">
            <el-col :span="6">
                <el-card>
                    <div slot="header">vuedraggable 多列互相拖拽(ROOM1-A)</div>
                    <draggable
                        class="sort-wrap"
                        v-model="sorts5"
                        group="ROOM1"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <div
                            class="sort-item"
                            v-for="item in sorts5"
                            :key="item.id"
                        >
                            {{ item.name }}
                        </div>
                    </draggable>
                    <div class="mt-20">
                        <el-button @click="showSortData(sorts5)"
                            >显示最终排序</el-button
                        >
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">vuedraggable 多列互相拖拽(ROOM1-B)</div>
                    <draggable
                        class="sort-wrap"
                        v-model="sorts6"
                        group="ROOM1"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <div
                            class="sort-item"
                            v-for="item in sorts6"
                            :key="item.id"
                        >
                            {{ item.name }}
                        </div>
                    </draggable>
                    <div class="mt-20">
                        <el-button @click="showSortData(sorts6)"
                            >显示最终排序</el-button
                        >
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">vuedraggable 多列单项拖拽(ROOM2-A)</div>
                    <draggable
                        class="sort-wrap"
                        v-model="sorts7"
                        :group="{ name: 'ROOM2', pull: 'clone', put: false }"
                        :sort="false"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <div
                            class="sort-item"
                            v-for="item in sorts7"
                            :key="item.id"
                        >
                            {{ item.name }}
                        </div>
                    </draggable>
                    <div class="mt-20">
                        <el-button @click="showSortData(sorts7)"
                            >显示最终排序</el-button
                        >
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">vuedraggable 多列单项拖拽(ROOM2-B)</div>
                    <draggable
                        class="sort-wrap"
                        v-model="sorts8"
                        :group="{ name: 'ROOM2', pull: false, put: true }"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <div
                            class="sort-item"
                            v-for="item in sorts8"
                            :key="item.id"
                        >
                            {{ item.name }}
                        </div>
                    </draggable>
                    <div class="mt-20">
                        <el-button @click="showSortData(sorts8)"
                            >显示最终排序</el-button
                        >
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: "Sort",
    components: {
        draggable,
    },
    data() {
        return {
            sorts1: [
                { id: 1, name: "P1 Item 1" },
                { id: 2, name: "P1 Item 2" },
                { id: 3, name: "P1 Item 3" },
            ],
            sorts2: [
                { id: 1, name: "P2 Item 1" },
                { id: 2, name: "P2 Item 2" },
                { id: 3, name: "P2 Item 3" },
            ],
            sorts3: [
                { id: 1, name: "P3 Item 1" },
                { id: 2, name: "P3 Item 2" },
                { id: 3, name: "P3 Item 3" },
            ],
            sorts4: [
                { id: 1, name: "P4 Item 1" },
                { id: 2, name: "P4 Item 2" },
                { id: 3, name: "P4 Item 3" },
            ],
            sorts5: [
                { id: 1, name: "ROOM1 Item 1" },
                { id: 2, name: "ROOM1 Item 2" },
                { id: 3, name: "ROOM1 Item 3" },
                { id: 4, name: "ROOM1 Item 4" },
                { id: 5, name: "ROOM1 Item 5" },
                { id: 6, name: "ROOM1 Item 6" },
            ],
            sorts6: [],
            sorts7: [
                { id: 1, name: "ROOM2 Item 1" },
                { id: 2, name: "ROOM2 Item 2" },
                { id: 3, name: "ROOM2 Item 3" },
                { id: 4, name: "ROOM2 Item 4" },
                { id: 5, name: "ROOM2 Item 5" },
                { id: 6, name: "ROOM2 Item 6" },
            ],
            sorts8: [],
        };
    },
    methods: {
        showSortData(value) {
            this.$msgbox({
                title: "最终排序结果",
                message: JSON.stringify(value),
            })
                .then()
                .catch();
        },
    },
};
</script>

<style scoped>
.ani-draggable-move {
    transition: transform 0.5s;
}
.sort-wrap {
    min-height: 300px;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(50, 192, 109, 0.7);
    background-color: #f8f8f8;
    border-radius: 2px;
}
.sort-item {
    font-size: 15px;
    color: #333333;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    background-color: #ffffff;
    margin-bottom: -1px;
    cursor: move;
}
.sort-item[draggable="true"] {
    color: rgba(21, 136, 244, 0.3);
    border-color: rgba(21, 136, 244, 0.7);
}
</style>