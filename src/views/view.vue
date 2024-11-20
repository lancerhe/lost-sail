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
import {predefinedTypes, predefinedGroups} from '@/model/constants'

export default {
  name: "HomeView",
  data() {
    return {
      navActiveIndex: 0,
      cardCategory: predefinedTypes,
      cardDescText: predefinedGroups,
      cardNumbers: Object.fromEntries(
          Object.entries(predefinedGroups).map(([key, value]) => [key, Object.keys(value).map(Number)])
      ),
      type: "",
      currentDesc: []
    };
  },
  created() {
    this.type = this.$route.query.type || predefinedTypes[0]
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
      const model = this.cardNumbers[this.type]
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
