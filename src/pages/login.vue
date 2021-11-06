<template>
    <div class="login-page">
        <img
            class="login-backdrop"
            src="@/assets/image/backdrop/backdrop_9.jpg"
            alt=""
        />

        <el-form
            ref="loginForm"
            class="login-form"
            :model="loginForm"
            :rules="loginRules"
            auto-complete="on"
            label-position="left"
        >
            <div class="login-form-header">
                <h3 class="title">{{ $t("login.title") }}</h3>
            </div>

            <el-form-item prop="username">
                <!-- <span class="login-form-icon"></span> -->
                <el-input
                    v-model="loginForm.username"
                    type="text"
                    placeholder="请输入用户名称"
                    tabindex="1"
                    auto-complete="on"
                />
            </el-form-item>

            <el-form-item prop="password">
                <!-- <span class="login-form-icon"></span> -->
                <el-input
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="请输入用户密码"
                    tabindex="2"
                    auto-complete="on"
                />
                <!-- <span class="login-form-pwd"></span> -->
            </el-form-item>
            <el-form-item prop="captcha">
                <div
                    ref="svgCaptcha"
                    class="login-svg-captcha"
                    @click="getCaptcha"
                ></div>
                <el-input
                    v-model="loginForm.captcha"
                    type="text"
                    placeholder="请输入验证码"
                    tabindex="3"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin"
                />
            </el-form-item>

            <el-button
                class="login-form-submit"
                :loading="loading"
                type="primary"
                @click.native.prevent="handleLogin"
                >{{ $t("login.buttonText") }}</el-button
            >

            <!-- <div class="login-form-tips">
                {{ $t("login.tips") }}
            </div> -->
        </el-form>

        <div class="select-language">
            <span>{{ $t("login.language") }}：</span>
            <el-dropdown trigger="click" @command="changeLanguage">
                <span class="el-dropdown-link">
                    {{ languageLabel === "Chinese" ? "中文" : languageLabel }}
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
export default {
    name: "Login",
    data() {
        return {
            languageLabel: "Chinese",
            languages: [
                {
                    name: "Chinese",
                    locale: "zh",
                },
                {
                    name: "English",
                    locale: "en",
                },
            ],
            loginForm: {
                mobile: "",
                username: "此言很差矣",
                password: "123456",
                captcha: "",
            },
            loginRules: {
                username: [
                    {
                        label: "用户名称",
                        required: true,
                        trigger: "blur",
                        validator: this.$validation.isUsername,
                    },
                ],
                password: [
                    {
                        label: "密码",
                        required: true,
                        trigger: "blur",
                        validator: this.$validation.isPassword,
                    },
                ],
                captcha: [
                    {
                        label: "验证码",
                        required: true,
                        trigger: "blur",
                        message: "验证码不能为空",
                    },
                ],
            },
            loading: false,
            passwordType: "password",
            redirect: null,
        };
    },
    mounted() {
        this.getCaptcha();
    },
    methods: {
        changeLanguage(command) {
            this.languageLabel = this.languages[command].name;
            this.$i18n.locale = this.languages[command].locale;
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.$request({
                        method: "POST",
                        url: "/user/login",
                        data: this.loginForm,
                    })
                        .then((res) => {
                            this.loading = false;

                            if (res.statusCode != 200) {
                                this.$message({
                                    type: "error",
                                    message: res.message,
                                });
                                return false;
                            }

                            this.$message({
                                type: "success",
                                message: res.message,
                            });

                            // js-cookie自定义有效期只接收时间对象（有效期以秒为单位）
                            const seconds = new Date(
                                new Date().getTime() + res.data.expiresIn * 1000
                            );
                            this.$cookie.set(
                                "webyi_jwt_token",
                                res.data.token,
                                { expires: seconds }
                            );
                            this.$router.push({
                                name: "Dashboard",
                            });
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                }
            });
        },
        getCaptcha() {
            this.$request({
                url: "/getCaptcha",
            })
                .then((res) => {
                    this.$refs.svgCaptcha.innerHTML = res.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.login-page {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #283553;

    .login-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        color: #454545;

        ::v-deep .el-form-item__content {
            line-height: initial;
        }
    }

    .el-input {
        display: inline-block;
        height: 47px;
        // width: 85%;  // 图标切换占位
        width: 100%;

        ::v-deep input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #ffffff;
            height: 47px;
            caret-color: #ffffff;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px #283553 inset !important;
                -webkit-text-fill-color: #ffffff !important;
            }
        }
    }

    .login-form {
        width: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .login-form-header {
        position: relative;

        .title {
            font-size: 26px;
            color: #ffffff;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .login-form-icon {
        padding: 6px 5px 6px 15px;
        color: #889889;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .login-form-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #889889;
        cursor: pointer;
        user-select: none;
    }

    .login-svg-captcha {
        display: inline-block;
        width: 150px;
        height: 45px;
        border-radius: 2px;
        margin-top: 2px;
        margin-left: 2px;
        padding: 0;
        overflow: hidden;
    }

    .login-svg-captcha + .el-input {
        width: calc(100% - 152px);
        vertical-align: top;
    }

    .login-form-submit {
        width: 100%;
        margin-bottom: 30px;
    }

    .login-form-tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .select-language {
        font-size: 16px;
        color: #ffffff;
        position: absolute;
        top: 30px;
        right: 30px;

        .el-dropdown {
            color: #ffffff;
            cursor: pointer;
        }
    }
}

@media only screen and (max-width: 550px) {
    .login-form {
        width: calc(100vw - 60px) !important;
    }
}
</style>