<template>
	<div class="listHeader" :class="listHeader.class">
		<div class="dataSelete" v-if="listHeader.subtitle">
			<p>{{listHeader.title?listHeader.title:title}}</p>
		</div>
		<div class="status" v-if="listHeader.status">
			<p>
				{{listHeader.statusTitle?listHeader.statusTitle:'状态:'}}
			</p>
			<div>
			    <el-radio-group v-model="radio_status" text-color="white" fill="#ff4c78" @change="statusChange">
				    <!--<el-radio-button label="全部"></el-radio-button>
				    <el-radio-button label="未扦样"></el-radio-button>
				    <el-radio-button label="已扦样"></el-radio-button>-->
				    <el-radio-button v-for="item in listHeader.statusitems" :key="item.label" :label="item.label">{{item.text}}</el-radio-button>
				    
			    </el-radio-group>
			</div>
		</div>
		<!--这里加了个搜索框-->
		<div class="search"  v-if="listHeader.search">
			<el-input :placeholder="listHeader.placeholder" v-model="search" class="searchInputwrap">
			    <el-button slot="append" icon="el-icon-search" @click="searchingfor"></el-button>
			</el-input>
		</div>
		
		<div class="status2" v-if="listHeader.status2">
			<p>
				{{listHeader.statusTitle2?listHeader.statusTitle2:'状态:'}}
			</p>
			<div>
			    <el-radio-group v-model="radio_status2" text-color="white" fill="#1bb45f" @change="statusChange2">
				    <!--<el-radio-button label="全部"></el-radio-button>
				    <el-radio-button label="未扦样"></el-radio-button>
				    <el-radio-button label="已扦样"></el-radio-button>-->
				    <el-radio-button v-for="item in listHeader.statusitems2" :key="item.label" :label="item.label">{{item.text}}</el-radio-button>
				    
			    </el-radio-group>
			</div>
		</div>
		<div class="dataSelete" v-if="listHeader.date1">			
			<p>{{listHeader.date1Title?listHeader.date1Title:'创建时间:'}}</p>
			<div>
			    <el-date-picker
			    size='mini'
			    :clearable='false'
			    v-model="date_select"
			    type="daterange"
			    align="right"
			    unlink-panels
			    range-separator="—"
			    start-placeholder="开始日期"
			    end-placeholder="结束日期"
			    @change="dateChange"
			    >
			    </el-date-picker>
			</div>
		</div>
		<div class="dataSelete" v-if="listHeader.dateonyear">			
			<p>{{listHeader.dateonyearTitle?listHeader.dateonyearTitle:'创建时间:'}}</p>
			<div>
				
			    <el-date-picker
			    size='mini'
			    :clearable='false'
			    v-model="date_select"
			    type="daterange"
			    align="right"
			    unlink-panels
			    range-separator="—"
			    start-placeholder="开始日期"
			    end-placeholder="结束日期"
			    value-format="yyyy-MM-dd"
			    @change="dateChange2"
			    >
			    </el-date-picker>
			</div>
		</div>
		<div class="dataSelete year" v-if="listHeader.dateonlyyear">			
			<p>{{listHeader.dateonlyyearTitle?listHeader.dateonlyyearTitle:'创建时间:'}}</p>
			<div>			
			    <el-date-picker
			      size='mini'
			      :clearable='false'
			      v-model="date_select"
			      type="year"
			      @change="dateChange2"
			      value-format="yyyy"
			      placeholder="选择年份">
			    </el-date-picker>
			</div>
		</div>
		<!--下拉选择库点筛选-->
		<div class="dataSelete libSelete" v-if="listHeader.selectlib">			
			<p>选择库点:</p>
			<div>
			    <el-select class="lib1" v-model="selectlib"  placeholder="请选择库点" popper-class='headerSelectlib1' @change="selectlibChange1">
					<el-option  label="全部"  value="全部"></el-option>								        									        
					<el-option v-for="item2 in libraryList1" :label="item2.libraryName" :key="item2.id" :value="item2.id"></el-option>								        									        
				</el-select>
				<el-select class="lib2" v-model="selectlib2"  placeholder="请选择库点" popper-class='headerSelectlib1' @change="selectlibChange">
					<el-option  label="全部"  value="全部"></el-option>								        									        
					<el-option v-for="item3 in libraryList2" :label="item3.libraryName" :key="item3.id" :value="item3.id"></el-option>								        									        
				</el-select>
			</div>
		</div>

		<!--下拉筛选进度-->
		<div class="dataSelete Selete2 state" v-if="listHeader.state">			
			<p>案件进度:</p>
			<div>
			    <el-select v-model="state"  placeholder="请选择" popper-class='headerSelectlib11' @change="stateChange">
					<el-option  label="全部"  value="全部"></el-option>								        									        
					<el-option v-for="item4 in listHeader.stateList" :label="item4.name" :key="item4.id" :value="item4.id"></el-option>								        									        
				</el-select>
			</div>
		</div>
		<!--下拉选择任务筛选-->
		<div class="dataSelete Selete2 threadArea" v-if="listHeader.threadArea">			
			<p>线报地域:</p>
			<div>
			    <el-select v-model="threadArea"  placeholder="请选择" popper-class='headerSelectlib11' @change="threadAreaChange">
					<el-option  label="全部"  value="全部"></el-option>								        									        
					<el-option v-for="item4 in listHeader.threadAreaList" :label="item4.threadAreaName" :key="item4.id" :value="item4.id"></el-option>								        									        
				</el-select>
			</div>
		</div>
		<!--下拉筛选行业-->
		<div class="dataSelete Selete2 industryField" v-if="listHeader.industryField">			
			<p>行业领域:</p>
			<div>
			    <el-select v-model="industryField"  placeholder="请选择" popper-class='headerSelectlib11' @change="industryFieldChange">
					<el-option  label="全部"  value="全部"></el-option>								        									        
					<el-option v-for="item4 in industryFieldList" :label="item4.name" :key="item4.id" :value="item4.id"></el-option>								        									        
				</el-select>
			</div>
		</div>
		<!--下拉筛选类型-->
		<div class="dataSelete Selete2 informType" v-if="listHeader.informType">			
			<p>举报类型:</p>
			<div>
			    <el-select v-model="informType"  placeholder="请选择" popper-class='headerSelectlib11' @change="informTypeChange">
					<el-option  label="全部"  value="全部"></el-option>								        									        
					<el-option v-for="item4 in informTypeList" :label="item4.name" :key="item4.id" :value="item4.id"></el-option>								        									        
				</el-select>
			</div>
		</div>
		<!--备注信息筛选-->
		<div class="dataSelete remark" v-if="listHeader.remark">			
			<p>备注信息:</p>
			<div>
			    <el-autocomplete
			      	class="remark-input"
			      	v-model="remSelect"
			     	:fetch-suggestions="querySearch"
			      	placeholder="请填写类型"
			      	@select="remarkChange"
			      	select-when-unmatched
			    >
			    </el-autocomplete>
			</div>
		</div>
		<div class="btns">
			<template v-if="listHeader.createlib">				
				<div class="create" @click="createlib" style="background-image:url('static/images/sys/create.png');">
					新建库
				</div>
			</template>
			<template v-if="listHeader.addbtn">				
				<div class="create" @click="addbtn" style="background-image:url('static/images/sys/create.png');">
					{{listHeader.addbtn}}
				</div>
			</template>
			<template v-if="listHeader.scanCode">				
				<div class="scanCode" @click="scanCode">
					<span>
						<i class="iconfont icon-ccgl-yundanpicisaomiao-4-copy"></i>
						扫描条形码
					</span>					
				</div>
			</template>
			<template v-if="listHeader.autH">				
				<div class="create" @click="createAut" style="background-image:url('static/images/sys/create.png');">
					{{listHeader.autH}}
				</div>
			</template>
		</div>
		
		<div class="tableName" v-if="listHeader.tableNameShow">
			<template v-if="listHeader.editModel">
				<label for="">
					{{listHeader.tableNameTitle?listHeader.tableNameTitle:'扦样登记表名称：'}}
					<input type="text" v-model="listHeader.tableName" />
				</label>
			</template>
			<template v-else >
				<span v-html="listHeader.tableName"></span>
			</template>
		</div>
	</div>
</template>
<style>
	div.listHeader{
		width:auto;
		height: 0.54rem;
		line-height:0.54rem;
		border-radius: 0.1rem 0.1rem 0 0;
		border: solid 1px #d7d7d7;
		border-bottom: none;
		margin-top: 0.2rem;
		overflow:hidden;
	}
	div.listHeader.deep{
		border-color:#ccc;
	}
	div.listHeader.notop{
		margin-top: 0;
	}
	div.listHeader.noborder{
		border:0;
	}
	/*标题*/
	div.listHeader p{
		float:left;
		font-size:0.18rem;
		color:#000000;
		padding-left:0.35rem;
		position:relative;
		margin-right:0.11rem;
	}
	div.listHeader p:before{
		content:'';
		position:absolute;
		top:0.17rem;
		bottom:0.17rem;
		left:0.25rem;
		width:3px;
		background:#1bb45f;
	}
	/*按钮*/
	div.listHeader div.btns{
		height:100%;
		float:right;
		/*margin-right:0.13rem;*/
		padding:0.11rem;
	}
	div.listHeader div.btns div.create{
		float:left;
		height:0.32rem;
		line-height:0.32rem;
		/*width:1.07rem;*/
		padding-left:0.34rem;
		box-sizing: border-box;
		border-radius:0.05rem;
		border:1px solid #4c90db;
		color: #4c90db;
		font-size:0.2rem;
		text-align:right;
		background-repeat: no-repeat;
		background-position:0.04rem center;
		background-size:0.3rem 0.3rem;
		padding-right:0.07rem;
		cursor:pointer;
	}
	/*状态选择*/
	div.listHeader div.status{
		float:left;
		/*width:4rem;*/
	}
	div.listHeader div.status >p:before{
		background:#ff4c78;
	}
	div.listHeader div.status >div{
		float:left;
		max-width:11.5rem;
		line-height:0.54rem;
	}
	div.listHeader div.status >div .el-radio-group{
		float:left;
		/*margin-top:0.14rem;*/
		line-height: 0.54rem;
	}
	div.listHeader div.status .el-radio-button{
		height:0.26rem;
		line-height:0.26rem;
		border-radius:0.04rem;
		margin-right:0.15rem;
	}
	div.listHeader div.status .el-radio-button__inner{
		/*height:0.26rem;*/
		line-height:0.24rem;
		border-radius:0.04rem;
		padding:0 0.14rem;
		border: solid 0.01rem #d5d5d5;
		font-size:0.14rem;
		color: #999999;
		text-align: center;
	}
	div.listHeader.min div.status .el-radio-button__inner{
		width:0.7rem;
	}
	/*状态2*/
	div.listHeader div.status2{
		float:left;
		/*width:4rem;*/
	}
	div.listHeader div.status2 >p:before{
		background:#1bb45f;
	}
	div.listHeader div.dataSelete.remark >p:before{
		background:rgb(252, 101, 0);
	}
	div.listHeader div.status2 >div{
		float:left;
		/*width:2.85rem;*/
		line-height:0.54rem;
	}
	div.listHeader div.status2 >div .el-radio-group{
		float:left;
		margin-top:0.14rem;
	}
	div.listHeader div.status2 .el-radio-button{
		height:0.26rem;
		line-height:0.26rem;
		border-radius:0.04rem;
		margin-right:0.15rem;
	}
	div.listHeader div.status2 .el-radio-button__inner{
		height:0.26rem;
		line-height:0.24rem;
		border-radius:0.04rem;
		padding:0 0 0 0.2rem;
		border: solid 0.01rem #d5d5d5;
		font-size:0.14rem;
		color: #999999;
		text-align: center;
		width:0.7rem;
		position: relative;
	}
	div.listHeader div.status2 span.el-radio-button__inner:before{
		content:'';
		width:0.14rem;
		height:0.14rem;
		border-radius:50%;
		background-color:#666666;
		position:absolute;
		top:50%;
		left:0.06rem;
		margin-top:-0.07rem;
	}
	div.listHeader div.status2 .el-radio-button:nth-of-type(2) span.el-radio-button__inner:before{
		background-color:#38b63a;
	}
	div.listHeader div.status2 .el-radio-button:nth-of-type(3) span.el-radio-button__inner:before{
		background-color:#e2b028;
	}
	div.listHeader div.status2 .el-radio-button:nth-of-type(4) span.el-radio-button__inner:before{
		background-color:#c81212;
	}
	div.listHeader div.status2 .el-radio-button.is-active span.el-radio-button__inner:before{
		background-color:white;
	}
	/*时间选择*/
	div.listHeader div.dataSelete{
		float:left;
	}
	div.listHeader div.dataSelete >p:before{
		background:#1bb45f;
	}
	div.listHeader.blue div.dataSelete >p:before{
		background:#4c90db;
	}
	div.listHeader.red div.dataSelete >p:before{
		background:#e90a0a;
	}
	div.listHeader div.dataSelete.state >p:before{
		background:#fa8564;
	}
	div.listHeader div.dataSelete.threadArea >p:before{
		background:#fc9400;
	}
	div.listHeader div.dataSelete.industryField >p:before{
		background:#4b8fdb;
	}
	div.listHeader div.dataSelete.informType >p:before{
		background:#adc683;
	}
	div.listHeader div.dataSelete.mission >p:before{
		background:#ff4c78;

	}
	div.listHeader div.dataSelete >div{
		float:left;
		width:3rem;
		line-height:0.54rem;
	}
	div.listHeader div.libSelete >div{
		float:left;
		width:4rem;
		line-height:0.54rem;
	}
	div.listHeader .el-date-editor{
		width:3rem;
		height:0.32rem;
		/*line-height:0.32rem;*/
		border-radius:0.05rem;
		border:1px solid #58b481;
		color: #58b481;
		font-size:0.2rem;
		padding:0 0.15rem;
		display:inline-flex;
	}
	div.listHeader .el-range-editor.is-active, div.listHeader .el-range-editor.is-active:hover{
		border-color:#58b481;
	}
	div.listHeader .el-date-editor .el-range-separator{
		padding:0;
	}
	div.listHeader .year .el-input--mini .el-input__inner{
		border:none;
		line-height: inherit;
		height:100%;
		font-size:0.14rem;
	}
	div.listHeader .year .el-input__prefix{
		line-height: 20px;
	}
	div.listHeader .year .el-icon-date{
		line-height: 20px;
	}
	/*扫码按钮*/
	div.listHeader div.btns .scanCode{
		float:left;
		height:0.4rem;
		line-height: 0.33rem;
		margin-left:0.3rem;
		font-size: 0.24rem;
		cursor: pointer;
		background-color: #58b481;
		border-radius: 0.05rem;
		box-sizing: border-box;
		padding:0.04rem;
		color:#ffffff;
		margin-top:-0.04rem;
	}
	div.listHeader div.btns .scanCode span{
		border:1px solid #FFFFFF;
		border-radius:0.04rem;
		padding:0 0.1rem;
		font-weight: 500;
	}
	div.listHeader div.btns .scanCode i{
		color:#ffffff;
		font-size:0.24rem;
	}
	/*表单标题*/
	div.listHeader div.tableName{
		width:100%;
		height:100%;
		background:#eeeeee;
		text-align: center;
		color:#333333;
		font-size:0.2rem;
	}
	div.listHeader div.tableName label{
		color:#333333;
		font-size:0.2rem;
	}
	div.listHeader div.tableName input{
		font-size:0.2rem;
		color:#333333;
		outline: none;
		/*background:rgba(0,0,0,0);
		text-align: center;
		border:none;
		width:4rem;*/
	}
	div.listHeader .el-select{
		/*margin-left:0.2rem;*/
	}
	div.listHeader  .el-select .el-input .el-input__suffix i{
		line-height:0.54rem;
	}
	div.listHeader div.Selete2 >div{
		float:left;
		width:1.8rem;
		/*line-height:0.54rem;*/
		line-height:inherit;
	}
	div.listHeader .el-select .el-input input{
		/*height:0.36rem;
		line-height:0.34rem;*/
		height:0.26rem;
		line-height:0.24rem;
		width:100%;
		border:solid  0.01rem #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		border-radius:0;
	}
	div.listHeader .libSelete .el-select.lib1 .el-input input{
		height:0.36rem;
		width:1.25rem;
		line-height:0.34rem;
		border:solid  0.01rem #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		border-radius:0;
		text-align: center;
	}
	div.listHeader .libSelete .el-select.lib2 .el-input input{
		height:0.36rem;
		width:2.25rem;
		line-height:0.34rem;
		border:solid  0.01rem #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		border-radius:0;
		text-align: center;
	}
	div.listHeader .libSelete .el-select .el-input input{
		height:0.36rem;
		width:3rem;
		line-height:0.34rem;
		border:solid  0.01rem #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		border-radius:0;
		text-align: center;
	}
	.headerSelectlib1{
		text-align:center;
	}
	div.listHeader .remark-input .el-input__inner{
	    height:0.36rem!important;
		width:2.75rem;
		line-height:0.34rem;
		border:solid 0.01rem #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		border-radius:0;
		/*margin-left:0.2rem;*/
	}
	/*检测项目那个超长超恶心的筛选*/
	div.listHeader.checks{
		height: 1.62rem;
	}
	/*搜索框*/
	div.listHeader .search{
		width:3rem;
		float:left;
		/*line-height:0.54rem;*/
		line-height:inherit;
		padding-left:0.16rem;
	}
	div.listHeader .search .searchInputwrap{

	}
	div.listHeader .search .searchInputwrap input{
		height:0.32rem;
		border-radius:0.16rem 0 0 0.16rem;
		font-size:0.16rem;
		border-color:#dfdfdf;
		background-color: #f2f2f2;
	}
	div.listHeader .search .searchInputwrap .el-input-group__append{
		border-radius:0 0.16rem 0.16rem 0;
		background-color: #4c90db;
		padding:0 0.1rem;
		border-color:#4c90db;
	}
	div.listHeader .search .searchInputwrap .el-input-group__append i{
		font-size:0.2rem;
		color:white;
	}
</style>
<script>
//import SinograinModal from '@/components/common/action/Modal.vue';
import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';

export default {
    props: ['listHeader'],
    data() {
        return {
        	true:true,
        	false:false,
        	pickerOptions2: {
		        shortcuts: [{
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		        }, {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		        }, {
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		              picker.$emit('pick', [start, end]);
		            }
		        }]
	        },	
	        date_select: '',
	        radio_status:'全部',
	        radio_status2:'全部',
	        selectlib:'全部',
	        selectlib2:'全部',
	        selectTask:'全部',
		    remSelect:'',
		    informType:'全部', //举报类别
		    threadArea:'山西省', //地域
			industryField:'全部', //行业领域
			state:'全部', //案件进度
			search:'',//
//		   	 筛选列表
//	  	  	restaurants: [{"value": "春季抽查"},{"value": "秋季普查"},{"value": "2017年度轮换验收"},{"value": "2018年度轮换验收"},{"value": "收购巡查"}],
        };
    },
    created(){

    },
    methods:{
//  	...mapMutations(['route_click']),
    	dateChange(){
//  		console.log(this.date_select);
			var datearr=[];
			    datearr[0]=Date.parse(this.date_select[0]);
			    datearr[1]=Date.parse(this.date_select[1]);
//			console.log(datearr)
    		this.$emit('dateChange',this.date_select);
    	},
    	dateChange2(){
//  		console.log(this.date_select);
    		this.$emit('dateChange',this.date_select);
    	},
    	searchingfor(){
    		this.$emit('search',this.search);
    	},
    	selectlibChange1(){
			this.selectlib2='全部';
			this.$emit('selectlibChange','pLibraryId',this.selectlib);
    	},
    	selectlibChange(){
    		if(this.selectlib2=='全部'){
    			this.$emit('selectlibChange','pLibraryId',this.selectlib);
    		}else{
    			this.$emit('selectlibChange','libraryId',this.selectlib2);
    		}
    	},	
//  	地域
    	threadAreaChange(){
			this.$emit('threadAreaChange',this.threadArea);
    	},
//  	案件进度
    	stateChange(){
			this.$emit('stateChange',this.state);
    	},
//  	行业领域
    	industryFieldChange(){
			this.$emit('industryFieldChange',this.industryField);
    	},
//  	举报类型
    	informTypeChange(){
			this.$emit('informTypeChange',this.informType);
    	},
    	statusChange(){
//  		console.log(this.radio_status)

    		this.$emit('statusChange',this.radio_status);
    	},
    	statusChange2(){
//  		console.log(this.radio_status)

    		this.$emit('statusChange2',this.radio_status2);
    	},
    	createSampling(){
//  		console.log('createSampling');
    		this.$emit('createSampling');
    	},
    	createPackling(){
//  		console.log('createSampling');
    		this.$emit('createPackling');
    	},
    	createAut(){
//  		console.log('createSampling');
    		this.$emit('createAut');
    	},
    	addbtn(){
    		this.$emit('addbtn');	
    	},
    	createlib(){
//  		console.log('createlib');
    		this.$emit('createlib');
    	},
    	scanCode(){
    		this.$emit('scanCode');
    	},
		connect(){
			this.$emit("connect")
		},
		querySearch(queryString, cb){
	        var restaurants = this.remarkses;
	        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
		},
		createFilter(queryString) {
	    	return (restaurant) => {
	      		return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	    	};
	  	},
	  	remarkChange(val){
	  		this.remSelect=val.value
	  		this.$emit('remChange',this.remSelect)
	  	},
    },
    computed: {
  		...mapGetters(["remarkses","informTypeList","industryFieldList","stateList"]),
	    subtitle(){
	    	return this.listHeader.subtitle;
//          const route = this.$route.name.split("/")
//          return route[route.length-1]
       },
       	libraryList1(){
//	    	if(this.selectlib=='全部'){
//	    		return [];
//	    	}else{    		
	    		return	this.listHeader.libraryList.filter((item)=>{
	    			return item.pLibraryId==-1
	    		})
//	    	}
	    },
	    libraryList2(){
	    	if(this.selectlib=='全部'){
	    		return [];
	    	}else{    		
	    		return	this.listHeader.libraryList.filter((item)=>{
	    			return item.pLibraryId==this.selectlib
	    		})
	    	}
	    },
	    title(){
            const route = this.$route.name.split("/")
            return route[route.length-1]
        }
	},
    mounted:function(){
 
    }
}
</script>