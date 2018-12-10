import Mock from 'mockjs';
Mock.Random.extend({
  checkLib: function (date) {
    var checkLibs = ['山西屯留国家粮食储备库', '本库']
    return this.pick(checkLibs)
  },
  storageVault: function (date) {
    var checkLibs = ['太原库1', '太原库2', '太原库3', '太原库4']
    return this.pick(checkLibs)
  },
  unit: function (date) {
    var checkLibs = ['山西屯留国家粮食储备库', '太原库', '襄垣库']
    return this.pick(checkLibs)
  },
  roleName: function (date) {
    var checkLibs = ['扦样人员', '样品管理员', '检测员']
    return this.pick(checkLibs)
  },
  row_class_name: function (date) {
    var row_class_names = ['new', 'old']
    return this.pick(row_class_names)
  },
  varieties: function (date) {
    var varietiees = ['玉米', '小麦']
    return this.pick(varietiees)
  },
  status: function (date) {
    var statuses = ['未扦样', '已扦样']
    return this.pick(statuses)
  },
  examinationStatus: function (date) {
    var statuses = [0, 1, 2]
    return this.pick(statuses)
  },
  applyStatus: function (date) {
    var statuses = [0, 1, 2, 3]
    return this.pick(statuses)
  },
  tableName: function (date) {
    var tableNames = ['春季扦样登记表', '秋季扦样登记表', '抽查扦样登记表']
    return this.pick(tableNames)
  },
  chartsName: function () {
    var charsname = [1, 2, 3, 4, 5, 6]
    return this.pick(charsname)
  },
  state: function () {
    var state = [-1, 1, 2, 3, 4]
    return this.pick(state)
  },
  examineName: function () {
    var examineName = ["测定记录", "测定记录", "杂志、不完善粒测定记录", "杂志、不完善粒测定记录", "水分测定记录", "水分测定记录", "真菌毒素检测记录", "真菌毒素检测记录", "面筋吸水量测定记录", "馒头品尝评分记录表", "脂肪酸值测定记录", "玉米品尝分记录表"]
    return this.pick(examineName)
  },
  sample: function () {
    var sample = ["1", "2"]
    return this.pick(sample)
  },
  test: function (data) {
    var tests = []
    var test = ['水分', '不完善粒', '生霉粒指', '质量', '品质全项目指标']
    var testnum = this.integer(1, test.length)
    for (var i = 0; i < testnum; i++) {
      tests.push(test[i])
    }
    tests = tests.join(',')
    return tests
  },
  connect: function (data) {
    var connect = ["玉米样品领取交接单", "小麦样品领取交接单"]
    return this.pick(connect)
  },
  //  status: function(date) {
  //      var statuses = ['未扦样', '已扦样']
  //      return this.pick(statuses)
  //  },
  producing_area: function (date) {
    var producing_areas = ['河南', '陕西']
    return this.pick(producing_areas)
  },
  sampleInSign: function (date) {
    var sampleInSigns = ['历销', '传大势', '陶亚南']
    return this.pick(sampleInSigns)
  }
})
//库列表数据
var LibraryList = Mock.mock('/liquid/role/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      unitName: "中央储备粮襄垣直属库",
      checkLib: '@checkLib',
      createTime: "@date('yyyy.MM.dd')",
      rowType: "库信息",//删除用
    }
  ],
  total: 56,

});
//扦样列表数据
var Sampling = Mock.mock('/liquid/role2/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      sampling_number: "襄垣-玉米-110",
      position_number: "@natural( 1, 30 )",
      varieties: '@varieties',
      status: '@status',
      producing_area: '@producing_area',
      createTime: "@date('yyyy')",
      manuscript: "@bool()",
      safetyReport: "@bool()",
      rowType: "扦样信息",//删除用
      row_class_name: '@row_class_name',
    }
  ],
  total: 56,


});
//查看编辑扦样
var Sampling = Mock.mock('/liquid/role3/data', {
  formdatas: {
    title: '中央储备粮襄垣直属库',
    form: {
      ctime: '2017-12-12',//创建时间
      status: '未扦样',//状态
      nid: '襄垣-玉米-110',//迁样编号
      checkregion: '沁县库区',//被查库点
      pnumber: '漫水-1',//货位号
      varieties: '玉米',//品种
      quality: 'ZC',//性质
      weight: '220.000',//代表数量
      region: '山西',//产地
      harvestdate: '2017',//收货年度
      samplingdate: '2017.9.27',//扦样日期
      remarks: '秋季普查',//备注
      code: 'static/images/test/linecode.png',//二维码地址
    }
  }
});
//上传图片
var images = Mock.mock('/liquid/images', {

});
//新建
var problem1 = Mock.mock('/liquid/role4/data', {
  formdatas: {
    title: '安全报告',
    form: {
      checkregion: '沁县库区',//被查库点
      pnumber: '漫水-1',//货位号
      problems: [
        {
          problem: '',//问题
          images: [

          ],//图片
        }

      ],

    }
  }
});
//编辑
var problem1 = Mock.mock('/liquid/role5/data', {
  formdatas: {
    title: '安全报告',
    form: {
      checkregion: '沁县库区',//被查库点
      pnumber: '漫水-1',//货位号
      problems: [
        {
          problem: '长子分库漫水-1号仓出现房屋透水情况，以及出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况。',//问题
          images: [
            { name: 'safty.jpg', url: 'static/images/test/safty.jpg' },
            { name: 'safty.jpg', url: 'static/images/test/safty.jpg' },
          ],//图片
        },
        {
          problem: '长子分库漫水-1号仓出现房屋透水情况，以及出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况出现房屋透水情况。',//问题
          images: [
            { name: 'safty.jpg', url: 'static/images/test/safty.jpg' },
            { name: 'safty.jpg', url: 'static/images/test/safty.jpg' },
          ],//图片
        }

      ],

    }
  }
});
//工作底稿
var manuscript1 = Mock.mock('/liquid/role6/data', {
  formdatas: {
    title: '中央储备粮实物检查工作底稿（轮换验收）',
    form: {
      checkcompany: '山西',//被检查企业
      checktime: '2017.09',//被查时点
      realchecktime: '2017.09',//实际查库日
      pnumber: '漫水-1',//货位号
      varieties: '玉米',//品种
      quality: 'ZC',//性质
      reservoir_area: '中央储备粮襄垣直属库',//所在库区
      warehouse_type: '无',//仓房类型
      harvestdate: '2017',//收货年度
      storage_from: '常规',//储存形式
      bgzsl: '',//保管帐数量（kg）
      quality: '中等',//质量等级
      //stored_way:['人工入仓'],//入仓方式
      stored_way: '1',//入仓方式
      //粮食入库质量
      volume_weigh_i: '',//容重（g/l）  
      water_content_i: '',//水分（%）
      impurity_i: '',//杂质（%）  
      //实测粮食质量
      volume_weigh_r: '',//容重（g/l）  
      water_content_r: '',//水分（%）
      impurity_r: '',//杂质（%） 
      //粮堆形状及基本尺寸
      long: '',//长（m）：
      width: '',//宽（m）：
      height: '',//高（m）：
      //1.计算粮堆体积
      volume_c: '',//粮堆测量体积(m3)	
      volume_q: '',//需要扣除体积(m3)	
      volume_r: '',//粮堆实际体积(m3)	
      //2.计算粮堆平均密度	
      //          标准容重器法
      volume_weigh_bz: '',//粮食容重（g/l）
      correction_factor_bz: '',//校正后修正系数
      average_density_bz: '',//粮堆平均密度（kg/m³）
      //          特制大容器法
      unit_volume_weight_tz: '',//单位体积粮食重量（kg/m³）
      correction_factor_tz: '',//校正后修正系数
      average_density_tz: '',//粮堆平均密度（kg/m³）
      //3.计算粮食数量
      weight_measure: '',//测量计算数（kg）	
      //          应记粮食损耗(kg)	
      weight_humidity: '',//水分减量
      weight_natural: '',//保管自然损耗
      weight_total: '',//合计
      weight_calculation: '',//检查计算数（kg）	
      //4.认定粮食实际数量	
      //          检查计算数与保管账数量比较
      difference: '',//差数（kg）
      slip: '',//差率（％）
      is_same: '',//账实是否相符
      weight_r: '',//粮食实际数量（kg）
      difference_r: '',//账实不符原因   
      remarks: '无',//备注
      checker: '',//检查人：
      keeper: '',//保管责任人：
      responsible_person: '',//被检查企业负责人：    
    }
  }
});
var manuscript1 = Mock.mock('/liquid/role7/data', {
  formdatas: {
    title: '中央储备粮实物检查工作底稿（轮换验收）',
    form: {
      checkcompany: '山西',//被检查企业
      checktime: '2017.09',//被查时点
      realchecktime: '2017.09',//实际查库日
      pnumber: '漫水-1',//货位号
      varieties: '玉米',//品种
      quality: 'ZC',//性质
      reservoir_area: '中央储备粮襄垣直属库',//所在库区
      warehouse_type: '无',//仓房类型
      harvestdate: '2017',//收货年度
      storage_from: '常规',//储存形式
      bgzsl: '测试数据',//保管帐数量（kg）
      quality: '中等',//质量等级
      //stored_way:['人工入仓'],//入仓方式
      stored_way: '1',//入仓方式
      //粮食入库质量
      volume_weigh_i: '测试数据',//容重（g/l）  
      water_content_i: '测试数据',//水分（%）
      impurity_i: '测试数据',//杂质（%）  
      //实测粮食质量
      volume_weigh_r: '测试数据',//容重（g/l）  
      water_content_r: '测试数据',//水分（%）
      impurity_r: '测试数据',//杂质（%） 
      //粮堆形状及基本尺寸
      long: '测试数据',//长（m）：
      width: '测试数据',//宽（m）：
      height: '测试数据',//高（m）：
      //1.计算粮堆体积
      volume_c: '测试数据',//粮堆测量体积(m3)	
      volume_q: '测试数据',//需要扣除体积(m3)	
      volume_r: '测试数据',//粮堆实际体积(m3)	
      //2.计算粮堆平均密度	
      //          标准容重器法
      volume_weigh_bz: '测试数据',//粮食容重（g/l）
      correction_factor_bz: '测试数据',//校正后修正系数
      average_density_bz: '测试数据',//粮堆平均密度（kg/m³）
      //          特制大容器法
      unit_volume_weight_tz: '测试数据',//单位体积粮食重量（kg/m³）
      correction_factor_tz: '测试数据',//校正后修正系数
      average_density_tz: '测试数据',//粮堆平均密度（kg/m³）
      //3.计算粮食数量
      weight_measure: '测试数据',//测量计算数（kg）	
      //          应记粮食损耗(kg)	
      weight_humidity: '测试数据',//水分减量
      weight_natural: '测试数据',//保管自然损耗
      weight_total: '测试数据',//合计
      weight_calculation: '测试数据',//检查计算数（kg）	
      //4.认定粮食实际数量	
      //          检查计算数与保管账数量比较
      difference: '测试数据',//差数（kg）
      slip: '测试数据',//差率（％）
      is_same: '测试数据',//账实是否相符
      weight_r: '测试数据',//粮食实际数量（kg）
      difference_r: '测试数据',//账实不符原因   
      remarks: '无',//备注
      checker: '陶亚南',//检查人：
      keeper: '陶亚南',//保管责任人：
      responsible_person: '陶亚南',//被检查企业负责人：    
    }
  }
});
//样品管理入库列表数据
var SampleInList = Mock.mock('/liquid/role8/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      sampling_number: "8789 6469 451",
      varieties: '@varieties',
      position: "TG-1-2",
      storageStatus: '已入库',
      sampleInTime: "@date('yyyy.MM.dd')",
      sampleInSign: "@sampleInSign",
      rowType: "样品信息",//删除用
      row_class_name: '@row_class_name',
    }
  ],
  total: 56,

});
//新建样品
var Sample = Mock.mock('/liquid/role9/data', {
  formdatas: {
    title: '中央储备粮襄垣直属库',
    form: {
      ctime: '2017-12-12',//创建时间
      status: '未扦样',//状态
      nid: '襄垣-玉米-110',//迁样编号
      checkregion: '沁县库区',//被查库点
      pnumber: '漫水-1',//货位号
      varieties: '玉米',//品种
      quality: 'ZC',//性质
      weight: '220.000',//代表数量
      region: '山西',//产地
      harvestdate: '2017',//收货年度
      samplingdate: '2017.9.27',//扦样日期
      remarks: '秋季普查',//备注
      storageStatus: '已入库',
      sampleInTime: "@date('yyyy.MM.dd')",
      position: "",
      sampleInSign: "",
      code: 'static/images/test/linecode.png',//二维码地址

    },
    submitText: '入库',
  }
});
//查看编辑样品
var Sampleedit = Mock.mock('/liquid/role10/data', {
  formdatas: {
    title: '中央储备粮襄垣直属库',
    form: {
      ctime: '2017-12-12',//创建时间
      status: '未扦样',//状态
      nid: '襄垣-玉米-110',//迁样编号
      checkregion: '沁县库区',//被查库点
      pnumber: '漫水-1',//货位号
      varieties: '玉米',//品种
      quality: 'ZC',//性质
      weight: '220.000',//代表数量
      region: '山西',//产地
      harvestdate: '2017',//收货年度
      samplingdate: '2017.9.27',//扦样日期
      remarks: '秋季普查',//备注
      storageStatus: '已入库',
      position: "TG-1-2",
      sampleInTime: "@date('yyyy.MM.dd')",
      sampleInSign: "@sampleInSign",
      code: 'static/images/test/linecode.png',//二维码地址

    },
    submitText: '确定',
  }
});
//样品领取交接单
var Sampleedit = Mock.mock('/liquid/role11/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      name: "山西中储粮粮油质监中心",
      connect: '@connect',
      test: "@test",
      data: "@date('yyyy.MM.dd')",
      rowType: "样品交接单",//删除用
    }
  ],
  total: 56,


});
//下拉选择样品数据库
var selectlist = Mock.mock('selectlist', {
  selectlist: [{
    value: '1',
    label: '长南',

  }, {
    value: '2',
    label: '山西',

  }, {
    value: '3',
    label: '运城',

  }],
  libselect: '',
});
//下拉后更新多选框
var checklist = Mock.mock('checklist', {

  checkList: [
    { sampleNum: '201700941', sampleWord: '玉米-襄垣-春季抽查', pid: 1, id: 1, remark: '春季抽查' },
    { sampleNum: '201700942', sampleWord: '玉米-襄垣-秋季普查', pid: 1, id: 2, remark: '秋季普查' },
    { sampleNum: '201700943', sampleWord: '玉米-襄垣-忘了', pid: 1, id: 3, remark: '2017' },
    { sampleNum: '201700944', sampleWord: '玉米-襄垣-忘了', pid: 1, id: 4, remark: '123' },
    { sampleNum: '201700945', sampleWord: '玉米-襄垣-忘了', pid: 1, id: 5, remark: '123' },
    { sampleNum: '201700946', sampleWord: '玉米-襄垣-忘了', pid: 2, id: 6, remark: '123' },
    { sampleNum: '201700947', sampleWord: '玉米-襄垣-忘了', pid: 2, id: 7, remark: '123' },
    { sampleNum: '201700948', sampleWord: '玉米-襄垣-忘了', pid: 2, id: 8, remark: '123' },
    { sampleNum: '201700949', sampleWord: '玉米-襄垣-忘了', pid: 2, id: 9, remark: '123' },
    { sampleNum: '201700950', sampleWord: '玉米-襄垣-忘了', pid: 2, id: 10, remark: '123' },
    { sampleNum: '201700951', sampleWord: '玉米-襄垣-忘了', pid: 2, id: 11, remark: '123' },
    { sampleNum: '201700952', sampleWord: '玉米-襄垣-忘了', pid: 3, id: 12, remark: '123' },
    { sampleNum: '201700953', sampleWord: '玉米-襄垣-忘了', pid: 3, id: 13, remark: '123' },
    { sampleNum: '201700954', sampleWord: '玉米-襄垣-忘了', pid: 3, id: 14, remark: '123' },
    { sampleNum: '201700956', sampleWord: '玉米-襄垣-忘了', pid: 3, id: 16, remark: '123' },
    { sampleNum: '201700955', sampleWord: '玉米-襄垣-忘了', pid: 3, id: 15, remark: '123' },
    { sampleNum: '201700957', sampleWord: '玉米-襄垣-忘了', pid: 3, id: 17, remark: '123' },
    { sampleNum: '201700958', sampleWord: '玉米-襄垣-忘了', pid: 3, id: 18, remark: '123' },
  ],
  checkedList: [
    //		'复选框 A',
  ],
});

//扫描检验编号分小样
var packingScan = Mock.mock('/saomiaofenxiaoyang', {
  sampleNum: '2018010002',
  sort: '玉米',
  checkeds: '1,3,5,6,7,8,9,10,11,12,13,14,15,16,18,19',
  taskId: '12',
  sampleState: '2',
  id: '11'

});
//获取打印条码huoqudayintiaoma
var packingScan = Mock.mock('/huoqudayintiaoma',
  '2018010002-01容,2018010002-02水,2018010002-03杂,2018010002-04矿,2018010002-05不,2018010002-06生,2018010002-07色,2018010002-08硬'
);
//分装小样列表数据
var packingList = Mock.mock('/liquid/role12/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      smallSampleNumber: "8789 6469 451",
      test: '@test',
      printTimes: '@natural(1, 100)',
      printDate: "@date('yyyy.MM.dd')",
      rowType: "小样信息",//删除用
      row_class_name: '@row_class_name',
    }
  ],
  total: 56,

});
//扦样列表数据
var Sampling = Mock.mock('/liquid/role13/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      sampling_number: "襄监20170094",
      testItem: "脂肪酸值测定记录",
      testName: '@varieties',
      date: "@date('yyyy.MM.dd')",
      rowType: "样品检验单",//删除用
      row_class_name: '@row_class_name',
    }
  ],
  total: 56,


});
//扦样列表详情数据
var sampleShowList = Mock.mock('/liquid/role14/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      tableName: "@tableName",
      sampleStatus: '已通过',
      createTime: "@date('yyyy.MM.dd')",
      rowType: "表信息",//删除用
    }
  ],
  total: 56,

});
//审批库典数据
var spkd = Mock.mock('/liquid/role15/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      tableName: "@tableName",
      checkLib: "@checkLib",
      message: "@natural(0, 10)",
      rowType: "库典信息",//删除用
    }
  ],
  total: 56,

});
//审批库典数据
var spkd = Mock.mock('/liquid/role16/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      tableName: "@tableName",
      examinationStatus: '@examinationStatus',
      createTime: "@date('yyyy.MM.dd')",
      rowType: "表信息",//删除用
    }
  ],
  total: 56,

});
//样品管理入库列表数据
var qydj = Mock.mock('/liquid/role17/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      sampling_number: "襄垣-玉米-110",
      checkregion: '沁县库区',//被查库点
      pnumber: '漫水-1',//货位号
      varieties: '玉米',//品种
      quality: 'ZC',//性质
      weight: '220.000',//代表数量
      producing_area: '山西',//产地
      harvestdate: '2017',//收货年度
      sampleInTime: "@date('yyyy.MM.dd')",
      samplingSign: "",
      sampleInSignWidth: "",
      samplingdate: '2017.9.27',//扦样日期
      remarks: '秋季普查',//备注
      rowType: "扦样信息",//删除用
    }
  ],
  total: 56,
});
//粮库申请列表
var spkd = Mock.mock('/liquid/role18/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      tableName: "@tableName",
      applyStatus: '@applyStatus',
      createTime: "@date('yyyy.MM.dd')",
      rowType: "表信息",//删除用
    }
  ],
  total: 56,

});
//扦样报表数据
var spkd = Mock.mock('/liquid/role19/data', {
  librarydatas: [
    {
      lib: '本库',
      'samples|0-13': [
        { 'id|+1': 1, sampleNumber: '监20170094' },
      ],
    },
    {
      lib: '山西晋城国家粮食储备库',
      'samples|0-13': [
        { 'id|+1': 1, sampleNumber: '监20170094' },
      ],
    },

  ],
  formdatas: {
    tableName: '',
    remarks: '',
  },
});
// 质量验收情况
Mock.mock('/liquid/role_lyx/data', {
  'rows|8-19': [
    {

      'id|+1': 1,
      slip: '2017年春',

      dj_zl: '良',
      rz_zl: '容重',
      sf_zl: '水分',
      zz_zl: '杂质',
      zl_bwsl: '54',
      kwz_bwsl: '',
      szqw_zl: '气味',
      result_zl: '合格',
      mjxsl_pz: '面筋吸水量',
      smj_pz: '湿面筋',
      pcpfz_pz: '品尝评分值',
      result_pz: '合格',
      bwsl: "不完善里",
      ydzs: "硬度指数",
      seqw_pz: "色泽气味"
    }
  ],
  total: 56,

});
//粮库基本列表
var jblb = Mock.mock('/liquid/role20/data', {
  'rows|8-19': [
    {
      'id|+1': 1,
      unit: "@unit",
      storageVault: "@storageVault",
      testNumber: '监20170078',
      sampleNumber: '襄垣-玉米-110',
      WarehouseNumber: '漫水',
      varieties: '玉米',//品种
      weight: '220.000',//代表数量
      harvestdate: '2017',//收货年度
      sampleInTime: "@date('yyyy.MM.dd')",

      applicationTime: "@date('yyyy.MM.dd')",
      taskTime: "@date('yyyy.MM.dd')",
      sampleTime: "@date('yyyy.MM.dd')",
      sampleInSign: "@sampleInSign",
      remarkssp: "@boolean()",

      long: "12",
      width: "12",
      height: "12",
      volume_q: '54',
      volume_r: '90',
      volume_weigh_bz: '54',
      correction_factor_bz: '54',
      average_density_bz: '54',
      weight_measure: '54',
      bgzsl: '54',
      slip: '54',

      dj_zl: '良',
      rz_zl: '容重',
      sf_zl: '水分',
      zz_zl: '杂质',
      zl_bwsl: '54',
      smkl_bwsl: '',
      szqw_zl: '气味',
      result_zl: '合格',
      rz_pz: '容重',
      sf_pz: '水分',
      zz_pz: '杂质',
      result_pz: '合格',
      remarks_pz: '备注',
    }
  ],
  total: 56,

});
//扦样报表数据
var spkd = Mock.mock('/liquid/role21/data', {
  informations: [
    {
      title: '直属库',
      'items|4-13': [
        { 'id|+1': 1, sampleNumber: '长子库' },
      ],
    },
    {
      title: '品种',
      'items|3-13': [
        { 'id|+1': 1, sampleNumber: '玉米' },
      ],
    },

  ],
});
//角色授权数据
var jssq = Mock.mock('/liquid/role22/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      roleName: "@roleName",
      maxMember: '@natural(0, 10)',
      remarks: "备注信息",
      rowType: "角色信息",//删除用
    }
  ],
  total: 56,
});
//用户授权数据
var yhsq = Mock.mock('/liquid/role23/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      userName: "李佳",
      assignRole: '管理员',
      phone: "15940324325",
      email: "23474@qq.com",
      rowType: "用户信息",//删除用
    }
  ],
  total: 56,
});
//资源列表数据
var zysq = Mock.mock('/liquid/role24/data', {
  'rows|3-12': [
    {
      'id|+1': 1,
      resourceType: "菜单",
      resourceName: "扦样登记列表",
      resourcePName: "权限管理",
      action: "查看、删除、新建",
      rowType: '资源'
    }
  ],
  total: 56,
});
// 图表信息
var charts = Mock.mock("/liquid/chart/data", {
  'rows|6': [
    {
      'id|+1': 0,
      name: "@chartsName",
      Testing: "容重",
      year: ['2017年春', '2017年春', '2017年春', '2017年春', '2017年春', '2017年春', '2017年春', '2017年春'],
      data: [43, 43, 234, 523, 2523, 1241, 653, 234]
    }
  ],
  total: 6,
})
//审批检验单
var examine = Mock.mock("/liquid/examine/data", {
  'rows|12': [
    {
      'id|+1': 0,
      tablename: "@examineName",
      sample: "@sample",
      message: 1
    }
  ]
})
//审批小样编号
var sampleexamine = Mock.mock("/liquid/sampleexamine/data", {
  'rows|12': [
    {
      'id|+1': 0,
      'sampleNum|+1': 201801001,
      sample: "@sample",
      people: "admin",
      state: "1",
      'applyTime': Mock.Random.date("yyyy-MM-dd")
    }
  ]
})
//综合案件列表
var zysq = Mock.mock('/grain/sample/data', {
  'rows|3-10': [
    {
      'id|+1': 1,
      clueAddress: "党委办公室",
      industryField: "管理机构",
      state: "@state",
      assessor: "Admin",
      createTime: "2018-09-27",
      informType: "后勤基备处"
    }
  ],
  total: 56,
});
//自我认识
//综合案件列表
var zwrs = Mock.mock('/grain/sample/zwrs', {
  'rows|3-10': [
    {
      'id|+1': 1,
      title: "党委办公室",
      shape: "管理机构",
      type: "@state",
      assessor: "Admin",
      time: "2018-09-27",
      source: "后勤基备处"
    }
  ],
  total: 56,
});
var zysq = Mock.mock('/grain/sample/data111', {
  'rows|3-10': [
    {
      'id|+1': 1,
      title: "【思政】全区高校全覆盖，这堂课持续火热进行中！学习新思想千万师生同上一堂课",
      hits: "105",
      source: "后勤基备处",
      createTime: "2018-09-27",

    }
  ],
  total: 56,
});
export default {
  //	LibraryList:LibraryList,
}