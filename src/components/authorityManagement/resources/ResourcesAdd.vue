<template>
    <div class='listpagewrap'>
      <!--面包屑-->
      <sinograin-breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></sinograin-breadcrumb>
  	  <!--标题-->
  	  <sinograin-option-title :title="subtitle" v-on:titleEvent="titleEvent"></sinograin-option-title>		
      <!--提示-->
      <!--<sinograin-prompt :alerts="alerts"></sinograin-prompt>-->
      <!--表单-->
      <auth-form :btnloading="btnloading" :formdatas="formdatas" @submit='submit' @actionAdd="actionAdd" @actionDel='actionDel'></auth-form> 
    </div>
</template>

<style>
	
</style>

<script>

import SinograinPrompt from '@/components/common/prompt/Prompt.vue';
import SinograinBreadcrumb from '@/components/common/action/Breadcrumb.vue';
import AuthForm  from "@/components/common/action/AuthForm"
import SinograinOptionTitle from "@/components/common/action/OptionTitle"


import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
//本地测试要用下面import代码
import data from '@/util/mock';



export default {
  components: {
    SinograinPrompt,SinograinBreadcrumb,SinograinOptionTitle,AuthForm
  },
  computed:{
	...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask"]),
	...mapGetters(["modal_id"]),
  },
  created(){
  	console.log(this.$route.query)
//  获取列表数据（第一页）
	this.getResource()

  },
  destroy(){

  },
  methods: {
  	...mapMutations(['create_modal_id','is_mask','create_modal','close_modal']),
  	...mapActions(['addAction']),
//	获取列表数据方法
  	getResource(){
  		this.loading=false;
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.getResourceURL,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {
		
			}
	    }).then(function (response) {
//	    	操作项目波哥说不走后台了
//		  	response.data.operation.forEach((item)=>{
//				var obj={label:item.displayName,value:item.id}
//				this.formdatas.operationRIds.push(obj)
//			})
//		  	资源项目
		  	response.data.resource.forEach((item)=>{
				var obj={label:item.resourceName,value:item.id}
				this.formdatas.labels[2].items.push(obj)
			})
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
//	获取搜索数据
  	searchingfor(searching){
  		console.log(searching);
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.searchURL,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//			data: {
//			   
//			}
	    }).then(function (response) {
//		  	this.tabledatas=response.data.rows;
	  		setTimeout(()=>{			  		
		  		this.loading=false;
		  	},1000)
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
	titleEvent(){
  		console.log('titleEvent');
    },
  	actionAdd(){
  		var lastIndex=this.formdatas.actions.length-1;
  		var lastItem=this.formdatas.actions[lastIndex];
  		for(var key in lastItem){
  			if(!lastItem[key]){
  				this.$notify.error({
		          	title: '错误',
		          	message: '请先完善上一组操作项目'
		        });
		        return
  			}else{
  				
  			}
  		}
  		if(this.formdatas.actions.length){  			
	  		var lastOperation=this.formdatas.actions[this.formdatas.actions.length-1].operation
	      	var obj={label:lastOperation,value:lastOperation}
			this.formdatas.operationRIds.push(obj)
  		}
      	this.formdatas.actions.push({operation:'',permission:'',relyName:'' })
  	},
  	actionDel(){
  		this.$confirm('将删除最后一组操作项, 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning',
//	      callback:(action, instance)=>{
//
//	      	if(action=='confirm'){
//	//	    	删除操作组
//		    	this.formdatas.actions.pop()
//	//	    	删除操作下拉选项
//				if(this.formdatas.actions.length){					
//			  		var lastOperation=this.formdatas.actions[this.formdatas.actions.length-1].operation	    	
//					this.formdatas.operationRIds=this.formdatas.operationRIds.filter((item)=>{
//						return item.label!==lastOperation
//					})
//				}
//		      	this.$message({
//		        	type: 'success',
//		        	message: '删除成功!'
//		      	});
//	      	}else if(action=='cancel'){
//	      		this.$message({
//			       	type: 'info',
//			        message: '已取消删除'
//			    }); 
//	      	}
//	      }
//	    })
	    }).then(() => {
//	    	删除操作组
	    	this.formdatas.actions.pop()
//	    	删除操作下拉选项
			if(this.formdatas.actions.length){				
		  		var lastOperation=this.formdatas.actions[this.formdatas.actions.length-1].operation	    	
				this.formdatas.operationRIds=this.formdatas.operationRIds.filter((item)=>{
					return item.label!==lastOperation
				})
			}
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
  	},
  	submit(data){
		if(!this.$_ault_alert('resource:save')){
			return
		}
		
  		this.btnloading=true;
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.saveURL,
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
				resourceName:data.resourceName,
				resourceType:data.resourceType,
				resourcePId:data.resourcePId,
				params:JSON.stringify(data.actions),
			}
	    }).then(function (response) {
  			this.btnloading=false;
			this.$router.go(-1)
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
  },
  data() {
    return {
      getResourceURL:this.apiRoot +'resource/get/resourceAndOperation',
      saveURL:this.apiRoot +'resource/save',
      searchURL:'/liquid/role2/data/search',
      deleteURL:'/liquid/role2/data/delete',
      checkedId:[],
      btnloading:false,
	  createlibVisible:false,
      breadcrumb:{
      	search:false,   
      	searching:'',
      },
      subtitle:{
      	btn:false,
      	btntext:'',
      },
//    弹窗数据
      alerts: [{
        title: '温馨提示：此页面灰色字为不可编辑状态!',
        type: 'info'
      }],
      formdatas: {
      	title:'新建资源',
      	form:{
      	  resourceName:"",
      	  resourceType:1,
          resourcePId:"",
      	},
//    	操作相关的
      	actions:[
//    		{operation:'',permission:'',relyName:'' }
      	],
//    	依赖操作下拉项目
      	operationRIds:[
      		{label:'无',value:"无"},
      	],
      	labels:[
      		{label:'资源名称：',type:"input",class:'full'},
      		{label:'资源类型：',type:"select",
      			items:[
	      			{label:'菜单',value:1},
	      			{label:'元素',value:2},
	      			{label:'文件',value:3},
	      			{label:'操作',value:4},
	      		],
      		},
      		{label:'父级资源：',type:"select",
      			items:[
	      			{label:'无',value:-1},
	      		],
      		},
//    		{label:'分配角色：',type:"num",},
//    		{label:'备注：',type:"input",class:'full'},
//    		{label:'相关操作：',type:"checkbox",class:'full',
//	      		items:[
//	      			{label:'查看'},
//	      			{label:'增加'},
//	      			{label:'更改'},
//	      		],
//    		},
      	],
	  }
    }
  }
}
</script>

