<template>
    <div class="alike-container">
        <el-card>
            <el-form :model="form" ref="form" label-width="100px">
                <el-form-item label="用户名称">
                    <el-input
                        v-model="form.username"
                        placeholder="请输入用户名称"
                        :disabled="true"
                    />
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input
                        v-model="form.nickname"
                        placeholder="请输入用户昵称"
                    />
                </el-form-item>
                <el-form-item label="用户头像">
                    <!-- <el-upload
                        class="avatar-uploader"
                        :action="`${baseUrl}/uploadFileCloud`"
                        :show-file-list="false"
                        :multiple="false"
                        :on-success="elUploadAvatar"
                    >
                        <img
                            style="width: 200px; height: 200px"
                            v-if="form.avatar"
                            :src="form.avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                    <uploader
                        :file="form.avatar"
                        @change="changeAvatar"
                        @delete="deleteAvatar"
                    ></uploader>
                </el-form-item>
            </el-form>
            <div class="text-center">
                <el-button
                    type="primary"
                    @click="submit"
                    :loading="isLoadingSubmit"
                    >保 存</el-button
                >
            </div>
        </el-card>
    </div>
</template>

<script>
import uploader from "@/components/uploader.vue";
export default {
    components: { uploader },
    name: "Center",
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            isLoadingSubmit: false,
            form: {
                username: "",
                nickname: "",
                avatar: "",
            },
        };
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            this.$request({
                url: "/user/auth/info",
            })
                .then((res) => {
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }

                    this.form = res.data;
                })
                .catch(() => {});
        },
        submit() {
            this.isLoadingSubmit = true;
            this.$request({
                url: "/user/auth/info",
                method: "PUT",
                data: {
                    username: this.form.username,
                    nickname: this.form.nickname,
                    avatar: this.form.avatar,
                },
            })
                .then((res) => {
                    this.isLoadingSubmit = false;
                    if (res.code != 200) {
                        this.$message.error(res.message);
                        return false;
                    }

                    this.$message.success(res.message);
                    this.$store.dispatch("app/setUserInfo", this.form);
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoadingSubmit = false;
                });
        },
        elUploadAvatar(res) {
            if (res.data.url) {
                this.form.avatar = res.data.url;
            }
        },
        changeAvatar({ file }) {
            this.$uploadFile({
                data: {
                    file,
                },
            })
                .then((res) => {
                    if (res.data.url) {
                        this.form.avatar = res.data.url;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteAvatar() {
            this.form.avatar = "";
        },
    },
};
</script>

<style>
</style>