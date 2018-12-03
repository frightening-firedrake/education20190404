<template>
	<div class="breadcrumbwrap">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<template v-if="breadcrumb.undefinedpath">
			    <el-breadcrumb-item>
			    	<span @click='backhome'>	
				    	<!--<i class="icon-home"></i>-->
				    	首页
			    	</span>
			    </el-breadcrumb-item>
			    <el-breadcrumb-item v-for="item in breadcrumbListsCache" :key="item.index" >{{item.name}}</el-breadcrumb-item>
				<el-breadcrumb-item >
			    	{{breadcrumb.undefinedpath}}
			    </el-breadcrumb-item>				
			</template>
			<template v-else>
				<!--<el-breadcrumb-item >-->
				<el-breadcrumb-item to="/index/home">
			    	<!--<i class="icon-home"></i>-->
			    	首页
			    </el-breadcrumb-item>
			    <!--<el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index" >{{item.name}}</el-breadcrumb-item>-->
			    <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index" :to='breadcrumbLink(index)'>{{item.name}}</el-breadcrumb-item>
			    <!--<el-breadcrumb-item v-for="item in breadcrumbList" :key="item.index" :to="item.path">{{item.name}}</el-breadcrumb-item>-->
			    <!--<el-breadcrumb-item v-for="item in breadcrumbList" :key="item.index" >{{item.name}}</el-breadcrumb-item>-->
			</template>
		</el-breadcrumb>
		
		<div class="bread_search" v-if="breadcrumb.search">
			<el-input
		    :placeholder="breadcrumb.searchPlaceholder?breadcrumb.searchPlaceholder:'请输入搜索信息'"
		    v-model="searching">
			    <button slot="suffix" class="el-input__icon el-icon-search" @click="searchingfor"></button>
			</el-input>
		</div>
	</div>
</template>

<script>

import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
	
//import "@/assets/style/common/Breadcrumb.css"
  export default {
    props: ['breadcrumb'],
    data() {
      return {
      	routeTest:'测试中哦！！！',
        searching:'',
		firstfalg:true,//第一次加载确定路由的开关
		breadcrumbListsCache:[],
      };
    },
//  beforeRouteEnter (to, from, next) {
//  	console.log('44354321213154')
//	    next(vm => {
//	        console.log(vm.routeTest)
//	    })
//	},
//	beforeRouteUpdate (to, from, next) {
//  	console.log(from)
//	},
//	watch:{	
//		'$route' (to, from) {
//	      	// 对路由变化作出响应...
//	      	console.log(32132131313213)
//	    }
//	},
    created(){
    	this.breadcrumbListFirst();
//  	console.log(this.$route)
		this.getBreadcrumbHistory();
    },

    methods:{
  		...mapMutations(['pushBreadcrumbHistory','spliceBreadcrumbHistory','statBreadcrumbHistory']),
    	searchingfor(){
      		this.$emit('searchingfor',this.searching,1)     		
    	},
    	backhome(){
//  		手动跳转
//			this.route_click();
    		this.$router.push({ path: '/index/home' });
    	},
    	breadcrumbListFirst() {
    		if(this.firstfalg){
	//	    	获取连接名按照"/"切分并反转
		        var breadcrumbName=this.$route.name.split('/').reverse();
	//	       	 等待返回的面包屑名字对应路径的对象数组
		        var breadcrumbLists=[];
		        	for(var i=0;i<breadcrumbName.length;i++){
		        		var breadcrumbItem={};
	//	        		获取名字
		        		breadcrumbItem.name=breadcrumbName[i];
	//	        		获取路径
		        		var breadcrumbPath=this.$route.fullPath.split('/');
	//	        		从后向前以"/"为节点裁掉/后面的路径并拼接回字符串
		        		breadcrumbPath.splice(-i,i);	        		
		        		breadcrumbItem.path=breadcrumbPath.join('/');
		        		breadcrumbItem.index=i;
		        		breadcrumbLists.unshift(breadcrumbItem);
		        	}    
		        this.firstfalg=false,
		        this.breadcrumbListsCache=breadcrumbLists;
		        return breadcrumbLists;
    		}else{
    			return this.breadcrumbListsCache;
    		}
	    },
	    getBreadcrumbHistory(){
	    	var name=this.$route.name;
	    	var fullPath=this.$route.fullPath;
	    	var res=name.match(/\//g).length;
	    	var payload={};
	    	payload.name=name;
	    	payload.fullPath=fullPath;

			if(res<2){
//				console.log('重置历史记录')
				this.statBreadcrumbHistory();

			}
//			查询历史
			var is_set=this.breadcrumbHistory.some((item,index)=>{
				return item.name==name
			})
//			获取历史记录
			if(is_set){
				this.spliceBreadcrumbHistory(payload);				
			}else{
//			新增历史
				this.pushBreadcrumbHistory(payload);				
			}
//			console.log(this.breadcrumbHistory)
	    },
	    breadcrumbLink(index){
	    	if(index==0){
	    		return this.breadcrumbList[index].path
	    	}else if(index!==0){	    		
	    		return this.breadcrumbHistory[index-1].fullPath
	    	}
	    },
    },
    computed: {
//  	...mapState(["modal_id_number","viewdata","editdata","aultdata","messions","mask"]),
		...mapGetters(["breadcrumbHistory"]),
	    breadcrumbList: function () {
//	    	获取连接名按照"/"切分并反转
	        var breadcrumbName=this.$route.name.split('/').reverse();
//	       	 等待返回的面包屑名字对应路径的对象数组
	        var breadcrumbLists=[];
	        	for(var i=0;i<breadcrumbName.length;i++){
	        		var breadcrumbItem={};
//	        		获取名字
	        		breadcrumbItem.name=breadcrumbName[i];
//	        		获取路径
	        		var breadcrumbPath=this.$route.fullPath.split('/');
//	        		从后向前以"/"为节点裁掉/后面的路径并拼接回字符串
	        		breadcrumbPath.splice(-i,i);	        		
	        		breadcrumbItem.path=breadcrumbPath.join('/');
	        		breadcrumbItem.index=i;
	        		breadcrumbLists.unshift(breadcrumbItem);
	        	}    
//	        	console.log(breadcrumbLists)
	        return breadcrumbLists;
	    }
	},
    mounted:function(){
//  	var curName=this.$route.name;
//      var curPath=this.$route.fullPath;
//      var breadcrumbPath=curPath.split('/');
//      var breadcrumbName=curName.split('/').reverse();
//      var breadcrumbLists=[];
//      	for(var i=0;i<breadcrumbName.length;i++){
//      		var breadcrumbItem={};
//      		breadcrumbItem.name=breadcrumbName[i];
//      		
//      		var breadcrumbPath=curPath.split('/');
//      		breadcrumbPath.splice(-i,i);
//      		
//      		breadcrumbItem.path=breadcrumbPath.join('/');
//      		breadcrumbLists.unshift(breadcrumbItem);
//      	}        
    }
  }
</script>

<style>
	/*面包屑导航*/
	.breadcrumbwrap{
		margin:0 -0.54rem;
		padding:0 0.4rem;
		height:0.6rem;
		line-height: 0.6rem;
		background-color: rgba(241, 241, 241, 1);
		position:relative;
		overflow: hidden;
	}
	.breadcrumbwrap .el-breadcrumb__inner a, .breadcrumbwrap .el-breadcrumb__inner.is-link{
		font-weight:500;
	}
	.breadcrumbwrap .el-breadcrumb__inner a:hover, .breadcrumbwrap .el-breadcrumb__inner.is-link:hover{
		color:rgb(51,51,51);
	}
	.breadcrumbwrap .el-breadcrumb{
		height:0.6rem;
		line-height: 0.6rem;
	}
	.breadcrumbwrap .el-breadcrumb__inner, .breadcrumbwrap .el-breadcrumb__inner a{
		font-size: 0.18rem;
		color:#333333;
		font-weight:400;
	}
	.breadcrumbwrap .el-breadcrumb__inner a:hover, .breadcrumbwrap .el-breadcrumb__inner:hover{
		/*color:rgb(55,142,248);*/
		color:rgb(51,51,51);
	}
	.breadcrumbwrap .el-breadcrumb__inner i.icon-home{
		color:rgb(55,142,248);
		font-size: 0.25rem;
    	vertical-align: -0.02rem;
	}
	.breadcrumbwrap .el-breadcrumb__separator{
		color: rgb(153,153,153);
		font-size:0.18rem;
		margin:0 0.02rem;
	}
	.breadcrumbwrap .el-breadcrumb__item:last-child .el-breadcrumb__inner,.breadcrumbwrap .el-breadcrumb__item:last-child .el-breadcrumb__inner a,.breadcrumbwrap .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .breadcrumbwrap .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
	    font-weight: 400;
	    color:#1a65b8;
	    /*color:#007c36;*/
	    cursor: text;
	}
	/*搜索*/
	div.bread_search{
		position:absolute;
		width:3.13rem;
		height:0.34rem;
		line-height: 0.34rem;
		top:0.13rem;
		right:0.41rem;
	}
	div.bread_search .el-input{
		height:100%;
		width:100%;
		padding:0;
		display: block;
		line-height:0.34rem;
	}
	div.bread_search .el-input input{
		height:100%;
		width:100%;
		background-color: #ffffff;
		border-radius: 0.16rem;
		border: solid 1px #bfbfbf;
		font-size:0.16rem;
		line-height:0.34rem;
	}
	div.bread_search .el-input__suffix{
		width:0.3rem;
	}
	div.bread_search .el-input--suffix .el-input__inner{
		padding-right:0.3rem;
	}
	div.bread_search .el-input__suffix .el-input__icon{
		line-height:0.34rem;
		font-size:0.2rem;
		color:#9eb0c3;
		border:none;
		background:rgba(0,0,0,0);
		outline:none;
		padding:0;
		cursor:pointer;
	}
</style>