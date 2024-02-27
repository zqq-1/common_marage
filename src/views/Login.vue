<template>
  <div class="login">
    <el-form
      ref="form"
      label-width="70px"
      :model="loginForm"
      :rules="rules"
      inline
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input
          placeholder="请输入用户名"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary" style="margin-left: 70px"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "@/api/index.js";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.loginForm).then((res) => {
            if (res.data.code === 20000) {
              // token
              const token = res.data.data.token;
              Cookie.set("token", token);
              // 菜单数据，存入store中
              this.$store.commit('setMenu',res.data.data.menu)
              this.$store.commit('addMenu',this.$router)
              // 跳转到首页
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  padding: 35px 35px 15px 35px;
  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505456;
  }
  .el-input {
    width: 250px;
  }
}
</style>