<template>
    <div class='listpagewrap'>
      <!--面包屑-->
      <breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></breadcrumb>
      <!--alert-->
      <!--<prompt :alerts="alerts"></prompt>-->
      <!--表格上的时间选框以及 创建-->
      <list-header :listHeader="listHeader" @threadAreaChange="threadAreaChange" @stateChange="stateChange" @industryFieldChange="industryFieldChange" @informTypeChange="informTypeChange" @search="search"></list-header>
      <!--表格-->
      <list class="list nopointer" :tabledata="tabledatas"  :items="items" :actions="actions" v-on:getchecked="getchecked" :loading="loading" v-on:emptyCreate="emptyCreate" > 
      </list>
      <!--分页-->
      <pagination :page="page" v-on:paginationEvent="paginationEvent" v-on:getCurrentPage="getCurrentPage"></pagination>
    </div>
</template>

<script>
import List from '@/components/common/action/List.vue';
import Prompt from '@/components/common/prompt/Prompt.vue';
import Breadcrumb from '@/components/common/action/Breadcrumb.vue';
import Pagination from '@/components/common/action/Pagination.vue';
//import ListHeaderMore from '@/components/common/action/ListHeaderMore.vue';
import ListHeader from '@/components/common/action/ListHeader.vue';
import Modal from '@/components/common/action/Modal.vue';
import Message from "@/components/common/action/Message"
import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';

//这里是打印控件
//import {getLodop} from 'static/lodop/LodopFuncs'
//let LODOP
//本地测试要用下面import代码
import data from '@/util/mock';



export default {
  components: {
    List,Prompt,Pagination,Breadcrumb,Modal,ListHeader,Message
  },
  computed:{
	...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask"]),
	...mapGetters(["userName","stateList","Token"]),
	tabledatasFilter(){

		if(this.filterStatus=="全部"){
			return this.tabledatas;
		}else{
			return this.tabledatas.filter((value,index)=>{
				return value.sampleStatus==this.filterStatus
			})
		}

	}
  },
  created(){
  	this.listHeader.stateList=this.stateList
//	console.log(this.$route.query)
//  获取列表数据（第一页）
	this.getlistdata(1)
//	移除监听事件
    this.$root.eventHub.$off('delelistitem')
    this.$root.eventHub.$off("viewlistitem")
    this.$root.eventHub.$off("editlistitem")
    this.$root.eventHub.$off("printlistitem")
//	监听列表删除事件
    this.$root.eventHub.$on('delelistitem',function(rowid,list){
    	this.tabledatas=this.tabledatas.filter(function(item){
    		return item.id!==rowid;
    	})
    	this.sendDeleteId(rowid);
//  	console.log(rowid,list);
    }.bind(this)); 	
//	监听列表点击查看事件
  	this.$root.eventHub.$on("viewlistitem",function(id,row){  

//		if(!this.$_ault_alert('information:get')){
//			return
//		}
		this.$router.push({path: '/index/evilCriminalCases/comprehensiveCriminalCaseList/criminalCasesView',query:{id:id,state:row.state}})
		
  	}.bind(this));
  	//	监听列表点击编辑事件
  	this.$root.eventHub.$on("editlistitem",function(id){  
//		console.log(id)
		this.$router.push({path: '/index/sampleManagement/sampleIn/sampleInEdit',query:{id:id}})
		
  	}.bind(this));
  	//	监听列表点击打印事件
  	this.$root.eventHub.$on("printlistitem",function(code){  
		this.printitem(code);	
  	}.bind(this));
  },
  methods: {
  	...mapMutations(['create_modal_id','is_mask','create_modal','close_modal']),
  	...mapActions(['addAction']),
//	列表头触发的事件
//	时间选择
	dateChange(date){
//		console.log(date);
		this.dateStart=date[0];
		this.dateEnd=date[1];
		this.getlistdata(1)
	},
//	备注选择
	remChange(remark){
//		console.log(remark)
		this.remark=remark
		this.getlistdata(1)
	},
//	检验状态选择
	statusChange(data){
//		console.log(data)
		this.filterStatus=data
		this.getlistdata(1)
	},
//  	地域
	threadAreaChange(data){
		this.threadArea=data
		this.getlistdata(1)
	},
//  	案件进度
	stateChange(data){
		this.state=data
		this.getlistdata(1)
	},
//  	行业领域
	industryFieldChange(data){
		this.industryField=data
		this.getlistdata(1)
	},
//  	举报类型
	informTypeChange(data){
		this.informType=data
		this.getlistdata(1)
	},  
	//	搜索电话号码
	search(data){
		this.searchText=data
		this.getlistdata(1)
	},  
	emptyCreate(){
//		this.scanCode();
	},
//	获取搜索数据
  	searchingfor(searching,page){
  		page?page:1;
  		this.searchText=searching.indexOf('监')==0?searching.slice(1):searching;
//		console.log(this.searchText);
  		var params = {};
		params.sampleWordOrsampleNumLike = this.searchText;
		params.ruKuSampleState = 2
		params.fenxiaoyangSampleState = 3
		params.rank = 'sampleNum'
//		console.log(this.breadcrumb.searching);
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.searchURL,
			transformRequest: [function (data) {
				// Do whatever you want to transform the data
				let ret = ''
				for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {
				page:page,
			    rows:this.page.size,
			   	params:JSON.stringify(params)
			}
	    }).then(function (response) {
			this.tabledatas=response.data.rows;
	  		this.page.total=response.data.total;
	  		this.page.currentPage=page;
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
  
//	获取列表数据方法
  	getlistdata(page){
		var params = {};
		if(this.state!=='全部'){
			params.state=this.state
		}
		if(this.threadArea!=='全部'){
			params.threadArea=this.threadArea
		}
		if(this.industryField!=='全部'){
			params.industryField=this.industryField
		}
		if(this.informType!=='全部'){
			params.informType=this.informType
		}
		if(this.searchText){
			params.phoneNumber=this.searchText
		}

  		this.loading=false;
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.datalistURL,
			transformRequest: [function (data) {
				// Do whatever you want to transform the data
				let ret = ''
				for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {
				page:page,
			    rows:this.page.size,
				params:JSON.stringify(params),
				
			}
	    }).then(function (response) {
//			console.log(response)
		  	this.tabledatas=response.data.rows;
	  		this.page.total=response.data.total;
	  		this.page.currentPage=page;
	  		
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
  	//	发送删除id
  	sendDeleteId(id){
		this.$http({
		    method: 'post',
			url: this.deleteURL,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {
			    listName: this.list,
			    id:id,
			}
	    }).then(function (response) {
		  	
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
//	获取分页点击事件中及当前页码
    getCurrentPage(currentPage){
		if(this.searchText){			
			this.searchingfor(this.searchText,currentPage)
		}else{			
			this.getlistdata(currentPage)
		}
	},
//	映射分页触发的事件
  	paginationEvent(actiontype){
  		if(actiontype=='leading_out'){
  			console.log('leading_out')
  		}else if(actiontype=='refresh'){
  			// 获取列表数据（第一页）
			this.getlistdata(1)			
  		}
  	},
//	获取多选框选中数据的id(这是一个数组)
  	getchecked(checkedId){
  		this.checkedId=checkedId;
  	},
	titleEvent(){
  		console.log('titleEvent');
 	},
  	getDateNow(){
  		var date1=new Date()
  		return date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate()
  	},
  	printitem(code){
		this.messageShow=true;
		this.messages.type="loading";
		this.printCodeBar(code);
	},
  	printCodeBar(code){
		LODOP = getLodop();

		LODOP.PRINT_INIT("打印条码");
		LODOP.SET_PRINTER_INDEX("Godex G530");  
		LODOP.SET_PRINT_PAGESIZE(1, 700, 400, "USER");
		LODOP.ADD_PRINT_BARCODE(3,35,225,115,'128B',code);
//  	LODOP.PRINT_DESIGN();
//  	LODOP.PREVIEW();
		LODOP.PRINT(); 

	},
  },
  data() {
    return {
      datalistURL: '/grain/sample/data',
//    datalistURL: this.apiRoot+'information/data',
	  searchURL:this.apiRoot + '/grain/sample/data',
      deleteURL:'/liquid/role2/data/delete',
  	  state:"全部",
  	  threadArea:"全部",
//	  threadArea:"山西省",
  	  industryField:"全部",
  	  informType:"全部",
      searchText:'',
      sampleInTotal:0,
      checkedId:[],
	  dataBySampleNo: {},
	  depotList:[],
      counterList:[],
      placeList:[],
      continuity:true,//连续储存开关
      breadcrumb:{
      	search:false,   
      	searching:'',
      },
      subtitle:{
      	btn:false,
      	btntext:'',
      },
      loading:true,
      
//    分页数据
      page: {
        size: 10,
        total: 1,
        currentPage: 1,
        show:true,       
        tfootbtns:{
        	btns:false,//是否添加按钮组
        	leading_out:false,//导出按钮
        	refresh:false,//刷新按钮
        	delete:false, //删除按钮            	
        }
      },
//    弹窗数据
      alerts: [{
        title: '温馨提示：储存前请准备好条码打印机，以便于更换检验编号!',
        type: 'info'
      }],
//    表格数据
      listHeader:{
      	search:true,
      	placeholder:'请输入举报人电话',
      	date1:false,
      	date1Title:'储存时间：',
      	selectlib:false,
      	libraryList:[],
      	status:false,
      	statusTitle:'检验状态：',
      	statusitems:[
      		{label:'全部',text:'全部'},
      		{label:1,text:'未检测'},
      		{label:2,text:'已检测'},
      	],
      	stateList:[],
      	selectRem:false,
      	state:true,
      	threadArea:true,
      	industryField:true,
      	informType:true,
      	threadAreaList:[
      		{id:'山西省',threadAreaName:'山西省'},
      	],
      },
      libtype:'pLibrary',
      selectLibraryId:'全部',
//    remark:'',
      filterStatus:'全部',//检验状态
      dateStart:0,//开始时间
      dateEnd:9999999999999999999999999,//结束时间
      remark:'',//备注信息
      tabledatas:[],
      items: [
      {
        id: 1,
        prop:'threadArea',
        label: "线报地域",
//      status:true,
//      sort:true
      },
      {
        id: 2,
        prop:'clueAddress',
        label: "线报详址",
//      sort:true
      },
      {
        id: 3,
        prop:'industryField',
        label:"行业领域",
//      width:80,
//      sort:true,
      },
      {
        id: 4,
        prop:'informType',
        label: "举报类别",
//      minWidth:130,
//      width:'15%',
//      status:true,
//      sort:true,
      },
      {
        id: 5,
        prop:'phoneNumber',
        label:"举报人电话",
//      status:true,
//      width:80,
//      sort:true,
      },
      {
        id: 6,
//      prop:'sampleState',
        prop:'state',
        label:"案件进度",
        status:true,
//      width:80,
//      sort:true,
      },
//    {
//      id: 7,
//      prop:'assessor',
//      label:"审核员",
////      width:80,
////      sort:true,
//    },
      {
        id: 8,
        prop:'createTime',
        label:"举报时间",
//      width:80,
//      sort:true,
      },

      ],
      actions:{
      	selection:false,
      	number:false,
//    	view1:true,
      	edit:true,
      	show:true,
      	dele:true,
      	manuscript:false,
      	safetyReport:false,
      	printSampleIn:false,
      	actionWidth:150,
//    	sort:'sampleNum',
      },

    }
  }
}
</script>

