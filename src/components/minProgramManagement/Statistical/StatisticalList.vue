<template>
    <div class='listpagewrap StatisticalList'>
      	<!--面包屑-->
      	<breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></breadcrumb>
	  	<div class="StatisticalListRow" style="padding-top:0.28rem;">
	  		<div class="StatisticalListItemWrap part4" v-for="(value, key, index) in carList" :key="key">
	  			<div class="card">
	  				<div class="icon" :style="carListStyle[index].img"></div>
	  				<div class="content">
	  					<div class="title">{{carListStyle[index].title}}</div>
	  					<div class="data" :style="carListStyle[index].font">{{value}}</div>
	  				</div>
	  			</div>
	  		</div>
	  		<div class="clear"></div>
	  	</div>
	  	<div class="StatisticalListRow">
		  	<div class="StatisticalListItemWrap part2">
		  		<list-header :listHeader="listHeader1" @search="search"></list-header>
	      		<list class="list nopointer" :tabledata="tabledatas1"  :items="items1" :actions="actions1" :loading="loading1" > 
	      		</list>
	      		<pagination :page="page1" v-on:getCurrentPage="getCurrentPage1"></pagination>
		  	</div>
		  	<div class="StatisticalListItemWrap part2">
		  		<list-header :listHeader="listHeader2"></list-header>
	      		<list class="list nopointer" :tabledata="tabledatas2"  :items="items2" :actions="actions2" :loading="loading2"> 
	      		</list>
	      		<pagination :page="page2" v-on:getCurrentPage="getCurrentPage2"></pagination>
		  	</div>
	  		<div class="clear"></div>
		  	
	  	</div>
 
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
import "@/assets/style/common/StatisticalList.css"
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
	...mapState([]),
	...mapGetters(["userName","Token"]),

  },
  created(){

//	console.log(this.$route.query)
//  获取列表数据（第一页）
	this.getlistdata1(1)
	this.getlistdata2(1)
//	移除监听事件
    this.$root.eventHub.$off('delelistitem')
    this.$root.eventHub.$off("viewlistitem")


//	监听列表删除事件
    this.$root.eventHub.$on('delelistitem',function(rowid,list){
      	this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			this.tabledatas2=this.tabledatas2.filter(function(item){
	    		return item.id!==rowid;
	    	})
			//  	this.sendDeleteId(rowid);
		    this.$message({
		        type: 'success',
		        message: '删除成功!'
		    });
		}).catch(() => {
			this.$message({
				type: 'info',
				message: '已取消删除'
			});
		});
    	
//  	console.log(rowid,list);
    }.bind(this)); 	
//	监听列表点击查看事件
  	this.$root.eventHub.$on("viewlistitem",function(id,row){  

//		if(!this.$_ault_alert('information:get')){
//			return
//		}
		this.$router.push({path: '/index/minProgramManagement/StatisticalList/StatisticalView',query:{id:id}})
		
  	}.bind(this));

  },
  destroy(){
  	this.$root.eventHub.$off("viewlistitem")
  	this.$root.eventHub.$off('delelistitem')
  },
  methods: {
  	...mapMutations([]),
  	...mapActions([]),
//	列表头触发的事件
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
  	getlistdata1(page){
		var params = {};
		if(this.searchText){
			params.phoneNumber=this.searchText
		}

  		this.loading1=false;
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.datalistURL1,
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
			    rows:this.page1.size,
				params:JSON.stringify(params),
				
			}
	    }).then(function (response) {
//			console.log(response)
		  	this.tabledatas1=response.data.rows;
	  		this.page1.total=response.data.total;
	  		this.page1.currentPage=page;
	  		
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
//	获取列表数据方法
  	getlistdata2(page){
		var params = {};

  		this.loading2=false;
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.datalistURL2,
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
			    rows:this.page2.size,
				params:JSON.stringify(params),
				
			}
	    }).then(function (response) {
//			console.log(response)
		  	this.tabledatas2=response.data.rows;
	  		this.page2.total=response.data.total;
	  		this.page2.currentPage=page;
	  		
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
    getCurrentPage1(currentPage){
		if(this.searchText){			
			this.searchingfor(this.searchText,currentPage)
		}else{			
			this.getlistdata1(currentPage)
		}
	},
	getCurrentPage2(currentPage){
		this.getlistdata2(currentPage)
	},
	titleEvent(){
  		console.log('titleEvent');
 	},
  	getDateNow(){
  		var date1=new Date()
  		return date1.getFullYear()+'-'+(date1.getMonth()+1)+'-'+date1.getDate()
  	},

  },
  data() {
    return {
      datalistURL1: 'test/dataStatistical',
      datalistURL2: 'account/dataRiskAssessment',
//    datalistURL: this.apiRoot+'information/data',
	  searchURL:this.apiRoot + '/grain/sample/data',
      deleteURL:'/liquid/role2/data/delete',
      carList:{
      	testSum:139,
      	testerSum:6280,
      	testPass:"98%",
      	testUnpass:"2%",
      },
      carListStyle:[
      	{title:'平台总题数',font:"color:#dbc24c;",img:"background-color:#dbc24c;background-image:url('/static/images/sys/icon1.png');"},
      	{title:'平台总测试人数',font:"color:#4c90db;",img:"background-color:#4c90db;background-image:url('/static/images/sys/icon2.png');"},
      	{title:'平台测试合格率',font:"color:#36cebe;",img:"background-color:#36cebe;background-image:url('/static/images/sys/icon3.png');"},
      	{title:'平台测试危险率',font:"color:#f16b74;",img:"background-color:#f16b74;background-image:url('/static/images/sys/icon4.png');"},
      ],
      searchText:'',
      breadcrumb:{
      	search:false,   
      	searching:'',
      },
      loading1:false,
      loading2:false,
//    分页数据1
      page1: {
        size: 10,
        total: 1,
        currentPage: 1,
        show:true,       
        tfootbtns:{},
      },
//    分页数据2
      page2: {
        size: 10,
        total: 1,
        currentPage: 1,
        show:true,    
        tfootbtns:{},
      },
//    弹窗数据
      alerts: [{
        title: '温馨提示：储存前请准备好条码打印机，以便于更换检验编号!',
        type: 'info'
      }],
//    表格数据1
      listHeader1:{
      	search:true,
      	placeholder:'请输入标题名称',
      	class:'blue',
      },
    
      tabledatas1:[],
      items1: [
      {
        id: 1,
        prop:'title',
        label: "标题名称",
//      minWidth:130,
//      width:'15%',
//      status:true,
//      sort:true,
      },
      {
        id: 2,
        prop:'passPercentage',
        label:"合格率",
        width:80,
        status:true,
//      sort:true,
      },
      ],
      actions1:{
      	number:true,
      	view1:true,
      	show:true,
      	actionWidth:90,
      },
//    表格数据1
      listHeader2:{
      	subtitle:true,
      	title:'危险评测表榜单',
      	class:'red',
      },
      tabledatas2:[],
      items2: [
      {
        id: 1,
        prop:'account',
        label: "学号",
//      status:true,
//      sort:true
      },
      {
        id: 2,
        prop:'sex',
        label: "性别",
        width:80,
//      sort:true
      },
      {
        id: 3,
        prop:'weixinNum',
        label:"微信号",
//      width:80,
//      sort:true,
      },
      {
        id: 4,
        prop:'riskAssessment',
        label: "危险测评题数",
        status:true,
//      minWidth:130,
//      width:'15%',
//      status:true,
//      sort:true,
      },
      ],
      actions2:{
      	show:true,
      	dele:true,
      	actionWidth:90,
      },
    }
  }
}
</script>

