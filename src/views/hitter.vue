<template>
  <div id="hitter">
    <header>
      <el-button type="text" icon="el-icon-arrow-left" @click="handleBack">返回</el-button>
      <span>推荐卡组 & 迷航代打</span>
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

      <div @click="copy('ouhsnus97')" class="copy">
        <img src="../assets/baixi.png">
        WX: ouhsnus97 (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 金牌打手</el-tag>
        <el-tag size="small" effect="dark" type="danger"> 专治赖皮蛇</el-tag>

        <el-dropdown trigger="click">
          <el-button type="warning" size="mini">
            查看他的卡组<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-circle-check"
                              @click.native="handleToDetail('白希', '5图困难通用', '12,20,30,31,38,29')">
              5图困难通用
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check"
                              @click.native="handleToDetail('白希', '10图困难通用', '38,36,43,42,40,30,31,28,27,29,12,20,26')">
              10图困难通用
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check"
                              @click.native="handleToDetail('白希', '12图困难通用', '38,36,43,42,40,30,31,28,27,29,12,20,10,26,25,03')">
              12图困难通用
            </el-dropdown-item>

            <el-dropdown-item icon="el-icon-circle-check"
                              @click.native="handleToDetail('白希', '15图玛提娜', '29,03,11,18,02,19,20,26,25,38,36,42,40,37,30,31,28,27,12,08')">
              15图玛提娜
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check"
                              @click.native="handleToDetail('白希', '15图明凰', '29,03,11,18,02,19,20,26,25,38,36,42,40,43,30,31,28,27,12,10')">
              15图明凰
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div @click="copy('C2022129')" class="copy">
        <img src="../assets/zhuiguang.jpg">
        WX: C2022129 (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 金牌打手</el-tag>
        <el-tag size="small" effect="dark" type="danger"> 重生之合金通天代</el-tag>
      </div>

      <div @click="copy('qq974367827')" class="copy">
        <img src="../assets/dujin.png">
        WX: qq974367827 (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 合金第一猛</el-tag>
        <el-tag size="small" effect="dark" type="danger"> 通天代</el-tag>
        <el-tag size="small" effect="dark" type="danger"> 抖音钢头</el-tag>
      </div>

      <div @click="copy('liguanyu3222')" class="copy">
        <img src="../assets/guanyu.png">
        WX: liguanyu3222 (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 金牌打手</el-tag>
      </div>

      <div @click="copy('Lancer_He')" class="copy">
        <img src="../assets/lancer.png">
        WX: Lancer_He (点击复制)
      </div>
      <div class="tags">
        <el-tag size="small" effect="dark" type=""> 夯技师</el-tag>
        <el-tag size="small" effect="dark" type="danger"> 交易行</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleBack() {
      this.$router.push({path: '/index'})
    },
    handleToDetail(author, name, ids) {
      console.log(ids);
      this.$router.push({
        path: '/detail',
        query: {
          author: author,
          name: name,
          ids: ids
        }
      })
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

.el-button--text {
  color: #fff;
}

.el-button--text span {
  margin: 0;
}

.hiter {
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

img {
  width: 25px;
  height: 25px;
  display: inline-block;
  margin-right: 15px;
}

.tags {
  margin: 6px 0 10px;
  //display: flex;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ccc;
  height: 40px;
}

#hitter .el-dropdown {
  float: right;
}

#hitter .el-dropdown .el-button {
  height: 24px;
  padding: 0 10px;

}

.tags span {
  float: left;
}

.no-border {
  border: 0;
}

.el-tag {
  margin-right: 15px;
}
</style>
