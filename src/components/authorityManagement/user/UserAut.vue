<template>
    <div class='listpagewrap'>
      <!--面包屑-->
      <sinograin-breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></sinograin-breadcrumb>
  	  <!--标题-->
  	  <sinograin-option-title :title="subtitle" v-on:titleEvent="titleEvent"></sinograin-option-title>		
      <!--提示-->
      <!--<sinograin-prompt :alerts="alerts"></sinograin-prompt>-->
      <!--表单-->
      <ault-tree :formdatas="formdatas" :tree="tree" @submit='submit'></ault-tree> 

      
    </div>
</template>

<style>
	
</style>

<script>

import SinograinPrompt from '@/components/common/prompt/Prompt.vue';
import SinograinBreadcrumb from '@/components/common/action/Breadcrumb.vue';
import AultTree from "@/components/common/action/AultTree"
import SinograinOptionTitle from "@/components/common/action/OptionTitle"


import "@/assets/style/common/list.css"
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
//本地测试要用下面import代码
//import data from '@/util/mock';



export default {
  components: {
    SinograinPrompt,SinograinBreadcrumb,SinograinOptionTitle,AultTree
  },
  computed:{
	...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask"]),
	...mapGetters(["modal_id"]),
  },
  created(){
  	console.log(this.$route.query)
//  获取列表数据（第一页）
	this.getdata()
	this.formdatas.form.userName=this.$route.query.name;
  },
  destroy(){

  },
  methods: {
  	...mapMutations(['create_modal_id','is_mask','create_modal','close_modal']),
  	...mapActions(['addAction']),
//	获取列表数据方法
  	getdata(page){
  		this.loading=true;
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
				id:this.$route.query.id
			}
	    }).then(function (response) {
		  	this.tree.data=response.data
		  	

		  		this.loading=false;
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

		  		this.loading=false;

		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
  	},
	titleEvent(){
  		console.log('titleEvent');
  	},
  	submit(data,tree){
		if(!this.$_ault_alert('user:auth')){
			return
		}
//		处理ids数据
  		var roleIds=[];
		tree.forEach((item)=>{
				roleIds.push(item.id)

		})
		roleIds=roleIds.join(',')
		this.$http({
		    method: 'post',
			url: this.authURL,
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
				userId:this.$route.query.id,
				roleIds:roleIds,
			}
	    }).then(function (response) {
			this.$router.go(-1)
			
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
//		console.log(roleIds)
//		console.log(data,tree);
  	}
  },
  data() {
    return {
      datalistURL:this.apiRoot +'user/getRoles',
      authURL:this.apiRoot +'user/auth',
      searchURL:'/liquid/role2/data/search',
      deleteURL:'/liquid/role2/data/delete',
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
      	title:'用户授权',
      	form:{
          userName: '',
//        maxNumber: '1',
//        remarks: '首页',
//        action:['查看','增加'],
//        resourceType:'2',
      	},
      	labels:[
      		{label:'用户名称：',type:"input",class:'full'},
//    		{label:'最大用户限制数：',type:"num",},
//    		{label:'备注：',type:"input",class:'full'},
//    		{label:'相关操作：',type:"checkbox",class:'full',
//	      		items:[
//	      			{label:'查看'},
//	      			{label:'增加'},
//	      			{label:'更改'},
//	      		],
//    		},
//    		{label:'资源类型：',type:"select",
//    			items:[
//	      			{label:'菜单1',value:'1'},
//	      			{label:'菜单2',value:'2'},
//	      			{label:'菜单3',value:'3'},
//	      		],
//    		},
      	],
 	  },     	

    tree:{
   		label:'用户授权：',
//	    defaultCheckedKeys:[1,2,3,4,5,6,8,15,16,17,18],//默认选中的key id
      	checkStrictly:true,//分割了上下父子选中关系
        data: [],
        defaultProps: {
            children: 'children',
            label: 'name'
        }
    }, 

      	
      	
      	

    }
  }
}
</script>

