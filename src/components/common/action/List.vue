<template>
	<el-table ref="multipleTable" border tooltip-effect="light" style="width: 100%" :data="tabledata" @selection-change="handleSelectionChange" :default-sort="{prop: actions.sort, order: 'ascending'}" v-loading="loading" :row-class-name="row_class_name" element-loading-customClass="table_loading" element-loading-text="loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(255,255,255, 0.8)" @row-click="rowClick">
		<!--		:height="actions.height?actions.height:'auto'"-->
		<!--		height='scrollHeight'-->
		<!--		max-height='3rem'-->
		<!--是否包含多选框-->
		<template v-if="actions.selection">
			<el-table-column :resizable="resizable" align="center" type="selection" class-name="tableAction">
			</el-table-column>
		</template>
		<!--是否添加编号-->
		<el-table-column type="index" :index="1" align="center" label="序号" v-if="actions.number"></el-table-column>
		<!--<el-table-column type="index" :index="indexMethod" v-if="actions.number"></el-table-column>-->
		<!--循环数据-->
		<template v-for="item in items">

			<el-table-column show-overflow-tooltip v-if="!item.status" :min-width="item.minWidth?item.minWidth:'80'" :width="item.width?item.width:'auto'" :resizable="resizable" align="center" :key="item.id" :label="item.label" :sortable="item.sort" :prop="item.prop" :class-name="item.class" :sort-method="item.smethod">
			</el-table-column>

			<el-table-column show-overflow-tooltip v-if="item.status" :min-width="item.minWidth?item.minWidth:'80'" :width="item.width?item.width:'auto'" :resizable="resizable" align="center" :key="item.id" :label="item.label" :sortable="item.sort" :prop="item.prop" :class-name="item.class">
				<template slot-scope="scope">
					<template v-if="item.prop=='regState'">
						<template v-if="scope.row[item.prop]==-1">
							<span style="color:#fc6500;">待审核</span>
						</template>
						<template v-if="scope.row[item.prop]==1">
							<span style="color:#999999;">未同意</span>
						</template>
						<template v-if="scope.row[item.prop]==2">
							<span style="color:#666666;">已同意</span>
						</template>
						<template v-if="scope.row[item.prop]==3">
							<span style="color:blue;">草稿</span>
						</template>
					</template>
					<template v-if="item.prop=='sampleState'">
						<template v-if="scope.row[item.prop]==-1">
							<span style="color:#fc6500;">未扦样</span>
						</template>
						<template v-if="scope.row[item.prop]==1">
							<span style="color:#999999;">已扦样</span>
						</template>
						<template v-if="scope.row[item.prop]==2">
							<span style="color:#666666;">已储存</span>
						</template>
						<template v-if="scope.row[item.prop]==3">
							<!--<span style="color:#666666;">已分小样</span>-->
							<span style="color:#666666;">已储存</span>
						</template>
						<template v-if="scope.row[item.prop]==4">
							<span style="color:#666666;">已处理</span>
						</template>
					</template>
					<template v-if="item.prop=='detectionState'">
						<template v-if="scope.row[item.prop]==1">
							<span style="color:#fc6500;">未检测</span>
						</template>
						<template v-if="scope.row[item.prop]==2">
							<span style="color:#999999;">已检测</span>
						</template>
					</template>
					<template v-if="item.prop=='state'">
						<template v-if="scope.row[item.prop]==-1">
							<span style="color:#fc9400;">待审核</span>
						</template><template v-if="scope.row[item.prop]==1">
							<span style="color:#4c90db;">已接案</span>
						</template>
						<template v-if="scope.row[item.prop]==2">
							<span style="color:#58b481;">侦办中</span>
						</template>
						<template v-if="scope.row[item.prop]==3">
							<span style="color:#999999;">已结案 </span>
						</template>
						<template v-if="scope.row[item.prop]==4">
							<span style="color:#ec5b3c;">未立案</span>
						</template>
					</template>
					<template v-if="item.prop=='returnState'">
						<template v-if="scope.row[item.prop]==-1">
							<span style="color:#fc6500;">待归还</span>
						</template>
						<template v-if="scope.row[item.prop]==1">
							<span style="color:#999999;">已归还</span>
						</template>
					</template>
					<template v-if="item.prop=='resourceType'">
						<template v-if="scope.row[item.prop]==1">
							<span style="color:#666666;">菜单</span>
						</template>
						<template v-if="scope.row[item.prop]==2">
							<span style="color:#666666;">元素</span>
						</template>
						<template v-if="scope.row[item.prop]==3">
							<span style="color:#666666;">文件</span>
						</template>
						<template v-if="scope.row[item.prop]==4">
							<span style="color:#666666;">操作</span>
						</template>
					</template>
					<template v-if="item.prop=='isDeal'">
						<template v-if="scope.row[item.prop]==-1">
							<span style="color:#fc6500;">待整改</span>
						</template>
						<template v-if="scope.row[item.prop]==1">
							<span style="color:#999999;">已整改</span>
						</template>
					</template>
					<template v-if="item.prop=='reason'">
						<template v-if="scope.row.regState==-1">
							<span style="color:#fc6500;">等待审核中</span>
						</template>
						<template v-if="scope.row.regState==1">
							<span style="color:#f56c6c;">{{scope.row[item.prop]}}</span>
						</template>
						<template v-if="scope.row.regState==2">
							<span style="color:#58b481;">已通过审核</span>
						</template>
						<template v-if="scope.row.regState==3">
							<span style="color:blue;">未提交审核</span>
						</template>
					</template>
					<template v-if="item.prop=='inspectState'">
						<template v-if="scope.row[item.prop]==-1">
							<span style="color:#fc6500;">待审核</span>
						</template>
						<template v-if="scope.row[item.prop]==1">
							<span style="color:#999999;">未通过</span>
						</template>
						<template v-if="scope.row[item.prop]==2">
							<span style="color:#666666;">已通过</span>
						</template>
						<template v-if="scope.row[item.prop]==3">
							<span style="color:blue;">草稿</span>
						</template>
					</template>
					<template v-if="item.prop=='checkOrderApprovalStatus'">
						<template v-if="scope.row[item.prop]==-1">
							<span style="color:#fc6500;">待审核</span>
						</template>
						<template v-if="scope.row[item.prop]==2">
							<span style="color:#999999;">未通过</span>
						</template>
						<template v-if="scope.row[item.prop]==1">
							<span style="color:##58b481;">已通过</span>
						</template>
					</template>
					<template v-if="item.prop=='approveRemark'">
						<template v-if="scope.row.checkOrderApprovalStatus==-1">
							<span style="color:#fc6500;">等待审核中</span>
						</template>
						<template v-if="scope.row.checkOrderApprovalStatus==2">
							<span style="color:#999999;">{{scope.row[item.prop]}}</span>
						</template>
						<template v-if="scope.row.checkOrderApprovalStatus==1">
							<span style="color:#58b481;">已通过审核</span>
						</template>
					</template>
					<template v-if="item.prop=='pLibraryId'">
						{{findPLibraryName(scope.row[item.prop])}}
					</template>
					<template v-if="item.prop=='depot'">
						{{scope.row['depot']+scope.row['counter']}}
					</template>
					<template v-if="item.prop=='checkeds'">
						{{findCheckeds(scope.row[item.prop],scope.row['sort'])}}
					</template>
					<template v-if="item.prop=='colorCheckeds'">
						<div v-html="colorCheckeds(scope.row['checkeds'],scope.row['sort'])"></div>
					</template>
					<template v-if="item.prop=='sampleNum'">
						监{{scope.row[item.prop]}}
					</template>
					<template v-if="item.prop=='smallSampleNum'">
						<template v-if="scope.row[item.prop].substr(-1,1)==1">
							监{{scope.row[item.prop]}}小1
						</template>
						<template v-if="scope.row[item.prop].substr(-1,1)==2">
							监{{scope.row[item.prop]}}小2
						</template>
						<template v-if="scope.row[item.prop].substr(-1,1)==3">
							监{{scope.row[item.prop]}}水
						</template>
						<template v-if="scope.row[item.prop].substr(-1,1)==4">
							监{{scope.row[item.prop]}}硬
						</template>
						<template v-if="scope.row[item.prop].substr(-1,1)==5">
							监{{scope.row[item.prop]}}面
						</template>
						<template v-if="scope.row[item.prop].substr(-1,1)==6">
							监{{scope.row[item.prop]}}品
						</template>
						<template v-if="scope.row[item.prop].substr(-1,1)==7">
							监{{scope.row[item.prop]}}卫
						</template>
						<template v-if="scope.row[item.prop].substr(-1,1)==8">
							监{{scope.row[item.prop]}}脂
						</template>
					</template>
					<template v-if="item.prop=='checkPoint'">
						{{findCheckPoint(scope.row)}}
					</template>
					<template v-if="item.prop=='smallCheckPoint'">
						{{findCheckeds(scope.row['checkPoint'],scope.row['sort'])}}
					</template>
					<template v-if="item.prop=='libraryFullName'">
						{{scope.row.pLibraryName}}—{{scope.row.libraryName}}
					</template>
					<template v-if="item.prop=='warehouseState'">
						<template v-if="(scope.row.warehouseUseNumber/scope.row.warehouseTotal>=0)&&(scope.row.warehouseUseNumber/scope.row.warehouseTotal<=0.4)">
							<span class="warehouseState" style="color:#38b63a;"><i style="background-color:#38b63a;"></i>{{scope.row.warehouseUseNumber}}/{{scope.row.warehouseTotal}}</span>空闲
						</template>
						<template v-if="(scope.row.warehouseUseNumber/scope.row.warehouseTotal)>=0.4&&(scope.row.warehouseUseNumber/scope.row.warehouseTotal<1)">
							<span class="warehouseState" style="color:#e2b028;"><i style="background-color:#e2b028;"></i>{{scope.row.warehouseUseNumber}}/{{scope.row.warehouseTotal}}</span>未满
						</template>
						<template v-if="scope.row.warehouseUseNumber/scope.row.warehouseTotal==1">
							<span class="warehouseState" style="color:#c81212;"><i style="background-color:#c81212;"></i>{{scope.row.warehouseUseNumber}}/{{scope.row.warehouseTotal}}</span>已满
						</template>
					</template>
					<template v-if="item.prop=='returnPerson'">
						<button :class="{print:!scope.row.returnPerson}" @click.stop="returnPerson(scope.$index, scope.row,scope)">{{scope.row.returnPerson?scope.row.returnPerson:'尚未归还'}}</button>
					</template>
					<template v-if="item.prop=='returnTime'">
						<button :class="{print:!scope.row.returnPerson}" @click.stop="returnPerson(scope.$index, scope.row,scope)">{{scope.row.returnTime?scope.row.returnTime:'尚未归还'}}</button>
					</template>
					<template v-if="item.prop=='id'&&item.label!='归还单编号'">
						<template v-if="scope.row[item.prop]>=10">
							{{scope.row[item.prop]}}
						</template>
						<template v-if="scope.row[item.prop]<10">
							{{'0'+scope.row[item.prop]}}
						</template>
					</template>
					<template v-if="item.prop=='id'&&item.label=='归还单编号'">
						<template v-if="scope.row[item.prop]>=1000">
							{{scope.row[item.prop]}}
						</template>
						<template v-if="(scope.row[item.prop]<1000)&&(scope.row[item.prop]>100)">
							{{'00'+scope.row[item.prop]}}
						</template>
						<template v-if="(scope.row[item.prop]<100)&&(scope.row[item.prop]>10)">
							{{'00'+scope.row[item.prop]}}
						</template>
						<template v-if="scope.row[item.prop]<10">
							{{'000'+scope.row[item.prop]}}
						</template>
					</template>
				</template>
			</el-table-column>
		</template>

		<!--是否包含变色检验项-->
		<template v-if="actions.colorcheck">
			<!--<el-table-column :resizable="resizable" align="center" label="检验项目" class-name="tableAction" width="650">-->
			<el-table-column :resizable="resizable" align="center" label="检验项目" class-name="tableAction">
				<template slot-scope="scope">
					<p :class="actions.colorcheckclass">
						<!--<span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)}}</span>-->
						<template v-if="check(scope.row.checkeds,1)">
							<span class="colorcheck1">容重</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=1?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,2)">
							<span class="colorcheck2">水分</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=2?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,3)">
							<span class="colorcheck3">杂质</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=3?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,4)">
							<span class="colorcheck3">矿物质</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=4?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,5)">
							<span class="colorcheck4">不完善粒</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=5?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,6)">
							<span class="colorcheck4">生霉粒</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=6?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,7)">
							<span class="colorcheck5">色泽气味(质量指标)</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=7?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,8)">
							<span class="colorcheck6">硬度指数</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=8?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,9)">
							<span class="colorcheck6">面筋吸水量</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=9?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,10)">
							<span class="colorcheck7">脂肪酸值</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=10?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,11)">
							<span class="colorcheck8">品尝评分值</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=11?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,12)">
							<span class="colorcheck9">色泽气味(储存品质指标)</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=12?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,13)">
							<span class="colorcheck10">真菌毒素(黄曲霉毒素B1)</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=13?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,14)">
							<span class="colorcheck10">真菌毒素(脱氧雪腐镰刀菌烯醇)</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=14?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,15)">
							<span class="colorcheck10">真菌毒素(玉米赤霉烯酮)</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=15?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,16)">
							<span class="colorcheck11">重金属(铅)</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=16?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,17)">
							<span class="colorcheck11">重金属(镉)</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=17?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,18)">
							<span class="colorcheck11">重金属(汞)</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=18?',':''}}
						</template>
						<template v-if="check(scope.row.checkeds,19)">
							<span class="colorcheck11">重金属(砷)</span>{{scope.row.checkeds.charAt(scope.row.checkeds.length - 1)!=19?',':''}}
						</template>
					</p>
				</template>
			</el-table-column>
		</template>

		<!--是否包含通知信息-->
		<template v-if="actions.message">
			<el-table-column :resizable="resizable" align="center" label="新消息通知" class-name="tableAction">
				<template slot-scope="scope">
					<!--有新通知-->
					<template v-if="scope.row.count||scope.row.sum">
						您有
						<span style="color:#f22054;">{{scope.row.count||scope.row.sum}}</span>条新申请通知
					</template>
					<!--没有新通知-->
					<template v-else>
						本库暂无通知
					</template>
				</template>
			</el-table-column>
		</template>
		<!--是否包含工作底稿-->
		<template v-if="actions.manuscript">
			<el-table-column :resizable="resizable" align="center" label="工作底稿" class-name="tableAction" width="200">
				<template slot-scope="scope">
					<!--已完成工作底稿-->
					<template v-if="scope.row.mId">
						<button class="viewManuscript" @click.stop="handleViewManuscript(scope.$index, scope.row)">中央储备粮实物检查工作底稿</button>
					</template>
					<!--未完成工作底稿-->
					<template v-else>
						<button class="createManuscript" @click.stop="handleCreateManuscript(scope.$index, scope.row)">+新建工作底稿</button>
					</template>
				</template>
			</el-table-column>
		</template>

		<!--是否包含安全报告-->
		<template v-if="actions.safetyReport">
			<el-table-column :resizable="resizable" align="center" label="监督检查" class-name="tableAction">
				<template slot-scope="scope">
					<!--已完成安全报告-->
					<template v-if="scope.row.srId">
						<button class="viewSafetyReport" @click.stop="handleViewSafetyReport(scope.$index, scope.row)">监督检查</button>
					</template>
					<!--未完成安全报告-->
					<template v-else>
						<button class="createSafetyReport" @click.stop="handleCreateSafetyReport(scope.$index, scope.row)">+新建监督检查</button>
					</template>
				</template>
			</el-table-column>
		</template>

		<el-table-column v-if="actions.show" :resizable="resizable" align="center" label="操作" class-name="tableAction" :width="actions.actionWidth?actions.actionWidth:'auto'">
			<template slot-scope="scope">
				<!--是否包含查看操作-->
				<template v-if="actions.input">
					<button class="input" @click.stop="handleInput(scope.$index, scope.row,scope)">录入</button>
				</template>
				<!--是否包含导出操作-->
				<template v-if="actions.exportExcel">
					<button class="exportExcel" @click.stop="handleExportExcel(scope.$index, scope.row,scope)">{{actions.exporttitle?actions.exporttitle:'导出Excel表格'}}</button>
				</template>
				<!--是否包含查看详情操作-->
				<template v-if="actions.view1">
					<button class="view1" @click.stop="handleView(scope.$index, scope.row,scope)">查看详情</button>
				</template>
				<!--是否包含查看操作-->
				<template v-if="actions.view">
					<button class="view" @click.stop="handleView(scope.$index, scope.row,scope)">查看</button>
				</template>
				<!--是否包含编辑操作-->
				<template v-if="actions.edit">
					<!--<button class="edit" @click.stop="handleEdit(scope.$index, scope.row)">编辑</button>-->
					<!--<button v-if="scope.row.checkPoint" class="undele" @click.stop="notAllowed()">编辑</button>-->
					<!--这里有问题改天处理一下-->
					<!--<button v-if="!$_ault_alert('all:edit')" class="undele" @click.stop="notAllowed()">编辑</button>-->
					<!--<button v-else class="edit" @click.stop="handleEdit(scope.$index, scope.row)">编辑</button>-->
					<button class="edit" @click.stop="handleEdit(scope.$index, scope.row)">编辑</button>
				</template>
				<!--删除操作-->
				<template v-if="actions.deleCaogao">
					<button v-if="scope.row.regState==3" class="dele" @click.stop="handleDele(scope.$index, scope.row)">删除</button>
					<button v-else class="undele" @click.stop="notAllowed()">删除</button>
				</template>
				<!--删除检验单-->
				<template v-if="actions.delecheck">
					<button v-if="scope.row.inspectState ==3" class="dele" @click.stop="handleDele(scope.$index, scope.row)">删除</button>
					<button v-else class="undele" @click.stop="notAllowed()">删除</button>
				</template>
				<!--是否包含重新申请操作-->
				<template v-if="actions.repeat">
					<!--<button  class="repeat" @click.stop="repeat(scope.$index, scope.row,scope)">再次申请</button>-->
					<button v-if="scope.row.regState==1||scope.row.regState==2" class="repeat" @click.stop="repeat(scope.$index, scope.row,scope)">再次申请</button>
					<button v-else class="undele" @click.stop="notAllowed()">再次申请</button>
				</template>
				<!--是否包含删除操作-->
				<template v-if="actions.dele">
					<button v-if="!actions.nodele" class="dele" @click.stop="handleDele(scope.$index, scope.row)">删除</button>
					<button v-else class="undele" @click.stop="notAllowed()">删除</button>
				</template>
				<!--是否包含授权操作-->
				<template v-if="actions.auth">
					<button class="auth" @click.stop="handleAuth(scope.$index, scope.row)">授权</button>
				</template>
				<!--是否包含打印操作-->
				<template v-if="actions.print">
					<button class="print" @click.stop="handlePrint(scope.$index, scope.row,scope)">打印小样条码</button>
				</template>
				<template v-if="actions.printSampleIn">
					<button class="print" @click.stop="handlePrintSampleIn(scope.$index, scope.row,scope)">打印检验条码</button>
				</template>
			</template>
		</el-table-column>

		<template slot="empty">
			<!--<i class="iconfont icon-xinjian" @click=emptyCreate></i>
	      		<br />
	      		页面空空如也 快去新建吧！     		-->
			页面空空如也！
		</template>
	</el-table>
</template>
<style>
.el-table .cell.el-tooltip span.warehouseState {
  margin-right: 2em;
  font-size: inherit;
  position: relative;
  padding-left: 1.5em;
  color: #38b63a;
}
.el-table .cell.el-tooltip span.warehouseState i {
  position: absolute;
  top: 50%;
  margin-top: -0.07rem;
  width: 0.14rem;
  height: 0.14rem;
  border-radius: 50%;
  background-color: #38b63a;
  font-size: inherit;
  left: 0;
}
.colorcheck1 > .colorcheck1,
.colorcheck2 > .colorcheck2,
.colorcheck3 > .colorcheck3,
.colorcheck4 > .colorcheck4,
.colorcheck5 > .colorcheck5,
.colorcheck6 > .colorcheck6,
.colorcheck7 > .colorcheck7,
.colorcheck8 > .colorcheck8,
.colorcheck9 > .colorcheck9 {
  color: #2973b7;
}
</style>
<script>
export default {
  props: [
    "items",
    "tabledata",
    "actions",
    "list",
    "loading",
    "librarylist",
    "rowType"
  ],
  data() {
    return {
      //  	importLoading: false,
      multipleSelection: [],
      resizable: false
    };
  },
  mounted: function() {
    //		this.openloading()
    //			console.log(this.loading)
  },
  computed: {
//  checkPointEdit() {
//    return this.$_ault_alert("all:edit");
//  },
    scrollHeight() {
      if (!this.actions.height) {
        return "auto";
      } else {
        return this.actions.height;
      }
    }
  },
  methods: {
    //	formatter(row, column, cellValue){
    //		if(column.className=='status'){
    //			if(cellValue==0){
    //				return '待审核';
    //			}else if(cellValue==1){
    //				return '未同意';
    //			}else if(cellValue==2){
    //				return '已同意';
    //			}
    //		}else{
    //			return cellValue;
    //		}
    //	},
    handleSelectionChange(val) {
      this.multipleSelection = val;
      var checkedId = val.map(function(item) {
        return item.id;
      });
      this.$emit("getchecked", checkedId, val);
    },
    //  设置行类名
    row_class_name(scope) {
      return scope.row.row_class_name;
    },
    //  工作底稿
    handleViewManuscript(index, row) {
      if (!this.$_ault_alert("manuscript:saveMan")) {
        return;
      }
      this.$router.push({
        path:
          "/index/sampling/libraryList/samplingList/sampleShowList/manuscriptEdit",
        query: { id: row.id, libraryName: row.libraryName }
      });
    },
    handleCreateManuscript(index, row) {
      if (!this.$_ault_alert("manuscript:saveMan")) {
        return;
      }
      this.$router.push({
        path:
          "/index/sampling/libraryList/samplingList/sampleShowList/manuscriptCreate",
        query: { id: row.id, libraryName: row.libraryName }
      });
    },
    //  安全报告
    handleViewSafetyReport(index, row) {
      if (!this.$_ault_alert("safety:save")) {
        return;
      }
      this.$router.push({
        path:
          "/index/sampling/libraryList/samplingList/sampleShowList/safetyReportEdit",
        query: {
          id: row.id,
          libraryName: row.libraryName,
          position: row.position
        }
      });
    },
    handleCreateSafetyReport(index, row) {
      if (!this.$_ault_alert("safety:save")) {
        return;
      }
      this.$router.push({
        path:
          "/index/sampling/libraryList/samplingList/sampleShowList/safetyReportCreate",
        query: {
          id: row.id,
          libraryName: row.libraryName,
          position: row.position
        }
      });
    },
    handleInput(index, row, scope) {
      //	  	console.log(index,row);
      //		    this.$root.eventHub.$emit('openmodal',row.id,'view',this.list)
      this.$root.eventHub.$emit("inputlistitem", row.id);
    },
    handleExportExcel(index, row, scope) {
      //	  	console.log(index,row);
      //		    this.$root.eventHub.$emit('openmodal',row.id,'view',this.list)
      this.$root.eventHub.$emit("exportExcel", row.id, row);
    },
    handleView(index, row, scope) {
      //	  	console.log(index,row);query:{id:row.id,libraryName:row.libraryName,position:row.position}}
      //		    this.$root.eventHub.$emit('openmodal',row.id,'view',this.list)
      if (row.sampleState) {
        this.$root.eventHub.$emit("viewlistitem", row.id, row.sampleState, row);
      } else if (row.regState) {
        this.$root.eventHub.$emit("viewlistitem", row.id, row.regState, row);
      } else if (row.isDeal) {
        this.$root.eventHub.$emit("viewlistitem", row);
      } else {
        this.$root.eventHub.$emit("viewlistitem", row.id, row);
      }
    },
    repeat(index, row, scope) {
      //			if (row.sampleState) {
      //				this.$root.eventHub.$emit('viewlistitem', row.id, row.sampleState)
      //			} else if (row.regState) {
      //				this.$root.eventHub.$emit('viewlistitem', row.id, row.regState)
      //			} else if (row.isDeal) {
      //				this.$root.eventHub.$emit('viewlistitem', row)
      //			} else {
      //				this.$root.eventHub.$emit('viewlistitem', row.id)
      //			}
      this.$root.eventHub.$emit("repeat", row.id, row.regState);
    },
    handleEdit(index, row) {
      //	  	console.log(index,row,this.list);
      this.$root.eventHub.$emit("editlistitem", row.id, row);
    },

    handleDele(index, row) {
      //			this.$confirm('此操作将永久删除该' + this.rowType + ', 是否继续?', '提示', {
      //				confirmButtonText: '确定',
      //				cancelButtonText: '取消',
      //				type: 'warning'
      //			}).then(() => {
      this.$root.eventHub.$emit("delelistitem", row.id);
      //	      this.$message({
      //	        type: 'success',
      //	        message: '删除成功!'
      //	      });
      //			}).catch(() => {
      //				this.$message({
      //					type: 'info',
      //					message: '已取消删除'
      //				});
      //			});
    },
    handleAuth(index, row) {
      //	  	console.log(index,row,this.list);
      this.$root.eventHub.$emit("authlistitem", row);
    },
    handlePrint(index, row, scope) {
      this.$root.eventHub.$emit("printlistitem", row.smallSampleNum);
    },
    handlePrintSampleIn(index, row, scope) {
      this.$root.eventHub.$emit("printlistitem", row.sampleNum);
    },
    emptyCreate() {
      this.$emit("emptyCreate");
    },
    findPLibraryName(pid) {
      var pitem = this.librarylist.filter(item => {
        return item.id == pid;
      });
      if (pitem.length) {
        return pitem[0].libraryName;
      }
    },
    colorCheckeds(str, sort) {
      //			console.log(this.actions.searchText,str,sort)
      var checkList = [
        "容重",
        "水分",
        "杂质",
        "矿物质",
        "不完善粒",
        "生霉粒",
        "色泽气味(质量指标)",
        "硬度指数",
        "面筋吸水量",
        "脂肪酸值",
        "品尝评分值",
        "色泽气味(储存品质指标)",
        "真菌毒素(黄曲霉毒素B1)",
        "真菌毒素(脱氧雪腐镰刀菌烯醇)",
        "真菌毒素(玉米赤霉烯酮)",
        "重金属(铅)",
        "重金属(镉)",
        "重金属(汞)",
        "重金属(砷)"
      ];
      var res = [];
      var indexs = str.split(",");
      indexs = indexs.sort((a, b) => {
        return a - b;
      });
      indexs.forEach(item => {
        if (item) {
          res.push(checkList[item - 1]);
        }
      });
      var restr = res.join(",");
      restr = restr.replace(
        this.actions.searchText,
        "<span style='color:#e7023a;'>" + this.actions.searchText + "</span>"
      );
      return restr;
    },
    findCheckeds(str, sort) {
      var checkList = [
        "容重",
        "水分",
        "杂质",
        "矿物质",
        "不完善粒",
        "生霉粒",
        "色泽气味(质量指标)",
        "硬度指数",
        "面筋吸水量",
        "脂肪酸值",
        "品尝评分值",
        "色泽气味(储存品质指标)",
        "真菌毒素(黄曲霉毒素B1)",
        "真菌毒素(脱氧雪腐镰刀菌烯醇)",
        "真菌毒素(玉米赤霉烯酮)",
        "重金属(铅)",
        "重金属(镉)",
        "重金属(汞)",
        "重金属(砷)"
      ];
      var res = [];
      var indexs = str.split(",");
      indexs = indexs.sort((a, b) => {
        return a - b;
      });
      indexs.forEach(item => {
        if (item) {
          res.push(checkList[item - 1]);
        }
      });
      var restr = res.join(",");
      if (
        restr ==
        "容重,水分,杂质,矿物质,不完善粒,色泽气味(质量指标),硬度指数,面筋吸水量,品尝评分值,色泽气味(储存品质指标),真菌毒素(脱氧雪腐镰刀菌烯醇),重金属(铅),重金属(镉),重金属(汞),重金属(砷)"
      ) {
        return "全项目指标";
      } else if (
        restr ==
        "容重,水分,杂质,不完善粒,生霉粒,色泽气味(质量指标),脂肪酸值,品尝评分值,色泽气味(储存品质指标),真菌毒素(黄曲霉毒素B1),真菌毒素(脱氧雪腐镰刀菌烯醇),真菌毒素(玉米赤霉烯酮),重金属(铅),重金属(镉),重金属(汞),重金属(砷)"
      ) {
        return "全项目指标";
      } else {
        //	  			restr=restr.replace(/容重,水分,杂质\(矿物质\),不完善粒\(生霉粒\),色泽气味\(质量指标\)/, "质量指标全项目")
        //	  			restr=restr.replace(/面筋吸水量,品尝评分值,色泽气味\(储存品质指标\)/, "储存品质指标全项目")
        //	  			restr=restr.replace(/脂肪酸值,品尝评分值,色泽气味\(储存品质指标\)/, "储存品质指标全项目")
        //	  			restr=restr.replace(/真菌毒素\(黄曲霉毒素B1、脱氧雪腐、镰刀菌烯醇、玉米赤霉烯酮\),重金属\(铅、镉、汞、砷\)/, "食品卫生指标全项目")
        if (sort == "小麦") {
          restr = restr.replace(
            "容重,水分,杂质,矿物质,不完善粒,色泽气味(质量指标),硬度指数",
            "质量指标全项目"
          );
          restr = restr.replace(
            "面筋吸水量,品尝评分值,色泽气味(储存品质指标)",
            "储存品质指标全项目"
          );
          restr = restr.replace(
            "真菌毒素(脱氧雪腐镰刀菌烯醇),重金属(铅),重金属(镉),重金属(汞),重金属(砷)",
            "食品卫生指标全项目"
          );
        } else if (sort == "玉米") {
          restr = restr.replace(
            "容重,水分,杂质,不完善粒,生霉粒,色泽气味(质量指标)",
            "质量指标全项目"
          );
          restr = restr.replace(
            "脂肪酸值,品尝评分值,色泽气味(储存品质指标)",
            "储存品质指标全项目"
          );
          restr = restr.replace(
            "真菌毒素(黄曲霉毒素B1),真菌毒素(脱氧雪腐镰刀菌烯醇),真菌毒素(玉米赤霉烯酮),重金属(铅),重金属(镉),重金属(汞),重金属(砷)",
            "食品卫生指标全项目"
          );
        }
        return restr;
      }
    },
    findCheckPoint(obj) {
      var checkList = [
        "容重",
        "水分",
        "杂质",
        "矿物质",
        "不完善粒",
        "生霉粒",
        "色泽气味(质量指标)",
        "硬度指数",
        "面筋吸水量",
        "脂肪酸值",
        "品尝评分值",
        "色泽气味(储存品质指标)",
        "真菌毒素(黄曲霉毒素B1)",
        "真菌毒素(脱氧雪腐镰刀菌烯醇)",
        "真菌毒素(玉米赤霉烯酮)",
        "重金属(铅)",
        "重金属(镉)",
        "重金属(汞)",
        "重金属(砷)"
      ];
      //			var checkList1 = ["不完善颗粒", "杂质", "生霉粒", "水分", "硬度", "脂肪酸值", "品尝评分", "卫生指标", "加工品质"]
      //			var checkList2 = ["不完善颗粒", "杂质", "生霉粒", "水分", "硬度", "面筋吸水量", "品尝评分", "卫生指标", "加工品质"]
      var index = obj.checkPoint;
      var res;
      //			if (obj.sort == '玉米') {
      //				res = checkList1[index - 1];
      //			} else if (obj.sort == '小麦') {//测定记录
      //				res = checkList2[index - 1];
      //			}
      res = checkList[index - 1];
      return res;
    },
    rowClick(row, event, column) {
    	return
      if (this.actions.noview) {
        return;
      }
      if (row.sampleState) {
        this.$root.eventHub.$emit("viewlistitem", row.id, row.sampleState, row);
      } else if (row.regState) {
        this.$root.eventHub.$emit("viewlistitem", row.id, row.regState);
      } else if (row.isDeal) {
        this.$root.eventHub.$emit("viewlistitem", row);
      } else {
        this.$root.eventHub.$emit("viewlistitem", row.id, row);
      }
    },
    notAllowed() {
      return false;
    },
    returnPerson(index, row, scope) {
      //			console.log(index, row, scope)
      if (row.returnState == 1) {
        return;
      } else {
        this.$root.eventHub.$emit("returnPerson", row.id);
      }
    },
    check(checkstr, num) {
      if (!checkstr) {
        return false;
      }
      var checklist = checkstr.split(",");
      num = String(num);
      return checklist.includes(num);
    }
  }
};
</script>
