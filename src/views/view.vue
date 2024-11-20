<template>
  <div class="home">
    <header>
      <el-button type="text" icon="el-icon-arrow-left" @click="handleBack">返回</el-button>
      <span>迷航卡牌模拟器</span>
      <span></span>
    </header>
    <div class="contariner">
      <ul class="card-nav">
        <li
          v-for="(item, index) in cardCategory"
          :key="index"
          :class="{ active: navActiveIndex == index }"
          @click="checkCategory(item, index)"
        >
          {{ item }}
        </li>
      </ul>

      <div class="card-desc" ref="cardList">
        <ul>
          <li v-for="(item, index) in currentDesc" :key="index" :class="getMoelColor(item.num)">
            <div class="num">{{ item.num }}:</div>
            <span class="text">{{ item.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      navActiveIndex: 0,
      cardCategory: [
        // "弱点专精",
        // "灼烧专精",
        // "重伤专精",
        // "冰冻专精",
        // "界域支援",
        // "寒芒支援",
        // "异常专家",
        // "通用力场",
        // "神灯赐福",
        // "超级星推官",
        // "流派大师",
        // "狂暴丽影",
        // "幸运星"
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
      ],
      cardDescText: {
        异常专家: {
          3: "异常增伤提升30%",
          6: "每次施加异常状态，伤害提升12%，持续10秒，可叠加3层。",
        },
        流派大师: {
          3: "所有流派大师关键字的卡牌效果大幅强化。",
          5: "每拥有1张流派大师卡牌，攻击力和生命值提升8%",
        },
        神灯赐福: {
          2: "激活出战英雄所有未解锁的战术技能。",
          3: "全部战术技能提升至满",
        },
        超级星推官: {
          1: "武器随星级提升伤害，每个星级提升2.5%。",
          2: "武器随品质提升伤害，每个品质提升15%",
        },
        狂暴丽影: {
          2: "使用技能时20%概率触发狂暴时刻。",
          4: "狂暴时刻的持续时间提升100",
        },
        诡秘绅士: {
          2: "武器附魔：每隔6秒使武器命中25%概率触发【咬击】，【咬击】造成2000%攻击力伤害并回复5%生命值。",
          4: "武器附魔：每隔4秒使武器命中50%概率触发【咬击】，【咬击】造成2000%攻击力伤害并回复5%生命值。",
        },
        魔力祭祀: {
          2: "提升50%弹夹容量上限，每50发增加3%伤害，最多可提升10层。",
          4: "磁暴附魔：射击命中有15%概率触发磁暴，造成500%攻击力伤害，可享受爆炸增益。",
          6: "磁暴附魔：射击命中有25%概率触发磁暴，造成700%攻击力伤害，可享受爆炸增益。",
        },
        科学力量: {
          2: "所有爆炸伤害提升20%。",
          4: "武器附魔:每隔3秒使武器下一发命中能触发【黑洞】，【黑洞】造成伤害等同500%武器单发伤害并附加10%易伤",
          6: "武器附魔:易伤效果提升至50%",
        },
        眩晕力场: {
          3: "力场升级成高级力场，每间隔5秒，对附近敌人造成3600%攻击力的伤害和1秒眩晕",
          5: "武器子弹接触力场后弹体积提升30%，伤害提升",
          8: "主动:将力场召唤到自身位置，随后5秒内武器单发伤害提升60%。技能冷却10秒；被动:武器子弹接触力场伤害额外提升20%",
        },
        吸附力场: {
          3: "力场升级成高级力场，英雄靠近力场时射速提升20%，武器攻击25次，力场造成一次牵引效果，造成1300%攻击力",
          5: "武器子弹接触力场后，伤害提升35%，穿透+2",
          8: "主动:控制力场在10秒跟随自身。期间自身每秒恢复10%弹药量，自身伤害提升35%并获得20%生命值的护盾，技能冷却20秒。被动:武器子弹接触力场伤害额外提升20%",
        },
        飞刺力场: {
          3: "力场升级成高级力场，接触力场的子弹伤害额外提升20%。英雄在力场附近时产生【弹药链接】，每消耗30弹药时力场向四周散射4道【飞刺】造成630%攻击力的伤害。",
          5: "武器子弹接触力场后，伤害提升35%。产生【弹药链接】时武器命中目标附带25%减速。",
          8: "主动:在自身和力场的镜像位置创建一个新的力场，技能冷却20秒；被动1:每次【飞刺】命中，目标受到5%易伤效果，持续4秒，最多叠加10层；被动2:武器子弹接触力场伤害额外提升10%",
        },
        辐射力场: {
          3: "力场升级成高级力场；每间隔5秒，产生一次10米范围伤害。范围伤害造成3000%攻击力。",
          5: "暴击伤害提升30%。武器子弹接触力场后，伤害提升。",
          8: "主动:对全屏敌人每秒造成3360%攻击力的伤害，持续5秒，造成10秒20%易伤效果；每命中一个目标自身伤害提升5%，可叠加10层，持续10秒，技能冷却25秒；被动:武器子弹接触力场伤害额外提升10%",
        },
        通用力场: {
          3: "战斗开始时召唤复制弹幕炮台，炮台继承玩家25%攻击力，持续30秒",
          5: "炮台基础攻击力提升至35%，炮台登场后会向最近的力场位置跟随。自身和周围所有召唤物的伤害增加10%",
          8: "主动:力场体积变大，同时自身和周围所有召唤物的伤害增加40%，持续10秒，技能冷却20秒",
        },
      },
      cardMoel: {
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
      type: "",
      currentDesc: []
    };
  },
  created() {
    this.type = this.$route.query.type || "眩晕力场"
    this.getDesc()
  },
  activated() {},
  methods: {
    getDesc() {
      this.currentDesc = []
      const typeData = this.cardDescText[this.type]
      for (let key in typeData) {
        this.currentDesc.push({
          num: key,
          text: typeData[key]
        })
      }
    },
    // 切换分类
    checkCategory(category, index) {
      this.navActiveIndex = index
      this.type = category
      this.getDesc()
    },
    // 计算颜色
    getMoelColor(length) {
      let count = 0
      const model = this.cardMoel[this.type]
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
    handleBack() {
      this.$router.push({ path: '/index' })
    }
  }
}
</script>

<style scoped>
.home {
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
.contariner {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #fff;
  overflow-y: scroll;
}
.card-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.card-nav li {
  width: 80px;
  height: 30px;
  font-size: 14px;
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

.card-desc{
  width: 100%;

}

.card-desc li{
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  font-size: 16px;
  line-height: 24px;
}
.card-desc li .num {
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: #fff;
  margin-right: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-desc li .text{
  flex: 1;
  text-align: left;
}

.blue .num{
  background: blue;
}
.blue .text{
  color: blue;
}
.purple .num{
  background: purple;
}
.purple .text{
  color: purple;
}
.orange .num{
  background: orange;
}
.orange .text{
  color: orange;
}
</style>
