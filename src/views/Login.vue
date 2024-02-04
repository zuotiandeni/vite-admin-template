<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const route = useRoute()
const router = useRouter()
/*

    账号密码 start
*/
interface RuleForm {
    userName: string
    password: string
}
const rules = reactive<FormRules<RuleForm>>({
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const ruleForm = reactive<RuleForm>({
    userName: '',
    password: ''
})
const ruleFormRef = ref<FormInstance>()

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            sessionStorage.setItem('token', 'sdsda4dw165489')
            if (route.params.redirect) {
                router.push({
                    path: route.params.redirect as string
                })
            } else {
                router.push({
                    path: '/'
                })
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

/*

    账号密码 end
*/
</script>

<template>
    <div class="login-box">
        <div class="login-box-title">
            <el-button class="login-button">登录</el-button>
            <el-button class="register-button">注册</el-button>
        </div>
        <div class="login-box-center">
            <div class="login-box-center-header">登录系统</div>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="0"
                class="login-ruleForm"
            >
                <el-form-item prop="userName">
                    <el-input placeholder="用户名" v-model="ruleForm.userName" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" show-password v-model="ruleForm.password" />
                </el-form-item>
                <el-form-item class="login-ruleForm-bts">
                    <el-button type="primary" @click="submitForm(ruleFormRef)"> 登录 </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="login-box-footer">Copyright &copy; 2024 lcy. All rights reserved.</div>
    </div>
</template>
<style scoped lang="scss">
.login-box {
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-image: url('@/assets/login-bg.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    &-title {
        width: 100%;
        text-align: right;
        line-height: 96px;

        .login-button {
            background-color: #fb7299;
            color: #fff;
            border: none;
            border-radius: 0;

            &:hover {
                opacity: 0.9;
            }
        }

        .register-button {
            color: #fff;
            border-radius: 0;
            background-color: transparent;

            &:hover {
                opacity: 0.9;
            }
        }
    }
    &-center {
        width: 700px;
        height: 360px;
        background-color: rgba($color: #223147, $alpha: 0.9);
        padding: 0 32px;
        margin-top: -112px;
        &-header {
            margin: 36px 0;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            color: #fff;
        }

        .login-ruleForm {
            ::v-deep(.el-input__wrapper) {
                background-color: transparent;
                box-shadow: none;
                border-bottom: 1px solid #fff;
                border-radius: 0;

                .el-input__inner {
                    color: #ffffff;
                }

                input::placeholder {
                    color: #ffffff;
                }
                /* 设置input自动填充的背景及字体色 */
                input:-webkit-autofill,
                textarea:-webkit-autofill,
                select:-webkit-autofill {
                    -webkit-text-fill-color: #fff;
                    transition: background-color 5000s ease-in-out 0s;
                    caret-color: #fff;
                    border: 0;
                    border-radius: 0;
                }
            }
            &-bts {
                margin-top: 32px;
                ::v-deep(.el-form-item__content) {
                    justify-content: center;

                    .el-button {
                        width: 100%;
                        background-color: #fff;
                        color: #000;
                        border-radius: 0;
                        font-weight: 400;

                        &:hover {
                            opacity: 0.9;
                        }
                    }
                }
            }
        }
    }

    &-footer {
        color: #fff;
    }
}
</style>
