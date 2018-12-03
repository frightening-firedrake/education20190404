<template>
    <div class='listpagewrap'>
      <!--面包屑-->
      <sinograin-breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></sinograin-breadcrumb>
  	  <!--标题-->
  	  <sinograin-option-title :title="subtitle" v-on:titleEvent="titleEvent"></sinograin-option-title>		
      <!--提示-->
      <!--<sinograin-prompt :alerts="alerts"></sinograin-prompt>-->
      <!--表单-->
      <auth-form-edit :formdatas="formdatas" @submit='submit' @actionAdd="actionAdd" @actionDel='actionDel'></auth-form-edit> 
    </div>
</template>

<style>
	
</style>

<script>

import SinograinPrompt from '@/components/common/prompt/Prompt.vue';
import SinograinBreadcrumb from '@/components/common/action/Breadcrumb.vue';
import AuthFormEdit  from "@/components/common/action/AuthFormEdit"
import SinograinOptionTitle from "@/components/common/action/OptionTitle"


import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
//本地测试要用下面import代码
import data from '@/util/mock';



export default {
  components: {
    SinograinPrompt,SinograinBreadcrumb,SinograinOptionTitle,AuthFormEdit
  },
  computed:{
	...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask"]),
	...mapGetters(["modal_id"]),
  },
  created(){
  	console.log(this.$route.query)
//  获取列表数据（第一页）
	this.getResource()
	this.getdata()
	
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
			transformRequest: [function (data) {
				// Do whatever you want to transform the data
				let ret = ''
				for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
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
  	getdata(){
  		this.loading=false;
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.datalistURL,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: [function (data) {
				// Do whatever you want to transform the data
				let ret = ''
				for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			data: {
				resourceId:this.$route.query.id,
			}
	    }).then(function (response) {

			this.formdatas.form.resourceName=response.data.resourceName;
		  	this.formdatas.form.resourcePId=response.data.resourcePId;
		  	this.formdatas.form.resourceType=response.data.resourceType;
		  	response.data.listDTO.forEach((item)=>{

				var obj={id:item.id,operation:item.operation,permission:item.permission,relyName:item.relyName}
				if(this.formdatas.actions.length){  			
			  		var lastOperation=this.formdatas.actions[this.formdatas.actions.length-1].operation
			      	var obj2={label:lastOperation,value:lastOperation}
					this.formdatas.operationRIds.push(obj2)
		  		}
				this.formdatas.actions.push(obj)
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
  			if(!lastItem[key]&&lastItem[key]!==0){
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
      	this.formdatas.actions.push({id:0,operation:'',permission:'',relyName:'' })
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
	    	var lostItem=this.formdatas.actions.pop()
	    	
	    	if(lostItem.id){
	    		this.$http({
				    method: 'post',
					url: this.deleteURL,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					transformRequest: [function (data) {
						// Do whatever you want to transform the data
						let ret = ''
						for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}],
					data: {
						operationId:lostItem.id,
					}
			    }).then(function (response) {
		
					
				}.bind(this)).catch(function (error) {
				    console.log(error);
				}.bind(this));
	    	}
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
//		console.log(data)
		if(!this.$_ault_alert('resource:edit')){
			return
		}
  		this.loading=false;
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.editURL,
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
				id:this.$route.query.id,
				resourceName:data.resourceName,
				resourceType:data.resourceType,
				resourcePId:data.resourcePId,
				params:JSON.stringify(data.actions),
			}
	    }).then(function (response) {
			this.$router.go(-1)
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
  },
  data() {
    return {
      datalistURL:this.apiRoot +'resource/checkResource',
      getResourceURL:this.apiRoot +'resource/get/resourceAndOperation',
      editURL:this.apiRoot +'resource/edit',
      searchURL:'/liquid/role2/data/search',
      deleteURL:this.apiRoot +'resource/delete',
      checkedId:[],
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
      	title:'编辑资源',
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
      		{label:'资源名称：',type:"input",class:'disabled full',disabled:true,},
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

