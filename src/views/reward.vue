<template>
  <div id="hitter">
    <header>
      <el-button type="text" icon="el-icon-arrow-left" @click="handleBack">返回</el-button>
      <span>赞助支持</span>
      <span></span>
    </header>

    <div style="margin-top: 20%">
      <img style="width: 80%" src="../assets/rewards.png">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleBack() {
      this.$router.push({ path: '/index' })
    },
    // 检测是否iOS端
    iosAgent() {
      return navigator.userAgent.match(/(iPhone|iPod|iPad);?/i);
    },

    // 复制文本函数，微信端，需要在用户触发 Click 事件里面才能执行成功
    copy(wx) {
      if (this.iosAgent()) {
        let inputObj = document.createElement("input");
        inputObj.value = wx
        document.body.appendChild(inputObj);
        inputObj.select();
        inputObj.setSelectionRange(0, inputObj.value.length);
        this._execCommand("Copy", wx);
        document.body.removeChild(inputObj);
      } else {
        let domObj = document.createElement("span");
        domObj.innerHTML = wx
        document.body.appendChild(domObj);
        let selection = window.getSelection();
        let range = document.createRange();
        range.selectNodeContents(domObj);
        selection.removeAllRanges();
        selection.addRange(range);
        this._execCommand("Copy", wx);
        document.body.removeChild(domObj);
      }
    },

    // 执行浏览器命令 Copy 顺便输出一下日志，如果在移动端推荐写个方法展示日志或者用alert(msg)也行。
    _execCommand(action, wx) {
      let is = document.execCommand(action);
      if (is) {
        this.$message({
          showClose: true,
          message: `复制微信 ${wx} 成功`,
          type: "success",
        });
      } else {
        console.log("复制失败");
      }
    }
  },
};
</script>

<style scoped lang="less">
#hitter {
  width: 100%;
  height: 100%;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #409eff;
  color: #fff;
  padding: 6px 10px;
  font-size: 16px;
  position: relative;
  z-index: 100;
}
.el-button--text{
  color:#fff;
}
.el-button--text span{
  margin: 0;
}
.hiter{
  margin-top: 10px;
}
.copy {
  margin-top: 10px;
  padding-left: 30px;
  font-size: 17px;
  z-index: 10;
  position: relative;
  color: #409EFF;
  text-align: left;
  display: flex;
  align-items: center;
}
.tags{
  margin: 6px 0 10px;
  display: flex;
  padding-left: 30px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ccc;
}
.no-border{
  border: 0;
}
.el-tag{
  margin-right: 15px;
}
</style>
