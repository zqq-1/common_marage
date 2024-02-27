<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container style="height: 100vh;">
        <el-header>
          <CommonHeaderVue></CommonHeaderVue>
        </el-header>
        <CommonTagsVue></CommonTagsVue>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeaderVue from "@/components/CommonHeader.vue";
import CommonTagsVue from '@/components/CommonTags.vue';
export default {
  name: "Main",
  data() {
    return {};
  },
  methods: {},
  components: {
    CommonAside,
    CommonHeaderVue,
    CommonTagsVue
  },
};
</script>
<style lang="less" scoped>
.el-header {
  padding: 0;
}
.el-aside {
  height: 100vh;
}
</style>