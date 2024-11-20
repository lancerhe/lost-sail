<template>
  <div id="hitter">
    <header>
      <el-button type="text" icon="el-icon-arrow-left" @click="handleBack">返回</el-button>
      <span>迷航代打联系微信</span>
      <span></span>
    </header>

    <div v-for="(item, index) in 1" :key="index" class="hiter">
      <!-- <div @click="copy('W-K-YYDS')" class="copy">
        <img src="../assets/wk.jpg">
        WX: W-K-YYDS (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 金牌打手 </el-tag>
        <el-tag size="small" effect="dark" type=""> 只接彩金 </el-tag>
        <el-tag size="small" effect="dark" type="warning"> 飞碟杀手 </el-tag>
        <el-tag size="small" effect="dark" type="danger"> 通天代 </el-tag>
      </div> -->

      <div @click="copy('JNJieni888')" class="copy">
        <img src="../assets/jieni.jpg">
        WX: JNJieni888 (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 金牌打手 </el-tag>
        <el-tag size="small" effect="dark" type=""> 合金科学家 </el-tag>
        <el-tag size="small" effect="dark" type="danger"> 通天代 </el-tag>
        <el-tag size="small" effect="dark" type="danger"> 代抢机芯宝石 </el-tag>
      </div>

      <div @click="copy('C2022129')" class="copy">
        <img src="../assets/zhuiguang.jpg">
        WX: C2022129 (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 金牌打手 </el-tag>
        <el-tag size="small" effect="dark" type="danger"> 重生之合金通天代 </el-tag>
      </div>

<!--      <div @click="copy('yeah852019')" class="copy">-->
<!--        <img src="../assets/geli.jpg">-->
<!--        WX: yeah852019 (点击复制)-->
<!--      </div>-->
<!--      <div class="tags">-->
<!--        <el-tag size="small" effect="dark" type=""> 金牌打手 </el-tag>-->
<!--        <el-tag size="small" effect="dark" type=""> 只接彩金 </el-tag>-->
<!--        <el-tag size="small" effect="dark" type="danger"> 通天代 </el-tag>-->
<!--      </div>-->


      <!-- <div @click="copy('lovesthecorner')" class="copy">
        <img src="../assets/erdaye.jpg">
        WX: lovesthecorner (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 馒头林帅云哲师傅 </el-tag>
        <el-tag size="small" effect="dark" type="danger"> 通天代 </el-tag>
        <el-tag size="small" effect="dark" type="danger"> 国服第一代 </el-tag>
      </div> -->


      <div @click="copy('xhk840144874')" class="copy">
        <img src="../assets/bai.jpg">
        WX: xhk840144874 (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 金牌打手 </el-tag>
        <el-tag size="small" effect="dark" type="danger"> 通天代 </el-tag>
      </div>


<!--      <div @click="copy('Frown2024')" class="copy">-->
<!--        <img src="../assets/wuge.jpg">-->
<!--        WX: Frown2024 (点击复制)-->
<!--      </div>-->
<!--      <div class="tags">-->
<!--        <el-tag size="small" effect="dark" type=""> 金牌打手 </el-tag>-->
<!--        <el-tag size="small" effect="dark" type="danger"> 通天代 </el-tag>-->
<!--      </div>-->


<!--      <div @click="copy('Wwq24104177')" class="copy">-->
<!--        <img src="../assets/ttd.jpg">-->
<!--        WX: Wwq24104177 (点击复制)-->
<!--      </div>-->
<!--      <div class="tags">-->
<!--        <el-tag size="small" effect="dark" type=""> 金牌打手 </el-tag>-->
<!--        <el-tag size="small" effect="dark" type=""> IOS </el-tag>-->
<!--        <el-tag size="small" effect="dark" type="danger"> 真 * 通天代 </el-tag>-->
<!--      </div>-->

<!--      <div @click="copy('hy-Lib-Oct-05')" class="copy">-->
<!--        <img src="../assets/laobiao.jpg">-->
<!--        WX: hy-Lib-Oct-05 (点击复制)-->
<!--      </div>-->
<!--      <div class="tags">-->
<!--        <el-tag size="small" effect="dark" type=""> 金牌打手 </el-tag>-->
<!--        <el-tag size="small" effect="dark" type="danger"> 通天代 </el-tag>-->
<!--      </div>-->


      <!-- <div @click="copy('Liang-JL18')" class="copy">
        <img src="../assets/boss.jpg">
        WX: Liang-JL18 (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 金牌打手 </el-tag>
        <el-tag size="small" effect="dark" type=""> 卡关高手 </el-tag>
        <el-tag size="small" effect="dark" type="danger"> 无敌大魔王 </el-tag>
      </div> -->


<!--      <div @click="copy('AprTau-ll')" class="copy">-->
<!--        <img src="../assets/taidu.jpg">-->
<!--        WX: AprTau-ll (点击复制)-->
<!--      </div>-->
<!--      <div class="tags">-->
<!--        <el-tag size="small" effect="dark" type=""> 国服第一 </el-tag>-->
<!--        <el-tag size="small" effect="dark" type="danger"> 小代 </el-tag>-->
<!--      </div>-->


      <!-- <div @click="copy('Miss_Fortunes')" class="copy">
        <img src="../assets/mihangdai.jpg">
        WX: Miss_Fortunes (点击复制)
      </div>
      <div class="tags no-border">
        <el-tag size="small" effect="dark" type=""> 只接彩金 </el-tag>
        <el-tag size="small" effect="dark" type=""> IOS 安卓双端 </el-tag>
        <el-tag size="small" effect="dark" type="danger"> 晚间活跃 </el-tag>
      </div> -->
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
img{
  width: 25px;
  height: 25px;
  display: inline-block;
  margin-right: 15px;
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
