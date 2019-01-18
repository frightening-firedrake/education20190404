<template>
    <div class='listpagewrap'>
      <!--面包屑-->
      <sinograin-breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></sinograin-breadcrumb>
      <!--alert-->
      <sinograin-prompt :alerts="alerts"></sinograin-prompt>
      <!--表格上的时间选框以及 创建-->
      <list-header :listHeader="listHeader" v-on:dateChange="dateChange" v-on:statusChange="statusChange" v-on:createSampling="createSampling" v-on:createlib="createlib" @createAut="createAut"></list-header>
      <!--表格-->
      <sinograin-list class="list nopointer" :tabledata="tabledatas" :list="list" :items="items" :actions="actions" :rowType="rowType" v-on:getchecked="getchecked" :loading="loading" v-on:emptyCreate="emptyCreate" > 
      </sinograin-list>
      <!--分页-->
      <sinograin-pagination :page="page" v-on:paginationEvent="paginationEvent" v-on:getCurrentPage="getCurrentPage"></sinograin-pagination>
      <!--输入弹框-->
      <sinograin-modal v-if="modalVisible" :modal="modal" v-on:createlibitem="createlibitem" v-on:dialogClose="dialogClose"></sinograin-modal>      	
    </div>
</template>

<style>
	
</style>

<script>
import SinograinList from '@/components/common/action/List.vue';
import SinograinPrompt from '@/components/common/prompt/Prompt.vue';
import SinograinBreadcrumb from '@/components/common/action/Breadcrumb.vue';
import SinograinPagination from '@/components/common/action/Pagination.vue';
import ListHeader from '@/components/common/action/ListHeader.vue';
import SinograinModal from '@/components/common/action/Modal.vue';
import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
//本地测试要用下面import代码
import data from '@/util/mock';



export default {
  components: {
    SinograinList,SinograinPrompt,SinograinPagination,SinograinBreadcrumb,SinograinModal,ListHeader
  },
  computed:{
	...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask"]),
	...mapGetters(["modal_id"]),
  },
  created(){
//  获取列表数据（第一页）
	this.getlistdata(1)
//	移除监听事件
    this.$root.eventHub.$off('delelistitem')
    this.$root.eventHub.$off("editlistitem")
    this.$root.eventHub.$off("authlistitem")
//	监听列表删除事件
    this.$root.eventHub.$on('delelistitem',function(rowid,list){
    	this.sendDeleteId(rowid);
//  	console.log(rowid,list);
    }.bind(this)); 	
//	监听列表点击编辑事件
  	this.$root.eventHub.$on("editlistitem",function(id){  
		if(!this.$_ault_alert('role:edit')){
			return
		}
//		console.log(id)
		this.$router.push({path: '/index/AuthorityManagement/RoleList/RoleEdit',query:{id:id}})
  	}.bind(this));
//	监听列表点击授权事件
  	this.$root.eventHub.$on("authlistitem",function(row){  
		if(!this.$_ault_alert('role:auth')){
			return
		}
		this.$router.push({path: '/index/AuthorityManagement/RoleList/RoleAut',query:{id:row.id,name:row.displayName}})
  	}.bind(this));
  },
  destroy(){
  	this.$root.eventHub.$off("editlistitem")
  	this.$root.eventHub.$off('authlistitem')
  	this.$root.eventHub.$off('delelistitem')
  },
  methods: {
  	...mapMutations(['create_modal_id','is_mask','create_modal','close_modal']),
  	...mapActions(['addAction']),
//	列表头触发的事件
	dateChange(data){
		console.log(data);
	},
	statusChange(data){
		console.log(data)
	},
	createSampling(){
//		console.log('createSampling');
		this.$router.push({path: '/index/sampling/libraryList/samplingList/samplingListCreate'})
	},
//	新建授权项目
	createAut(){
		if(!this.$_ault_alert('role:save')){
			return
		}
		this.$router.push({path: '/index/AuthorityManagement/RoleList/RoleAdd'})		
	},
	emptyCreate(){
//		this.createlib();
	},
//	打开新建弹框
	createlib(){
		this.modalVisible=true;
	},
//	填入新建数据
	createlibitem(data){
		console.log(data);
	},
//	关闭新建弹框
	dialogClose(){
		this.modalVisible=false;
	},
//	获取搜索数据
  	searchingfor(searching,page){
  		page?page:1;
  		this.searchText=searching;
  		var params = {};
		params.displayNameLike = searching;
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
			    params:JSON.stringify(params),
			    page:page,
			    rows:this.page.size,
			}
	    }).then(function (response) {
			this.tabledatas=response.data.rows;
	  		this.page.total=response.data.total;

		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
//	获取列表数据方法
  	getlistdata(page){
//		this.loading=true;
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
			}
	    }).then(function (response) {
		  	this.tabledatas=response.data.rows;
	  		this.page.total=response.data.total;
		  	this.loading=false;

		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
  	//	发送删除id
  	sendDeleteId(id){
		this.$http({
		    method: 'post',
			url: this.deleteURL,
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
			    id:id,
			}
	    }).then(function (response) {
		  	this.tabledatas=this.tabledatas.filter(function(item){
	    		return item.id!==rowid;
	    	})
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

  },
  data() {
    return {
      datalistURL:this.apiRoot +'role/data',
      searchURL:this.apiRoot +'role/data',
      deleteURL:'/liquid/role/data/delete',
      searchText:'',
      checkedId:[],
      rowType:'角色',
      list:"librarylist",
	  modalVisible:false,
	  modal:{
	  	title:'新建库点',
		formdatas:[
	  		{
	  			label:"单位名称",
	  			model:"unit",
	  		},
	  		{
	  			label:"库点名称",
	  			model:"lib",
	  		},
	  	],
	  	submitText:'确定',
	  },
      breadcrumb:{
//    	search:true,   
      	searching:'',
      },
      loading:false,
//    分页数据
      page: {
        size: 10,
        total: 0,
        currentPage: 1,
        show:true,
        tfootbtns:{
        	btns:false,//是否添加按钮组
        	leading_out:true,//导出按钮
        	refresh:true,//刷新按钮
        	delete:true, //删除按钮            	
        }
      },
//    弹窗数据
      alerts: [{
//      title: '温馨提示：此页面展示的角色列表页面，您在本页面可以对角色进行查看、编辑、删除、授权以及批量删除和新建的操作。单击右方x号，你可以关闭此条提示语！',
        title: '温馨提示：此页面展示的角色列表页面，您在本页面可以对角色进行编辑、授权和新建的操作。单击右方x号，你可以关闭此条提示语！',
        type: 'info'
      }],
//    表格数据
      listHeader:{
      	createlib:false,
      	createSampling:false,
      	status:false,
      	date:false,
      	autH:"新建角色",
      },
      tabledatas:[],
      items: [
      {
        id: 1,
        prop:'displayName',
        label: "角色名称",
//      sort:true
      },
      {
        id: 2,
        prop:'roleMaxNum',
        label: "最大限制用户数",
//      sort:true,
      },
      {
        id: 3,
        prop:'remarks',
        label:"备注信息",
//      sort:true,
      },
      ],
      actions:{
      	selection:false,
      	number:false,
      	view:false,
      	edit:true,
      	dele:false,
      	auth:true,
      	show:true,
      	noview:true,
      	actionWidth:150,
      }
    }
  }
}
</script>