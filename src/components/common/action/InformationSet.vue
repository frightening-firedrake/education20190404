<template>
    <div class="imsetwrap">
    	<div class="tabletitle">    		
    		<p>{{title}}列表</p>
    		<div class="btns">		
				<div class="create" @click="add" style="background-image:url('static/images/sys/create.png');">
					添加{{title}}
				</div>		
			</div>
    	</div>
		<div class="tableHeader">		
			<el-col  :span="24" class="right">
				<el-col  :span="8">					
					<el-col  :span="5" class="index">序号</el-col >
					<el-col  :span="19" class="content">{{title}}名称</el-col >
					<!--<el-col  :span="5" class="action">操作</el-col >-->
				</el-col >
				<el-col  :span="8">					
					<el-col  :span="5" class="index">序号</el-col >
					<el-col  :span="19" class="content">{{title}}名称</el-col >
					<!--<el-col  :span="5" class="action">操作</el-col >-->
				</el-col >
				<el-col  :span="8">					
					<el-col  :span="5" class="index">序号</el-col >
					<el-col  :span="19" class="content">{{title}}名称</el-col >
					<!--<el-col  :span="5" class="action">操作</el-col >-->
				</el-col >
				<div class="clear"></div>
			</el-col >
			<div class="clear"></div>
		</div>
		<div class="tbwrap">
			<div class="tbrow">					
				<el-col  :span="24" class="right">				
					<template v-for="(sample,index2) in informations">					
						<el-col v-if='sample.libraryName'  :span="8" class="item">					
							<el-col  :span="5" class="index">{{sample.id?index2+1:''}}</el-col >
							<el-col  :span="19" class="content" v-if="inforSelect=='2'">{{sample.formName}}</el-col >
							<el-col  :span="19" class="content" v-else>{{sample.libraryName}}</el-col >
							<!--<el-col  :span="5" class="action"><span class="pointer" @click="del(index2,sample.id)">删除</span></el-col >-->
						</el-col >
						<el-col v-else-if='sample.depot'  :span="8" class="item">					
							<el-col  :span="5" class="index">{{sample.id?index2+1:''}}</el-col >
							<el-col  :span="19" class="content">{{sample.depot}}</el-col >
							<!--<el-col  :span="5" class="action"><span class="pointer" @click="del(index2,sample.id)">删除</span></el-col >-->
						</el-col >
					</template>
					<template v-for="(item,index3) in informationsEnd">					
						<el-col  :span="8" class="item">					
							<el-col  :span="5" class="index">{{informations.length+index3+1}}</el-col >
							<el-col  :span="19" class="content"></el-col >
							<!--<el-col  :span="5" class="action"><span class="pointer" @click="del(index2,sample.id)">删除</span></el-col >-->
						</el-col >
					</template>
				</el-col >
				<div class="clear"></div>
			</div>
			<div class="clear"></div>
		</div>
    </div>
</template>

<script>
//import "@/assets/style/common/HandoverConnect.css"
//import SinograinModal from '@/components/common/action/Modal.vue';

export default {
//  components: { SinograinModal },
    props: ["formdatas","formtitle","addPath","informations","title","inforSelect"],
    mounted(){
//				console.log(this.informations)
//				console.log(this.informations.length%3)
    },
    computed:{
    	informationsEnd(){
    		console.log(this.informations)
    		var num;
    		var arr=[];
    		if(!this.informations.length){
    			num=3
    			var item={};
	    		for(var i=0;i<=num-1;i++){
	    			arr.push(item)
	    		}
	    		return arr;
    		}else if(this.informations.length%3==0){    			
    			num=0
	    		return arr;
    		}else{
    			num=3-(this.informations.length%3)
    			var item={};
	    		for(var i=0;i<=num-1;i++){
	    			arr.push(item)
	    		}
	    		return arr;
    		}
    		
    	}
    },
    methods: {
        del(index,id){
        	this.$confirm('是否删除该'+this.title+'?', '提示', {
		      confirmButtonText: '确定',
		      cancelButtonText: '取消',
		      type: 'warning'
		    }).then(() => {
		    	
		    	this.informations.items=this.items.filter((item,index1)=>{
		    		return index1!==index;
		    	})
		    	
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
        add(){
           this.$emit("addinformation",this.title) ;
        },
    },
    data() {
        return {
        	
        }
    }
}
</script>

<style>
</style>