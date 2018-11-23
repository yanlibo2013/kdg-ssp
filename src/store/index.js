import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations/index";
import actions from "./action/index";
import getters from "./getters/index";

Vue.use(Vuex);

const state = {
  currentTab: "first",
  header: "",
  publickKey: "",
  defaultOpeneds: [],
  homeBaseInfo: "",
  currentCheckedAd: "", //:""
  currentCheckedName: "",
  planid: false,
  planOptions: [], //投放计划列表
  login: "", //登录之后基本信息
  currentuser: "", //当前用户
  currentAd: "",
  sidebar: [], //侧边栏
  activemenu: "",
  breadcrumblist: [
    {
      home: [
        {
          title: "首页",
          last: true,
          key: 0
        }
      ]
    },
    {
      detail: [
        {
          title: "资源管理",
          path: "",
          key: 1
        },
        {
          title: "资源明细",
          path: "/detail",
          last: true,
          key: 2
        }
      ]
    },
    {
      config: [
        {
          title: "资源管理",
          path: "",
          key: 3
        },
        {
          title: "接入配置",
          path: "/config",
          last: true,
          key: 4
        }
      ]
    },
    {
      createmedia: [
        {
          title: "资源管理",
          path: "",
          key: 5
        },
        {
          title: "接入配置",
          path: "/config",
          key: 6
        },
        {
          title: "创建媒体",
          path: "/createmedia",
          last: true,
          key: 8
        }
      ]
    },
    {
      editmedia: [
        {
          title: "资源管理",
          path: "",
          key: 5
        },
        {
          title: "接入配置",
          path: "/config",
          key: 6
        },
        {
          title: "编辑媒体",
          path: "/createmedia",
          last: true,
          key: 8
        }
      ]
    },
    {
      createplatform: [
        {
          title: "资源管理",
          path: "",
          key: 9
        },
        {
          title: "接入配置",
          path: "/config",
          key: 10
        },
        {
          title: "平台列表",
          path: "/config",
          key: 11
        },
        {
          title: "创建平台",
          path: "",
          last: true,
          key: 12
        }
      ]
    },
    {
      editplatform: [
        {
          title: "资源管理",
          path: "",
          key: 9
        },
        {
          title: "接入配置",
          path: "/config",
          key: 10
        },
        {
          title: "平台列表",
          path: "/config",
          key: 11
        },
        {
          title: "编辑平台",
          path: "",
          last: true,
          key: 12
        }
      ]
    },
    {
      adlist: [
        {
          title: "资源管理",
          path: "",
          key: 13
        },
        {
          title: "接入配置",
          path: "/config",
          key: 14
        },
        {
          title: "媒体列表",
          path: "/config",
          key: 15
        },
        {
          title: "广告位列表",
          path: "/createad",
          last: true,
          key: 16
        }
      ]
    },
    {
      createad: [
        {
          title: "资源管理",
          path: "",
          key: 17
        },
        {
          title: "接入配置",
          path: "/config",
          key: 18
        },
        {
          title: "媒体列表",
          path: "/config",
          key: 15
        },
        {
          title: "广告位创建",
          path: "/createad",
          last: true,
          key: 19
        }
      ]
    },
    {
      demand: [
        {
          title: "流量设置",
          path: "",
          key: 17
        },
        {
          title: "需求方管理",
          path: "/demand",
          last: true,
          key: 18
        }
      ]
    },
    {
      ademander: [
        {
          title: "流量设置",
          path: "",
          key: 17
        },
        {
          title: "需求方管理",
          path: "/demand",
          key: 18
        },
        {
          title: "需求方创建",
          path: "/ademander",
          last: true,
          key: 19
        }
      ],
      ademandereidt: [
        {
          title: "流量设置",
          path: "",
          key: 17
        },
        {
          title: "需求方管理",
          path: "/demand",
          key: 18
        },
        {
          title: "需求方编辑",
          path: "/ademander",
          last: true,
          key: 19
        }
      ]
    },
    {
      policyset: [
        {
          title: "流量设置",
          path: "",
          key: 20
        },
        {
          title: "需求方管理",
          path: "/demand",
          key: 21
        },
        {
          title: "需求方政策配置",
          path: "/policyset",
          last: true,
          key: 22
        }
      ]
    },
    {
      flowset: [
        {
          title: "流量设置",
          path: "",
          key: 23
        },
        {
          title: "需求方管理",
          path: "/demand",
          key: 24
        },
        {
          title: "需求方流量配置",
          path: "/flowset",
          last: true,
          key: 25
        }
      ]
    },
    {
      resourse: [
        {
          title: "订单",
          path: "",
          key: 23
        },
        {
          title: "资源推荐",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      setorder: [
        {
          title: "订单",
          path: "",
          key: 23
        },
        {
          title: "资源推荐",
          path: "/resourse",
          key: 25
        },
        {
          title: "订单设置",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      pd: [
        {
          title: "订单",
          path: "",
          key: 23
        },
        {
          title: "PD订单",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      pdashboard: [
        {
          title: "订单",
          path: "",
          key: 23
        },
        {
          title: "PD订单",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      permission: [
        {
          title: "系统配置",
          path: "",
          key: 23
        },
        {
          title: "权限管理",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      adaccount: [
        {
          title: "系统配置",
          path: "",
          key: 23
        },
        {
          title: "权限管理",
          path: "/permission",
          key: 25
        },
        {
          title: "创建帐户",
          path: "",
          last: true,
          key: 25
        }
      ],
      editaccount: [
        {
          title: "系统配置",
          path: "",
          key: 23
        },
        {
          title: "权限管理",
          path: "/permission",
          key: 25
        },
        {
          title: "编辑帐户",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      advertisers: [
        {
          title: "审核",
          path: "",
          key: 25
        },
        {
          title: "广告主审核",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      consumption: [
        {
          title: "报表",
          path: "",
          key: 25
        },
        {
          title: "竞价消耗报表",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      creative: [
        {
          title: "审核",
          path: "",
          key: 25
        },
        {
          title: "创意审核",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      flowfinance: [
        {
          title: "财务",
          path: "",
          key: 25
        },
        {
          title: "财务记录",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      pmp: [
        {
          title: "资源管理",
          path: "",
          key: 25
        },
        {
          title: "PMP配置",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      addpmp: [
        {
          title: "资源管理",
          path: "",
          key: 25
        },
        {
          title: "PMP创建",
          path: "",
          last: true,
          key: 25
        }
      ]
    },
    {
      editpmp: [
        {
          title: "资源管理",
          path: "",
          key: 25
        },
        {
          title: "PMP编辑",
          path: "",
          last: true,
          key: 25
        }
      ]
    }
  ],
  currentbreadcrumb: [],
  //投放管理
  advertiser: "", //存放登录者下的所有的客户
  plan: "", //存放客户的计划
  allclick: "", //存放客户的总点击次数
  allview: "", //存放客户的所有的曝光次数
  planlist: [],
  result: "",
  tempnetwork: "", //网络类型 显示隐藏
  tempdevice: "", //设备定向 显示隐藏
  parnetMenu: "", //父及菜单

  tempmeadia: [], //媒体  显示 隐藏
  tempadposition: [], //广告位 显示 隐藏

  networktype: [], //网络类型被选中元素
  device: [], //设备定向被选中元素
  meadia: [], //媒体被选中元素
  adposition: [], //广告位被选中元素

  adList: [],

  meadialist: [],
  dpositionlist: [],
  //地域
  terrainResult: [],
  province: [],
  terrainSourceData: [],

  //时段
  // monday: [{
  //     key: "0",
  //     value: "0"
  // }, {
  //     key: "1",
  //     value: "0"
  // }, {
  //     key: "2",
  //     value: "0"
  // }, {
  //     key: "3",
  //     value: "0"
  // }, {
  //     key: "4",
  //     value: "0"
  // }, {
  //     key: "5",
  //     value: "0"
  // }, {
  //     key: "6",
  //     value: "0"
  // }, {
  //     key: "7",
  //     value: "0"
  // }, {
  //     key: "8",
  //     value: "0"
  // }, {
  //     key: "9",
  //     value: "0"
  // }, {
  //     key: "10",
  //     value: "0"
  // }, {
  //     key: "11",
  //     value: "0"
  // }, {
  //     key: "12",
  //     value: "0"
  // }, {
  //     key: "13",
  //     value: "0"
  // }, {
  //     key: "14",
  //     value: "0"
  // }, {
  //     key: "15",
  //     value: "0"
  // }, {
  //     key: "16",
  //     value: "0"
  // }, {
  //     key: "17",
  //     value: "0"
  // }, {
  //     key: "18",
  //     value: "0"
  // }, {
  //     key: "19",
  //     value: "0"
  // }, {
  //     key: "20",
  //     value: "0"
  // }, {
  //     key: "21",
  //     value: "0"
  // }, {
  //     key: "22",
  //     value: "0"
  // }, {
  //     key: "23",
  //     value: "0"
  // }],
  //时段
  monday: [
    {
      key: "0",
      value: "1"
    },
    {
      key: "1",
      value: "1"
    },
    {
      key: "2",
      value: "1"
    },
    {
      key: "3",
      value: "1"
    },
    {
      key: "4",
      value: "1"
    },
    {
      key: "5",
      value: "1"
    },
    {
      key: "6",
      value: "1"
    },
    {
      key: "7",
      value: "1"
    },
    {
      key: "8",
      value: "1"
    },
    {
      key: "9",
      value: "1"
    },
    {
      key: "10",
      value: "1"
    },
    {
      key: "11",
      value: "1"
    },
    {
      key: "12",
      value: "1"
    },
    {
      key: "13",
      value: "1"
    },
    {
      key: "14",
      value: "1"
    },
    {
      key: "15",
      value: "1"
    },
    {
      key: "16",
      value: "1"
    },
    {
      key: "17",
      value: "1"
    },
    {
      key: "18",
      value: "1"
    },
    {
      key: "19",
      value: "1"
    },
    {
      key: "20",
      value: "1"
    },
    {
      key: "21",
      value: "1"
    },
    {
      key: "22",
      value: "1"
    },
    {
      key: "23",
      value: "1"
    }
  ],
  tuesday: [
    {
      key: "0",
      value: "1"
    },
    {
      key: "1",
      value: "1"
    },
    {
      key: "2",
      value: "1"
    },
    {
      key: "3",
      value: "1"
    },
    {
      key: "4",
      value: "1"
    },
    {
      key: "5",
      value: "1"
    },
    {
      key: "6",
      value: "1"
    },
    {
      key: "7",
      value: "1"
    },
    {
      key: "8",
      value: "1"
    },
    {
      key: "9",
      value: "1"
    },
    {
      key: "10",
      value: "1"
    },
    {
      key: "11",
      value: "1"
    },
    {
      key: "12",
      value: "1"
    },
    {
      key: "13",
      value: "1"
    },
    {
      key: "14",
      value: "1"
    },
    {
      key: "15",
      value: "1"
    },
    {
      key: "16",
      value: "1"
    },
    {
      key: "17",
      value: "1"
    },
    {
      key: "18",
      value: "1"
    },
    {
      key: "19",
      value: "1"
    },
    {
      key: "20",
      value: "1"
    },
    {
      key: "21",
      value: "1"
    },
    {
      key: "22",
      value: "1"
    },
    {
      key: "23",
      value: "1"
    }
  ],
  wendesday: [
    {
      key: "0",
      value: "1"
    },
    {
      key: "1",
      value: "1"
    },
    {
      key: "2",
      value: "1"
    },
    {
      key: "3",
      value: "1"
    },
    {
      key: "4",
      value: "1"
    },
    {
      key: "5",
      value: "1"
    },
    {
      key: "6",
      value: "1"
    },
    {
      key: "7",
      value: "1"
    },
    {
      key: "8",
      value: "1"
    },
    {
      key: "9",
      value: "1"
    },
    {
      key: "10",
      value: "1"
    },
    {
      key: "11",
      value: "1"
    },
    {
      key: "12",
      value: "1"
    },
    {
      key: "13",
      value: "1"
    },
    {
      key: "14",
      value: "1"
    },
    {
      key: "15",
      value: "1"
    },
    {
      key: "16",
      value: "1"
    },
    {
      key: "17",
      value: "1"
    },
    {
      key: "18",
      value: "1"
    },
    {
      key: "19",
      value: "1"
    },
    {
      key: "20",
      value: "1"
    },
    {
      key: "21",
      value: "1"
    },
    {
      key: "22",
      value: "1"
    },
    {
      key: "23",
      value: "1"
    }
  ],
  tursday: [
    {
      key: "0",
      value: "1"
    },
    {
      key: "1",
      value: "1"
    },
    {
      key: "2",
      value: "1"
    },
    {
      key: "3",
      value: "1"
    },
    {
      key: "4",
      value: "1"
    },
    {
      key: "5",
      value: "1"
    },
    {
      key: "6",
      value: "1"
    },
    {
      key: "7",
      value: "1"
    },
    {
      key: "8",
      value: "1"
    },
    {
      key: "9",
      value: "1"
    },
    {
      key: "10",
      value: "1"
    },
    {
      key: "11",
      value: "1"
    },
    {
      key: "12",
      value: "1"
    },
    {
      key: "13",
      value: "1"
    },
    {
      key: "14",
      value: "1"
    },
    {
      key: "15",
      value: "1"
    },
    {
      key: "16",
      value: "1"
    },
    {
      key: "17",
      value: "1"
    },
    {
      key: "18",
      value: "1"
    },
    {
      key: "19",
      value: "1"
    },
    {
      key: "20",
      value: "1"
    },
    {
      key: "21",
      value: "1"
    },
    {
      key: "22",
      value: "1"
    },
    {
      key: "23",
      value: "1"
    }
  ],
  friday: [
    {
      key: "0",
      value: "1"
    },
    {
      key: "1",
      value: "1"
    },
    {
      key: "2",
      value: "1"
    },
    {
      key: "3",
      value: "1"
    },
    {
      key: "4",
      value: "1"
    },
    {
      key: "5",
      value: "1"
    },
    {
      key: "6",
      value: "1"
    },
    {
      key: "7",
      value: "1"
    },
    {
      key: "8",
      value: "1"
    },
    {
      key: "9",
      value: "1"
    },
    {
      key: "10",
      value: "1"
    },
    {
      key: "11",
      value: "1"
    },
    {
      key: "12",
      value: "1"
    },
    {
      key: "13",
      value: "1"
    },
    {
      key: "14",
      value: "1"
    },
    {
      key: "15",
      value: "1"
    },
    {
      key: "16",
      value: "1"
    },
    {
      key: "17",
      value: "1"
    },
    {
      key: "18",
      value: "1"
    },
    {
      key: "19",
      value: "1"
    },
    {
      key: "20",
      value: "1"
    },
    {
      key: "21",
      value: "1"
    },
    {
      key: "22",
      value: "1"
    },
    {
      key: "23",
      value: "1"
    }
  ],
  saturday: [
    {
      key: "0",
      value: "1"
    },
    {
      key: "1",
      value: "1"
    },
    {
      key: "2",
      value: "1"
    },
    {
      key: "3",
      value: "1"
    },
    {
      key: "4",
      value: "1"
    },
    {
      key: "5",
      value: "1"
    },
    {
      key: "6",
      value: "1"
    },
    {
      key: "7",
      value: "1"
    },
    {
      key: "8",
      value: "1"
    },
    {
      key: "9",
      value: "1"
    },
    {
      key: "10",
      value: "1"
    },
    {
      key: "11",
      value: "1"
    },
    {
      key: "12",
      value: "1"
    },
    {
      key: "13",
      value: "1"
    },
    {
      key: "14",
      value: "1"
    },
    {
      key: "15",
      value: "1"
    },
    {
      key: "16",
      value: "1"
    },
    {
      key: "17",
      value: "1"
    },
    {
      key: "18",
      value: "1"
    },
    {
      key: "19",
      value: "1"
    },
    {
      key: "20",
      value: "1"
    },
    {
      key: "21",
      value: "1"
    },
    {
      key: "22",
      value: "1"
    },
    {
      key: "23",
      value: "1"
    }
  ],
  weekday: [
    {
      key: "0",
      value: "1"
    },
    {
      key: "1",
      value: "1"
    },
    {
      key: "2",
      value: "1"
    },
    {
      key: "3",
      value: "1"
    },
    {
      key: "4",
      value: "1"
    },
    {
      key: "5",
      value: "1"
    },
    {
      key: "6",
      value: "1"
    },
    {
      key: "7",
      value: "1"
    },
    {
      key: "8",
      value: "1"
    },
    {
      key: "9",
      value: "1"
    },
    {
      key: "10",
      value: "1"
    },
    {
      key: "11",
      value: "1"
    },
    {
      key: "12",
      value: "1"
    },
    {
      key: "13",
      value: "1"
    },
    {
      key: "14",
      value: "1"
    },
    {
      key: "15",
      value: "1"
    },
    {
      key: "16",
      value: "1"
    },
    {
      key: "17",
      value: "1"
    },
    {
      key: "18",
      value: "1"
    },
    {
      key: "19",
      value: "1"
    },
    {
      key: "20",
      value: "1"
    },
    {
      key: "21",
      value: "1"
    },
    {
      key: "22",
      value: "1"
    },
    {
      key: "23",
      value: "1"
    }
  ],

  reportList: [],

  //后台管理
  secIndustry: "",
  companydata: [],
  otherdata: [],
  businessdata: [],
  isEditcity: "",

  //
  height: "",
  checkeedMeadiaItem: [],
  checkedAdItem: [],
  adclick: "正在获取数据...", //点击率
  adview: "正在获取数据...", //曝光率

  editOrderItem: ""
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
