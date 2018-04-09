<template>
    <div>

        <el-row>
            <!--左空白-->
            <el-col :span="6">
                <div>&nbsp;</div>
            </el-col>

            <!--中间区域-->
            <el-col :span="12">
                <div class="login-text page-font">登录</div>

                <div>

                </div>
                <el-form :label-position="labelPosition" label-width="80px" :model="user">
                    <el-form-item label="账号" class="page-font">
                        <el-input v-model="number"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" class="page-font">
                        <el-input v-model="password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login-btn" @click="login">登录</el-button>
                    </el-form-item>
                    <el-form-item class="page-font">
                        忘记密码？<span> <router-link to="">找回</router-link></span>
                    </el-form-item>

                </el-form>
            </el-col>
            <!--右空白-->
            <el-col :span="6">
                <div>&nbsp;</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import store from "../vuex/store";

    export default {
        name: "Login",
        data() {
            return {
                labelPosition: 'right',
                number: '',
                password: ''

            }
        },
        methods: {
            login: function () {
                if (this.user.number === '' && this.user.password === '') {
                    // 提示账号错误
                    this.$message({
                        message: '账号或密码不能为空！',
                        type: 'warning'
                    });
                    return;
                } else {
                    this.$http.post('user/teacher/login', {
                            username: this.number,
                            password: this.password
                        },
                        {emulateJSON: true}).then(res => {
                        console.log(res);
                        // 存储信息
                        if (res.data.code === 200) {
                            window.localStorage.setItem(
                                "user",
                                JSON.stringify(res.data.data)
                            )
                        }
                        store.dispatch("login");
                        this.$message('登录成功');
                        this.$router.push('index')
                    }).catch(err => {
                        console.log(err)
                        this.$message({
                            message: '账号或密码不正确！',
                            type: 'warning'
                        });
                    })
                }

                // axios


            }
        },
        computed: {
            user() {
                return JSON.parse(window.localStorage.getItem("user") || "[]")
            }
        },
        
    }
</script>

<style scoped>
    .login-text {
        font-size: 20px;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 20px;
    }

    .page-font {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

    }

    .login-btn {
        width: 100%;
    }


</style>