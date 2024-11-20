<template>
  <div id="container">
    <header>
      <el-button type="text" icon="el-icon-arrow-left" @click="handleBack">返回</el-button>
      <span>迷航卡牌模拟器</span>
      <span></span>
    </header>
    <div class="name">
      <el-input v-if="!showTitle" v-model="cardName" placeholder="请输入卡组名称">
        <el-button slot="append" @click="showTitle = true">确认</el-button>
      </el-input>
      <h2 v-if="showTitle" class="title" @click="showTitle = false">{{ cardName }}</h2>
    </div>
    <div class="card-body">
      <div class="card-list"
           v-for="(item, index) in detailCardTreeArray"
           :key="index">
        <div class="card-item">
          <div class="card-name">{{ item[0] }}</div>
          <div class="card-box">
            <img class="card-pic" v-for="(file, findex) in item[1]" :key="index" :src="file">
          </div>
        </div>
      </div>
    </div>
    <div class="desc">
      <p class="str">{{ detailCardTreeStr }}</p>
      <p @click="copy('JNJieni888')" class="copy">迷航代打联系WX: JNJieni888 (点击复制)</p>
      <p @click="copy('C2022129')" class="copy">迷航代打联系WX: C2022129 (点击复制)</p>
<!--      <p @click="copy('yeah852019')" class="copy">迷航代打联系WX: yeah852019 (点击复制)</p>-->
      <p @click="copy('xhk840144874')" class="copy">迷航代打联系WX: xhk840144874 (点击复制)</p>
<!--      <p @click="copy('Frown2024')" class="copy">迷航代打联系WX: Frown2024 (点击复制)</p>-->
<!--      <p @click="copy('hy-Lib-Oct-05')" class="copy">迷航代打联系WX: hy-Lib-Oct-05 (点击复制)</p>-->
<!--      <p @click="copy('Wwq24104177')" class="copy">迷航代打联系WX: Wwq24104177 (点击复制)</p>-->
      <!-- <p @click="copy('Liang-JL18')" class="copy">迷航代打联系WX: Liang-JL18 (点击复制)</p> -->
<!--      <p @click="copy('AprTau-ll')" class="copy">迷航代打联系WX: AprTau-ll (点击复制)</p>-->
      <!-- <p @click="copy('Miss_Fortunes')" class="copy">迷航代打联系WX: Miss_Fortunes (点击复制)</p> -->
    </div>
    <!-- 水印 -->
    <div class="waterMask"></div>
    <!-- 密码验证 -->
    <!-- <div class="password" v-if="!isVip">
      <van-password-input
        :value="value"
        info="密码为 4 位数字"
        :length="4"
        :gutter="15"
        :mask="false"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        safe-area-inset-bottom
      />
    </div> -->
  </div>
</template>

<script>
import MODEL_DATA from '../model/data.js'

const predefinedTypes = [
  "眩晕力场",
  "吸附力场",
  "飞刺力场",
  "辐射力场",
  "魔力祭祀",
  "科学力量",
  "异常专家",
  "通用力场",
  "神灯赐福",
  "超级星推官",
  "流派大师",
  "狂暴丽影",
  "诡秘绅士",
];

export default {
  data() {
    return {
      cardData: MODEL_DATA,
      detailCardTreeArray: [],
      otherCardTreeArray: [],
      cardName: '强盛集团荣誉出品',
      showTitle: false,
      detailCardTree: Object.fromEntries(predefinedTypes.map(type => [type, []])),
      detailCardTreeStr: '',
      // 水印
      drawer: true,
      maskDiv: {}, //当前显示的水印div节点DOM对象
      initProps: {
        inputText: "1949丶迷航代 22丶夯技师", //显示的水印文本
        width: "280", // 单个水印的宽度
        height: "100", // 单个水印的宽度
        fillStyle: "rgb(112, 113, 114, 0.4)", // 水印颜色
        rotateNumber: -10, // 旋转角度
        zIndex: "1", // 水印的层级
      },
      inputAllowDele: false,
      inputDestroy: false,
      // 密码
      // showKeyboard: true,
      // value: '',
      // isVip: false
    }
  },
  created() {
    let query = ''
    let str = ''
    const hash = window.location.hash
    if (hash.includes('?')) {
      str = hash.split('?')[1]
      query = str.split('=')[1].split(',')
      console.log(query)
    }
    if (query.length > 0) {
      this.clacCard(query)
    } else {
      const detailCardTreeArray = window.localStorage.detailCardTreeArray
      if (detailCardTreeArray) {
        this.detailCardTreeArray = JSON.parse(detailCardTreeArray)
        this.detailCardTreeArray.forEach((item) => {
          if (item[1].length > 0) {
            this.detailCardTreeStr += item[1].length + ':' + item[0] + ' '
          }
        })
        this.detailCardTreeArray = this.detailCardTreeArray.filter(item => item[1].length > 0 && !['眩晕力场', '吸附力场', '飞刺力场', '辐射力场', '通用力场'].includes(item[0]))
      }
    }

    // let isVip = window.localStorage.isVip
    // this.isVip = isVip ? isVip : false
  },
  mounted() {
    //确认DOM渲染后再执行
    this.$nextTick(() => {
      //创建水印节点
      this.init();
      if (!this.inputAllowDele) {
        // 设置水印节点修改的DOM事件
        this.Monitor();
      }
    });
  },
  methods: {
    // onInput(key) {
    //   this.value = (this.value + key).slice(0, 4);
    //   const date = new Date()
    //   const hours = date.getHours()
    //   const mins = date.getMinutes() < 10 ?  '0' + date.getMinutes() : date.getMinutes()
    //   const password = hours + '' + mins
    //   if (this.value == password || this.value == '9527') {
    //     this.isVip = true
    //     window.localStorage.isVip = true
    //   }
    // },
    // onDelete() {
    //   this.value = this.value.slice(0, this.value.length - 1);
    // },
    // 卡牌数据处理
    clacCard(query) {
      const cardArray = MODEL_DATA.filter(item => query.includes(item.id))
      console.log(cardArray);
      cardArray.forEach((item) => {
        const [type_1, type_2] = item.types
        // 详情展示数据处理
        if (this.detailCardTree[type_1].includes(item.file)) {
          const index = this.detailCardTree[type_1].findIndex(card => card === item.file)
          this.detailCardTree[type_1].splice(index, 1)
        } else {
          this.detailCardTree[type_1].push(item.file)
        }
        if (this.detailCardTree[type_2].includes(item.file)) {
          const index = this.detailCardTree[type_2].findIndex(card => card === item.file)
          this.detailCardTree[type_2].splice(index, 1)
        } else {
          this.detailCardTree[type_2].push(item.file)
        }
      })
      this.detailCardTreeArray = Object.entries(this.detailCardTree)
      this.detailCardTreeArray.sort((a, b) => b[1].length - a[1].length)
      this.detailCardTreeArray.forEach((item) => {
        if (item[1].length > 0) {
          this.detailCardTreeStr += item[1].length + ':' + item[0] + ' '
        }
      })
      this.detailCardTreeArray = this.detailCardTreeArray.filter(item => item[1].length > 0 && !['眩晕力场', '吸附力场', '飞刺力场', '辐射力场', '通用力场'].includes(item[0]))
    },
    init() {
      let canvas = document.createElement("canvas");
      canvas.id = "canvas";
      canvas.width = this.initProps.width; //单个水印的宽高
      canvas.height = this.initProps.height;
      this.maskDiv = document.createElement("div");
      let ctx = canvas.getContext("2d");
      ctx.font = "normal 18px Microsoft Yahei"; //设置样式
      ctx.fillStyle = this.initProps.fillStyle; //水印字体颜色
      ctx.rotate((this.initProps.rotateNumber * Math.PI) / 180); //水印偏转角度
      //  第二个参数 下移 的参数
      ctx.fillText(this.initProps.inputText, 0, 100);

      let src = canvas.toDataURL("image/png");
      this.maskDiv.style.position = "fixed";
      this.maskDiv.style.zIndex = this.initProps.zIndex; //  水印的层级
      this.maskDiv.id = "_waterMark";
      this.maskDiv.style.top = "0";
      this.maskDiv.style.left = "0";
      this.maskDiv.style.width = "100%";
      this.maskDiv.style.height = "100%";
      this.maskDiv.style.pointerEvents = "none";
      this.maskDiv.style.backgroundImage = "URL(" + src + ")";
      document.getElementsByClassName("waterMask")[0].appendChild(this.maskDiv);
      // 水印节点插到body下
      // document.body.appendChild(this.maskDiv)
    },
    Monitor() {
      let body = document.getElementsByClassName("waterMask")[0];
      let options = {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true,
      };
      let observer = new MutationObserver(this.callback);
      observer.observe(body, options); //监听父节点， 强制删除则重新创建
    },
    //DOM改变执行callback
    callback(mutations, observer) {
      //当attribute属性被修改
      if (mutations[0].target.id === "_waterMark") {
        this.removeMaskDiv();
      }
      //当id被改变时
      if (mutations[0].attributeName === "id") {
        this.removeMaskDiv();
        this.init();
      }
      //当节点被删除
      if (
          mutations[0].removedNodes[0] &&
          mutations[0].removedNodes[0].id === "_waterMark"
      ) {
        this.init();
      }
    },
    handleBack() {
      this.$router.push({path: '/index'})
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
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  background: #fff;
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

.name {
  width: 100%;
  padding: 10px;
  position: relative;
  z-index: 100;
}

.title {
  font-size: 20px;
  line-height: 20px;
  color: red;
}

.el-input {
  width: 100%;
}

.card-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 5px;
}

.card-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.card-name {
  flex-shrink: 0;
  width: 15px;
  height: 85px;
  font-size: 14px;
  line-height: 15px;
  color: red;
  margin-right: 5px;
}

.card-box {
  display: flex;
  flex-wrap: wrap;
}

.card-pic {
  width: 56px;
  height: 85px;
  margin-right: 3px;
  display: inline-block;
}

.desc {
  margin-top: 10px;
  font-weight: bold;
  line-height: 20px;
  text-align: left;
}

.desc .str {
  font-size: 15px;
  color: red;
  padding: 0 25px;
}

.desc .copy {
  padding-left: 25px;
  margin-top: 7px;
  font-size: 17px;
  z-index: 10;
  position: relative;
  color: #409EFF;
}

.waterMask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
}

/* .password{
  padding-top: 180px;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
}
.password .van-password-input__security li{
  border: 1px solid #ddd;
} */

</style>
