<template>
  <el-container class="home_container">
    <el-header
      ><div>
        <img src="../assets/erp.png" />
        <span>ERP系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside class="aside" :width="computeAsideWidth">
        <div class="logoToggle" @click="toggleCollapse">|||</div>
        <el-menu
          :unique-opened="true"
          active-text-color="#409EFF"
          text-color="#fff"
          :collapse="isCollapse"
          background-color="#333744"
          :collapse-transition="false"
          :default-active="activePath"
          router
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span slot="title">{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + item2.path"
              v-for="item2 in item.children"
              :key="item2.id"
              @click="saveNavState('/' + item2.path)"
            >
              <i :class="iconsObj[item2.id]"></i>
              <span>{{ item2.authName }}</span></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      menulist: [
        {
          authName: '权限管理',
          id: 1,
          children: [
            { authName: '公司管理', id: 11, path: 'company' },
            { authName: '部门管理', id: 12, path: 'department' },
            { authName: '员工管理', id: 13, path: 'employee' },
            { authName: '角色管理', id: 14, path: 'role' },
            { authName: '菜单管理', id: 15, path: 'menu' },
          ],
        },
        {
          authName: '基础数据',
          id: 2,
          children: [
            { authName: 'BOM清单', id: 20, path: 'bom' },
            { authName: '字典设置', id: 21, path: 'dict' },
            { authName: '基础数据配置', id: 22, path: 'configuration' },
            { authName: '基础数据维护', id: 23, path: 'maintenance' },
            { authName: '工艺路线', id: 24, path: 'process' },
          ],
        },

        {
          authName: '业务模块',
          id: 3,
          children: [
            { authName: '合同管理', id: 31, path: 'contract' },
            { authName: '子合同管理', id: 32, path: 'sales_order' },
            { authName: '采购单', id: 33, path: 'purchas_order' },
            { authName: '退货单', id: 34, path: 'return_order' },
          ],
        },
        {
          authName: '物料管理',
          id: 4,
          children: [
            { authName: '重点原材料库存', id: 41, path: 'raw' },
            { authName: '物料入库', id: 42, path: 'itemIn' },
            { authName: '物料出库', id: 43, path: 'itemOut' },
          ],
        },
        // {
        //   authName: '计划管理',
        //   id: 8,
        //   children: [
        //     { authName: '排产计划', id: 81, path: 'pcjh' },
        //     { authName: '生产订单', id: 82, path: 'scdd' },
        //   ],
        // },
        // {
        //   authName: '生产管理',
        //   id: 5,
        //   children: [
        //     { authName: '初较', id: 51, path: 'cj' },
        //     { authName: '上电初检', id: 52, path: 'sdcj' },
        //     { authName: '耐压', id: 53, path: 'ny' },
        //     { authName: '复校', id: 54, path: 'fj' },
        //     { authName: '图像结论表', id: 55, path: 'txjlb' },
        //     { authName: '豆码对比', id: 56, path: 'dmdb' },
        //     { authName: '生产数据豆码', id: 57, path: 'scsjdm' },
        //     { authName: '生产数据来源', id: 58, path: 'scsjly' },
        //     { authName: '工单', id: 59, path: 'gd' },
        //     { authName: '报工信息', id: 591, path: 'bgxx' },
        //   ],
        // },
        // {
        //   authName: '质量管理',
        //   id: 6,
        //   children: [
        //     { authName: '压敏电阻', id: 61, path: 'ymdz' },
        //     { authName: '光电耦合器', id: 62, path: 'gdohq' },
        //     { authName: '晶体谐振器', id: 63, path: 'jtxzq' },
        //     { authName: '瞬变二极管', id: 64, path: 'sbejg' },
        //     { authName: '电池', id: 65, path: 'dc' },
        //     { authName: '液晶', id: 66, path: 'yj' },
        //     { authName: '电流互感器', id: 67, path: 'dlhgq' },
        //     { authName: '成品检测', id: 68, path: 'cpjc' },
        //   ],
        // },
        // {
        //   authName: '设备管理',
        //   id: 7,
        //   children: [
        //     { authName: '设备故障管理', id: 71, path: 'sbgzgl' },
        //     { authName: '设备日常维护', id: 72, path: 'sbrcwh' },
        //   ],
        // },
      ],
      iconsObj: {
        1: 'iconfont icon-xitongguanli',
        11: 'iconfont icon-gongsiguanli',
        12: 'iconfont icon-bumenguanli',
        13: 'iconfont icon-yuangongguanli-copy',
        14: 'iconfont icon-jiaoseguanli',
        15: 'iconfont icon-caidanguanli',
        2: 'iconfont icon-jichushuju',
        20: 'iconfont icon-BOMqingdan',
        21: 'iconfont icon-ICON_zidianshezhi',
        22: 'iconfont icon-jichushujupeizhi',
        23: 'iconfont icon-jichushujuweihu',
        24: 'iconfont icon-gongyiluxianjichuxinxi',
        3: 'iconfont icon-yewumokuai',
        31: 'iconfont icon-hetongguanli',
        32: 'iconfont icon-dianzihetongguanli',
        33: 'iconfont icon-caigoudan1',
        34: 'iconfont icon-tuihuodan1',
        4: 'iconfont icon-wuliaoguanli',
        41: 'iconfont icon-cangkuguanli',
        42: 'iconfont icon-ruku',
        43: 'iconfont icon-chuku',
        5: 'iconfont icon-shengchanguanli',
        51: 'iconfont icon-xiaoyan',
        52: 'iconfont icon-shangdian',
        53: 'iconfont icon-naiyaceshi',
        54: 'iconfont icon-fucha',
        55: 'iconfont icon-tuxiang',
        56: 'iconfont icon-30fudouma',
        57: 'iconfont icon-shengchanshuju',
        58: 'iconfont icon-laiyuan',
        59: 'iconfont icon-gongdanxinxi',
        591: 'iconfont icon-gongchangxinxibiao',
        6: 'iconfont icon-zhiliangguanli',
        61: 'iconfont icon-dianzu',
        62: 'iconfont icon-ouheqi',
        63: 'iconfont icon-xiezhenqi-',
        64: 'iconfont icon-erjiguan',
        65: 'iconfont icon-battery',
        66: 'iconfont icon-yejingmozu',
        67: 'iconfont icon-huganqi',
        68: 'iconfont icon-chengpinjianceqingkuang',
        7: 'iconfont icon--device-manage',
        71: 'iconfont icon-shebeiguzhang',
        72: 'iconfont icon-weihu',
        8: 'iconfont icon-jihuaguanli',
        81: 'iconfont icon-paichan',
        82: 'iconfont icon-shengchandingdan',
      },
      isCollapse: false,
      activePath: '',
    }
  },
  computed: {
    computeAsideWidth() {
      return this.isCollapse ? '75px' : '240px'
    },
  },
  methods: {
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  mounted() {
    const main = document.querySelector('.main')
    const aside = document.querySelector('.aside')
    let height = document.body.clientHeight
    main.style.height = height - 60 + 'px'
    aside.style.height = height - 60 + 'px'
    window.addEventListener('resize', () => {
      height = document.body.clientHeight
      main.style.height = height - 60 + 'px'
      aside.style.height = height - 60 + 'px'
    })
  },
}
</script>
<style lang="scss" scoped>
.home_container {
  height: 100%;
}

.holder::-webkit-scrollbar {
  display: none;
}

.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    img {
      margin-left: 30px;
      width: 45px;
    }
    span {
      color: white;
      margin-left: 10px;
    }
  }
}
.el-aside {
  background: #303440;
  overflow-y: scroll;
  overflow-x: hidden;
  .logoToggle {
    color: white;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-menu {
    border-right: none;
  }
}
.iconfont {
  margin-right: 10px;
}
.el-main {
  background: #e8ecef;
}
</style>