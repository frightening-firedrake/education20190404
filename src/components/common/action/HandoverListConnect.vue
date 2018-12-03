<template>
    <!--<el-form ref="form" :inline-message="errorinline"  :rules="rules" :model="formdatas.form" :label-width="labelWidth">-->
    <div>

        <el-form class="connect_form" :model="formdatas.form" ref="form">
            <template>
                <p>{{formdatas.title}}</p>
            </template>
            <el-row class="connect">
                <el-col :span="24" class="connect_fath">
                    <el-col :span="12">
                        <!--<el-col :span="7" class="connect_font connect_font_title">
                            <span>样品领取交接单名称:</span>
                        </el-col>
                        <el-col :span="17" class=" connect_font connect_font_content">
                            <el-form-item label="" prop="pnumber"  class="three">
                                <el-input v-model="formdatas.form.pnumber" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>-->
                        <el-form-item label="样品领取交接单名称:" prop="name" labelWidth='2rem'  class=" connect_font connect_font_title" :rules="[{ required: true, message: '请输入交接单名称', trigger: 'blur' }]">
                            <el-input v-model="formdatas.form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!--<el-col :span="7" class=" connect_font connect_font_title">
                            <span>样品管理员:</span>
                        </el-col>
                        <el-col :span="17" class="connect_font connect_font_content">
                            <span>张海新</span>
                        </el-col>-->
                        <el-form-item label="样品管理员:" prop="manager" labelWidth='2rem'  class="disabled connect_font connect_font_title" :rules="[{ required: true, message: '请输入样品管理员', trigger: 'blur' }]">
                            <el-input v-model="formdatas.form.manager" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24" class="connect_fath">
                	
                    <el-col :span="12">
                        <el-form-item label="备注:" prop="remarks" labelWidth='2rem'  class=" connect_font connect_font_title" :rules="[{ required: true, message: '请输入备注信息', trigger: 'blur' }]">
                            <el-input v-model="formdatas.form.remarks"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="品种:" prop="sort" labelWidth='2rem'  class="sort connect_font connect_font_title" :rules="[{ required: true, message: '请选择品种', trigger: 'change' }]">
                            <!--<el-input v-model="formdatas.form.sort"></el-input>-->
                            <el-select v-model="formdatas.form.sort" placeholder="品种" @change="sortChange">
						        <el-option label="小麦" value="小麦"></el-option>
						        <el-option label="玉米" value="玉米"></el-option>
						        <!--<el-option label="食用油" value="食用油"></el-option>-->
						    </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-row>
            <el-row class="project">
                
                <el-col :span="15" class="classify_num">
                    <el-col :span="2">
                        <span>序号</span>
                    </el-col>
                    <el-col :span="10">
                        <el-col :span="18" style="padding-right:12px;">
                            <span>检验编号</span>
                        </el-col>
                        <!--<el-col :span="8" style="padding-right:6px;">
                            <span>扦样编号</span>
                        </el-col>-->
                        <el-col :span="6" style="padding-right:12px;">
                            <span>操作</span>
                        </el-col>
                    </el-col>
                    <el-col :span="2" style="padding-right:12px;">
                        <span>序号</span>
                    </el-col>
                    <el-col :span="10">
                    	<el-col :span="18" style="padding-right:15px;">
                            <span>检验编号</span>
                        </el-col>
                        <!--<el-col :span="8" style="padding-right:15px;">
                            <span>扦样编号</span>
                        </el-col>-->
                        <el-col :span="6" style="padding-right:24px;">
                            <span>操作</span>
                        </el-col>
                        <!--<el-col :span="16" style="padding-right:5px;">
                            <span>检验编号</span>
                        </el-col>
                        <el-col :span="8" style="padding-right:12px;">
                            <span>操作</span>
                        </el-col>-->
                    </el-col>
                </el-col>
                <el-col :span="9" class="classify">
                    <span>检验项目</span>
                </el-col>
                
            </el-row>
            <div class="clear"></div>
            <el-row class="project_details">
                
                <el-col :span="15" class="classify_num" style="overflow-y: scroll; overflow-x: hidden;"> 
                	<div class="wrapbox">
                		<template v-for="(item,index) in formdatas.items">
		                    <el-col :span="12" class="classify_hao">
		                        <el-col :span="4">
		                            <span>{{index+1}}</span>
		                        </el-col>
		                        <el-col :span="20">
		                            <el-col :span="18" class="classify_font">
		                                <!--<span>{{item.sampleNo?item.sampleNo:item}}</span>-->
		                                <span>监{{item.sampleNum?item.sampleNum:item}}</span>
		                            </el-col>
		                            <!--<el-col :span="8" class="">
		                                <span>{{item.sampleWord}}</span>
		                            </el-col>-->
		                            <el-col :span="6" class="operation del">
		                                <span @click="deleteItem(index,item)">删除</span>
		                            </el-col>
		                        </el-col>
		                    </el-col>                			
                		</template>
	                    
	                    <el-col :span="12" class="classify_hao">
							<el-col :span="4">
	                            <span>&nbsp;</span>
	                        </el-col>
	                        <el-col :span="20">
	                            <el-col :span="18" class="classify_font">
	                                <span @click="new_sample()" class="new_sample">+新建样品</span>
	                            </el-col>
	                            <el-col :span="6" class="operation">
	                                <span>&nbsp;</span>
	                            </el-col>
	                        </el-col>
	                    </el-col>
	                    <div class="clear"></div>
                	</div>
                </el-col>
                
                <el-col :span="9" class="classify" style="padding:0.2rem 0;">
                	<!--<el-checkbox-group v-model="formdatas.checkList">
                		<el-checkbox label="1" class="classify_col">不完善颗粒</el-checkbox>
                		<el-checkbox label="2" class="classify_col">杂质</el-checkbox>
                		<el-checkbox label="3" class="classify_col">生霉粒</el-checkbox>
					    <el-checkbox label="4" class="classify_col">水分</el-checkbox>
					    <el-checkbox label="5" class="classify_col">硬度</el-checkbox>
					    <el-checkbox label="6" class="classify_col">脂肪酸值（面筋吸水量）</el-checkbox>
					    <el-checkbox label="4" class="classify_col">面筋吸水</el-checkbox>
					    <el-checkbox label="7" class="classify_col">品尝评分</el-checkbox>
					    <el-checkbox label="8" class="classify_col">卫生指标</el-checkbox>
					    <el-checkbox label="9" style="width:100%;" class="classify_col">加工品质</el-checkbox>
					</el-checkbox-group>-->
					<el-tree
					  :data="treeData"
					  :default-checked-keys="formdatas.checkList"
					  show-checkbox
					  default-expand-all
					  node-key="id"
					  ref="checktree"
					  class="checktree"
					  highlight-current
					  @check="checkedtree"
					  :props="defaultProps">
					</el-tree>
                </el-col>
            </el-row>
            <div class="leading_out" :class="{btnloading:formdatas.loading}" v-on:click="onSubmit('form')">
				<!--<i v-if="formdatas.loading" class="el-icon-loading"></i>-->	
                <span>生成样品领取交接单</span>
            </div>
        </el-form>

    </div>
</template>
<style>
	.btnloading{
		pointer-events:none;
	}
	/*下拉*/
.el-form-item.sort>.el-form-item__content{
	text-align: left!important;
}
.el-form-item.sort .el-form-item__content .el-select{
	/*padding-left:0.2rem;*/
	margin-left:0.2rem;
}
.el-form-item.sort .el-form-item__content .el-select .el-input input{
	height:0.36rem!important;
	width:2.75rem;
	line-height:0.34rem;
	border:solid  1px #dfdfdf!important;
	font-size:0.16rem;
	background:#f2f2f2;
	border-radius:0;
}
.checktree .el-tree-node__label{
	font-size:0.16rem;
}
.checktree .el-tree-node__content{
	white-space: pre-wrap;
    width: 350px;
    line-height: 26px;
    height:auto;
}
</style>
<script>
import "@/assets/style/common/HandoverConnect.css"


export default {

    props: ["formdatas"],
    created(){
//  	console.log(this.formdatas.checkList)
    },
    computed:{
    	treeData(){
    		if(this.formdatas.form.sort=='玉米'){
    			return this.data2;
    		}else if(this.formdatas.form.sort=='小麦'){
    			return this.data1;
    		}
    	}
    },
    methods: {
        //新建样品
        new_sample() {
            this.$emit('new_sample')       	
//          this.$router.push({ path: '/index/sampleManagement/handover/handoverListCreate/handoverListCreateSelect' })
        },
        
        deleteItem(index0,item){
        	this.formdatas.items=this.formdatas.items.filter((value,index)=>{
        		return index!==index0;
        	})
        	if(!item.sampleNum){
          		this.$emit('sampleIdsDel',item)       		
        	}
        },
        onSubmit(formname){
        	this.$refs[formname].validate((valid) => {
                if (valid) {
//                  alert('submit!');
//                  this.$emit('btn_close')

					this.$emit('createlib')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        sortChange(){
        	this.formdatas.checkList=[];
        },
        checkedtree(data,tree){
//      	console.log(tree.checkedKeys)
        	var checkList=tree.checkedKeys.filter((value,index)=>{
        		return value<100
        	})
        	this.formdatas.checkList=checkList
//      	console.log(checkList) 	
        },
    },
    data() {
        return {
        	data1: [{
          		id: 111,
          		label: '全指标(小麦)',
          		children: [{
            		id: 222,
            		label: '质量指标(小麦)',
            		children: [{
              			id: 1,
              			label: '容重'
            		},{
              			id: 2,
              			label: '水分'
            		},{
              			id: 3,
              			label: '杂质'
            		},{
              			id: 4,
              			label: '矿物质'
            		},{
              			id: 5,
              			label: '不完善粒'
//          		},{
//            			id: 6,
//            			label: '生霉粒'
            		},{
              			id: 7,
              			label: '色泽气味(质量指标)'
            		},{
              			id: 8,
              			label: '硬度指数'
            		},]
         		 },{
            		id: 333,
            		label: '储存品质指标(小麦)',
            		children: [
            		{
              			id: 9,
              			label: '面筋吸水量'
            		},
//          		{
//            			id: 10,
//            			label: '脂肪酸值'
//          		},
            		{
              			id: 11,
              			label: '品尝评分值'
            		},{
              			id: 12,
              			label: '色泽气味(储存品质指标)'
            		}]
         		 },{
            		id: 444,
            		label: '食品卫生指标(小麦)',
            		children: [{
//            			id: 13,
//            			label: '真菌毒素(黄曲霉毒素B1)'
//          		},{
              			id: 14,
              			label: '真菌毒素(脱氧雪腐镰刀菌烯醇)'
//          		},{
//            			id: 15,
//            			label: '真菌毒素(玉米赤霉烯酮)'
            		},{
              			id: 16,
              			label: '重金属(铅)'
            		},{
              			id: 17,
              			label: '重金属(镉)'
            		},{
              			id: 18,
              			label: '重金属(汞)'
            		},{
              			id: 19,
              			label: '重金属(砷)'
            		}]
         		 }]
        	}],
			data2: [{
          		id: 111,
          		label: '全指标(玉米)',
          		children: [{
            		id: 222,
            		label: '质量指标(玉米)',
            		children: [{
              			id: 1,
              			label: '容重'
            		},{
              			id: 2,
              			label: '水分'
            		},{
              			id: 3,
              			label: '杂质'
            		},{
//            			id: 4,
//            			label: '矿物质'
//          		},{
              			id: 5,
              			label: '不完善粒'
            		},{
              			id: 6,
              			label: '生霉粒'
            		},{
              			id: 7,
              			label: '色泽气味(质量指标)'
//          		},{
//            			id: 8,
//            			label: '硬度指数'
            		},]
         		 },{
            		id: 333,
            		label: '储存品质指标(玉米)',
            		children: [
//          		{
//            			id: 9,
//            			label: '面筋吸水量'
//          		},
            		{
              			id: 10,
              			label: '脂肪酸值'
            		},
            		{
              			id: 11,
              			label: '品尝评分值'
            		},{
              			id: 12,
              			label: '色泽气味(储存品质指标)'
            		}]
         		 },{
            		id: 444,
            		label: '食品卫生指标(玉米)',
            		children: [{
              			id: 13,
              			label: '真菌毒素(黄曲霉毒素B1)'
            		},{
              			id: 14,
              			label: '真菌毒素(脱氧雪腐镰刀菌烯醇)'
            		},{
              			id: 15,
              			label: '真菌毒素(玉米赤霉烯酮)'
            		},{
              			id: 16,
              			label: '重金属(铅)'
            		},{
              			id: 17,
              			label: '重金属(镉)'
            		},{
              			id: 18,
              			label: '重金属(汞)'
            		},{
              			id: 19,
              			label: '重金属(砷)'
            		}]
         		 }]
        	}],
        	defaultProps: {
          		children: 'children',
          		label: 'label'
        	}
        }
    }
}
</script>
