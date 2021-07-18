<template>
    <div class="login-page">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">{{ $t("login.title") }}</h3>
            </div>

            <el-form-item prop="username">
                <!-- <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span> -->
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
                />
            </el-form-item>

            <el-form-item prop="password">
                <!-- <span class="svg-container">
                <svg-icon icon-class="password" />
                </span> -->
                <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="Password"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin"
                />
                <!-- <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span> -->
            </el-form-item>

            <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="handleLogin"
                >{{ $t("login.buttonText") }}</el-button
            >

            <div class="tips">
                {{ $t("login.tips") }}
            </div>
        </el-form>

        <div class="select-language">
            <span>{{ $t("login.language") }}：</span>
            <el-dropdown trigger="click" @command="changeLanguage">
                <span class="el-dropdown-link">
                    {{ language }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(item, index) in languages"
                        :key="index"
                        :command="index"
                        >{{ item.name }}</el-dropdown-item
                    >
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
// import { validUsername } from "@/common/validator.js";
export default {
    name: "Login",
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value.length) {
                callback(new Error("请输入用户名称"));
            } else if (value.length < 2) {
                callback(new Error("用户名称不得少于2个字符"));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (!value.length) {
                callback(new Error("请输入密码"));
            } else if (value.length < 6) {
                callback(new Error("密码不得少于6位"));
            } else {
                callback();
            }
        };

        return {
            language: "Chinese",
            languages: [
                {
                    name: "Chinese",
                    label: "中文",
                    locale: "zh",
                },
                {
                    name: "English",
                    label: "英文",
                    locale: "en",
                },
            ],
            loginForm: {
                username: "admin",
                password: "111111",
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername,
                    },
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePassword,
                    },
                ],
            },
            loading: false,
            passwordType: "password",
            redirect: null,
        };
    },
    methods: {
        changeLanguage(command) {
            this.language = this.languages[command].name;
            this.$i18n.locale = this.languages[command].locale;
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.$request({
                        method: "POST",
                        url: "/login",
                        data: this.loginForm,
                    })
                        .then((res) => {
                            this.loading = false;
                            console.log(res);
                            if (res.code != 200) {
                                this.$message({
                                    type: "error",
                                    message: res.message,
                                });
                                return false;
                            }

                            this.$cookie.set("token", res.data.token);
                            this.$router.push({
                                name: "Dashboard",
                            });
                        })
                        .catch((err) => {
                            this.loading = false;
                            console.log(err);
                        });
                } else {
                    this.$message({
                        type: "error",
                        message: valid,
                    });
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-page .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-page {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-page {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
.select-language {
    font-size: 16px;
    color: #ffffff;
    position: absolute;
    top: 30px;
    right: 30px;
}
.select-language .el-dropdown {
    color: #ffffff;
    cursor: pointer;
}
</style>