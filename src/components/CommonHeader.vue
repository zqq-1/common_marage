<template>
  <div class="header-content">
    <div class="l-content">
      <el-button
        @click="handerMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="logout">
        <span class="el-dropdown-link">
          <img class="tou" src="../assets/images/tuo.jpeg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  name: "xxx",
  data() {
    return {};
  },
  methods: {
    handerMenu() {
      this.$store.commit("collapseMenu");
    },
    logout(command) {
      if (command == "logout") {
        Cookie.remove("token");
        Cookie.remove("menu");
        this.$router.push("/login");
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>
<style lang="less" scoped>
.header-content {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .l-content {
    display: flex;
    align-items: center;
    .el-breadcrumb {
      margin-left: 20px;
    }
    /deep/ .el-breadcrumb__item {
      .el-breadcrumb__inner {
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
  .r-content {
    .tou {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>