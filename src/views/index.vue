<template>
  <div class="home">
    <div class="contariner">
      <ul class="card-nav">
        <li
          v-for="(item, index) in cardCategories"
          :key="index"
          :class="{ active: navActiveIndex == index }"
          @click="checkCategory(item, index)"
        >
          {{ item }}
        </li>
        <li>已选：{{ allCardArray.length }} 张</li>
        <li @click="handleHitter" class="reset">迷航代打+V</li>
        <li @click="viewCardDesc" class="desc">卡组特效</li>
        <li @click="handleClear" class="reset">重置卡牌</li>
        <li @click="handleToDetail" class="view">生成卡组</li>
        <li @click="handleHitter" class="reset">迷航代打</li>
        <li @click="handleHitter" class="reset">迷航代打</li>
      </ul>

      <!-- <div class="collapse" @click="handleCollapse()">
        <span>折叠卡牌：</span>
        <i class="el-icon-arrow-right"></i>
      </div> -->

      <div class="card-list" ref="cardList">
        <div
          v-for="(item, index) in curCardData"
          :class="getActiveStatus(item.name)"
          :key="index"
          @click="checkCard(item)"
        >
          <img
            class="card-img"
            :src="item.file"
            :alt="item.name + ' 图片加载失败，请联系22区夯技师'"
          />
        </div>
      </div>

      <div class="card-tree">
        <div v-for="(item, index) in cardTreeArray" :key="index">
          <div
            class="tree-body"
            v-if="item[1].length > 0"
            :class="getMoelColor(item[0], item[1].length)"
          >
            <div class="tree-num">{{ item[1].length }}</div>
            <div class="tree-desc">
              <span class="name">{{ item[0] }}</span>
              <div class="model">
                <!-- <span>{{ cardMoel[item[0]].join(' < ') + ' : '}}</span> -->
                <span v-for="(card, index) in item[1]" :key="index"
                  >{{ card }}
                  <span v-if="index != item[1].length - 1">-</span>
                </span>
              </div>
              <!-- <div class="text">
                {{ getGroupText(item[0], item[1].length) }}
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 水印 -->
    <div class="waterMask"></div>
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
  name: 'HomeView',
  data() {
    return {
      cardData: MODEL_DATA,
      collapseStatus: false,
      curCardData: [],
      navActiveIndex: 0,
      cardCategories: predefinedTypes,
      cardTree: Object.fromEntries(predefinedTypes.map(type => [type, []])),
      cardNumbers: {
        "眩晕力场": [3, 5, 8],
        "吸附力场": [3, 5, 8],
        "飞刺力场": [3, 5, 8],
        "辐射力场": [3, 5, 8],
        "魔力祭祀": [2, 4, 6],
        "科学力量": [2, 4, 6],
        "异常专家": [3, 6],
        "通用力场": [3, 5, 8],
        "神灯赐福": [2, 3],
        "超级星推官": [1, 2],
        "流派大师": [3, 5],
        "狂暴丽影": [2, 4],
        "诡秘绅士": [2, 4]
      },
      cardTreeArray: [],
      allCardArray: [],
      detailCardTree: Object.fromEntries(predefinedTypes.map(type => [type, []])),
      detailCardTreeArray: [],
      cardDescText: {
        "异常专家": {
          3: "异常增伤提升30%",
          6: "每次施加异常状态，伤害提升12%，持续10秒，可叠加3层。"
        },
        "流派大师": {
          3: "所有流派大师关键字的卡牌效果大幅强化。",
          5: "每拥有1张流派大师卡牌，攻击力和生命值提升8%"
        },
        "神灯赐福": {
          2: "激活出战英雄所有未解锁的战术技能。",
          3: "全部战术技能提升至满"
        },
        "超级星推官": {
          1: "武器随星级提升伤害，每个星级提升2.5%。",
          2: "武器随品质提升伤害，每个品质提升15%"
        },
        "狂暴丽影": {
          2: "使用技能时20%概率触发狂暴时刻。",
          4: "狂暴时刻的持续时间提升100"
        },
        "诡秘绅士": {
          2: "武器附魔：每隔6秒使武器命中25%概率触发【咬击】，【咬击】造成2000%攻击力伤害并回复5%生命值。",
          4: "武器附魔：每隔4秒使武器命中50%概率触发【咬击】，【咬击】造成2000%攻击力伤害并回复5%生命值。"
        },
        "魔力祭祀": {
          2: "提升50%弹夹容量上限，每50发增加3%伤害，最多可提升10层。",
          4: "磁暴附魔：射击命中有15%概率触发磁暴，造成500%攻击力伤害，可享受爆炸增益。",
          6: "磁暴附魔：射击命中有25%概率触发磁暴，造成700%攻击力伤害，可享受爆炸增益。"
        },
        "科学力量": {
          2: "所有爆炸伤害提升20%。",
          4: "武器附魔:每隔3秒使武器下一发命中能触发【黑洞】，【黑洞】造成伤害等同500%武器单发伤害并附加10%易伤",
          6: "武器附魔:易伤效果提升至50%"
        },
        "眩晕力场": {
          3: "力场升级成高级力场，每间隔5秒，对附近敌人造成3600%攻击力的伤害和1秒眩晕",
          5: "武器子弹接触力场后弹体积提升30%，伤害提升",
          8: "主动:将力场召唤到自身位置，随后5秒内武器单发伤害提升60%。技能冷却10秒；被动:武器子弹接触力场伤害额外提升20%"
        },
        "吸附力场": {
          3: "力场升级成高级力场，英雄靠近力场时射速提升20%，武器攻击25次，力场造成一次牵引效果，造成1300%攻击力",
          5: "武器子弹接触力场后，伤害提升35%，穿透+2",
          8: "主动:控制力场在10秒跟随自身。期间自身每秒恢复10%弹药量，自身伤害提升35%并获得20%生命值的护盾，技能冷却20秒。被动:武器子弹接触力场伤害额外提升20%"
        },
        "飞刺力场": {
          3: "力场升级成高级力场，接触力场的子弹伤害额外提升20%。英雄在力场附近时产生【弹药链接】，每消耗30弹药时力场向四周散射4道【飞刺】造成630%攻击力的伤害。",
          5: "武器子弹接触力场后，伤害提升35%。产生【弹药链接】时武器命中目标附带25%减速。",
          8: "主动:在自身和力场的镜像位置创建一个新的力场，技能冷却20秒；被动1:每次【飞刺】命中，目标受到5%易伤效果，持续4秒，最多叠加10层；被动2:武器子弹接触力场伤害额外提升10%"
        },
        "辐射力场": {
          3: "力场升级成高级力场；每间隔5秒，产生一次10米范围伤害。范围伤害造成3000%攻击力。",
          5: "暴击伤害提升30%。武器子弹接触力场后，伤害提升。",
          8: "主动:对全屏敌人每秒造成3360%攻击力的伤害，持续5秒，造成10秒20%易伤效果；每命中一个目标自身伤害提升5%，可叠加10层，持续10秒，技能冷却25秒；被动:武器子弹接触力场伤害额外提升10%"
        },
        "通用力场": {
          3: "战斗开始时召唤复制弹幕炮台，炮台继承玩家25%攻击力，持续30秒",
          5: "炮台基础攻击力提升至35%，炮台登场后会向最近的力场位置跟随。自身和周围所有召唤物的伤害增加10%",
          8: "主动:力场体积变大，同时自身和周围所有召唤物的伤害增加40%，持续10秒，技能冷却20秒"
        }
      },
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
    this.checkCategory(predefinedTypes[0], 0)
  },
  activated() {
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
    // 切换分类
    checkCategory(category, index) {
      this.navActiveIndex = index
      this.curCardData = this.cardData.filter((item) => {
        return item.types.includes(category)
      })

      if (this.$refs.cardList && this.collapseStatus) {
        this.$refs.cardList.style.height = 'auto'
        this.$refs.cardList.style.padding = '5px 0 0 5px'
      }
    },
    // 选牌
    checkCard(item) {
      if (this.allCardArray.includes(item.name)) {
        const index = this.allCardArray.findIndex(card => card === item.name)
        this.allCardArray.splice(index, 1)
      } else {
        if (this.allCardArray.length === 20) {
          return this.$message.error('够了哥')
        }
        this.allCardArray.push(item.name)
      }
      const [type_1, type_2] = item.types
      if (this.cardTree[type_1].includes(item.name)) {
        const index = this.cardTree[type_1].findIndex(card => card === item.name)
        this.cardTree[type_1].splice(index, 1)
      } else {
        this.cardTree[type_1].push(item.name)
      }
      if (this.cardTree[type_2].includes(item.name)) {
        const index = this.cardTree[type_2].findIndex(card => card === item.name)
        this.cardTree[type_2].splice(index, 1)
      } else {
        this.cardTree[type_2].push(item.name)
      }
      this.cardTreeArray = Object.entries(this.cardTree)
      this.cardTreeArray.sort((a, b) => b[1].length - a[1].length)

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
      this.detailCardTreeArray = Object.entries(this.detailCardTree)
      this.detailCardTreeArray.sort((a, b) => b[1].length - a[1].length)
    },
    // 计算颜色
    getMoelColor(name, length) {
      let count = 0
      const model = this.cardNumbers[name]
      const moelLength = model.length
      model.forEach((item, index) => {
        if (length >= item) {
          count ++
        }
      })

      if (moelLength == 3) {
        return {
          0: 'gray',
          1: 'blue',
          2: 'purple',
          3: 'orange'
        }[count]
      } else if (moelLength == 2) {
        return {
          0: 'gray',
          1: 'purple',
          2: 'orange'
        }[count]
      } else if (moelLength == 1) {
        return {
          0: 'gray',
          1: 'orange'
        }[count]
      }
    },
    // 计算套装属性
    // getGroupText(name, length) {
    //   let count = 0
    //   const model = this.cardMoel[name]
    //   model.forEach((item, index) => {
    //     if (length >= item) {
    //       count = item
    //     }
    //   })
    //   return this.cardDescText[name][count]
    // },
    // 判断当前卡牌选中状态
    getActiveStatus(name) {
      return this.allCardArray.includes(name) ? 'active card-item' : 'card-item'
    },
    // 折叠
    handleCollapse() {
      if (!this.collapseStatus) {
        this.$refs.cardList.style.height = 0
        this.$refs.cardList.style.padding = 0
      } else {
        this.$refs.cardList.style.height = 'auto'
        this.$refs.cardList.style.padding = '5px 0 0 5px'
      }
      this.collapseStatus = !this.collapseStatus
    },
    // 清空卡组
    handleClear() {
      this.checkCategory(predefinedTypes[0], 0)
      this.cardTreeArray = []
      this.allCardArray = []
      this.cardTree = Object.fromEntries(predefinedTypes.map(type => [type, []]))
      this.detailCardTree = Object.fromEntries(predefinedTypes.map(type => [type, []]))
      this.detailCardTreeArray = []
      window.localStorage.detailCardTreeArray = []
    },
    // 跳转详情页
    handleToDetail() {
      if (this.allCardArray.length === 0) {
        return this.$message.error('没牌咋生成啊')
      }
      this.$router.push({
        path: '/detail'
      })
      window.localStorage.detailCardTreeArray = JSON.stringify(this.detailCardTreeArray)
      // this.$prompt('请输入密码', '强盛集团荣誉出品', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消'
      // }).then(({ value }) => {
      //   const date = new Date
      //   const hour = this.padZero(date.getHours())
      //   const min = this.padZero(date.getMinutes())
      //   const password = hour + min
      //   if (value == password) {
      //     this.$router.push({
      //       path: '/detail'
      //     })
      //     window.localStorage.detailCardTreeArray = JSON.stringify(this.detailCardTreeArray)
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: '密码错误，请联系强盛集团'
      //     })
      //   }
      // }).catch(() => {
      //   return
      // })
    },
    handleHitter() {
      this.$router.push({
        path: '/hitter'
      })
    },
    viewCardDesc() {
      this.$router.push({
        path: '/view'
      })
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

    padZero(num) {
      return num < 10 ? '0' + num : String(num)
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.contariner {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #eee;
  overflow-y: scroll;
}
.card-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  z-index: 10;
}
.card-nav li {
  width: 65px;
  height: 30px;
  font-size: 11px;
  border-radius: 3px;
  text-align: center;
  line-height: 30px;
  color: #333;
  border: 1px solid #aaa;
  margin-bottom: 8px;
}
.card-nav .reset {
  background: #f56c6c;
  color: #fff;
  border: 1px solid #f56c6c;
}
.card-nav .desc {
  background: #E6A23C;
  color: #fff;
  border: 1px solid #E6A23C;
}
.card-nav .view {
  background: #67c23a;
  color: #fff;
  border: 1px solid #67c23a;
}
.card-nav .active {
  color: #fff;
  background: #409eff;
  border: 1px solid #409eff;
}
.card-nav .none {
  border: 0;
}
/* .collapse{
  display: flex;
  justify-content: space-between;
  height: 35px;
} */
.card-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 5px 0 0 5px;
  transition: height 2s;
  position: relative;
  z-index: 10;
}
.card-item {
  width: 21%;
  height: 120px;
  margin-bottom: 10px;
  margin-right: 14px;
}
.card-list .active {
  box-shadow: 0px 0px 2px 4px #ff2d51;
}
.card-img {
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.card-tree {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.tree-body {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.tree-num {
  background: #ccc;
  color: #fff;
  width: 15px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}
.tree-desc {
  display: flex;
  flex-direction: column;
}
.tree-desc .name {
  text-align: left;
  font-size: 14px;
}
.tree-desc .model {
  font-size: 9px;
}
.tree-desc .text{
  font-size: 12px;
}

.gray .tree-desc {
  color: gray;
}
.blue .tree-desc {
  color: blue;
}
.purple .tree-desc {
  color: purple;
}
.orange .tree-desc {
  color: orange;
}
.gray .tree-num {
  color: gray;
}
.blue .tree-num {
  color: blue;
}
.purple .tree-num {
  color: purple;
}
.orange .tree-num {
  color: orange;
}

.waterMask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
}


</style>
