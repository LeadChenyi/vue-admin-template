<template>
    <div class="alike-drawer-setting">
        <el-form ref="formSetting" label-position="left" label-width="100px">
            <el-form-item label="更换主题">
                <el-color-picker
                    v-model="themeColor"
                    @change="changeColor"
                ></el-color-picker>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import theme from "@/mixins/theme.js";
export default {
    name: "alike-drawer-setting",
    mixins: [theme],
    mounted() {
        this.syncThemeColor(true);
    },
};
</script>

<style>
</style>