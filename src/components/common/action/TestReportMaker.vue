<template>
    <div class="trmwrap">
    	<el-form ref="form" :inline-message="errorinline" class="sampling" :rules="rules" :model="formdatas" :label-width="labelWidth">
	        <template>
	            <p>样品检测报告</p>
	        </template>      
	        <el-form-item label="表单名称：" prop="tableName">
			    <el-input v-model="formdatas.tableName" placeholder="请输入表单名称"></el-input>
			</el-form-item>
			<el-form-item label="备注：">
			    <el-input v-model="formdatas.remark"></el-input>
			</el-form-item>
			<div class="clear"></div>
		</el-form>

		<div class="tbwrap">
			<el-table 
				class="list TestReportMaker"
			  	ref="multipleTable" 
			  	tooltip-effect="dark" 
			  	style="width: 100%" 
			  	:data="tabledata" 
				:height="max_height"
			  	:default-sort = "{prop: actions.sort, order: 'ascending'}" 
			  	v-loading="loading"
			  	:row-class-name="row_class_name"
			    element-loading-customClass="table_loading"
			    element-loading-text="loading..."
			    element-loading-spinner="el-icon-loading"
			    element-loading-background="rgba(255,255,255, 0.8)"
			    >

			      <!--是否添加编号-->
			        <el-table-column type="index" :index="1" align="center" label="序号" v-if="actions.number"></el-table-column>
			      <!--<el-table-column type="index" :index="indexMethod" v-if="actions.number"></el-table-column>-->
			      <!--循环数据-->
			   			<template v-for="item in items">
			      
				    		<el-table-column show-overflow-tooltip v-if="!item.status" :width="item.width?item.width:'auto'" :resizable="resizable"	 align="center" :key="item.id" :label="item.label" :sortable="item.sort" :prop="item.prop" :class-name="item.class">
				    		</el-table-column>
				    		
				    		<el-table-column show-overflow-tooltip v-if="item.status" :width="item.width?item.width:'auto'" :resizable="resizable"	 align="center" :key="item.id" :label="item.label" :sortable="item.sort" :prop="item.prop" :class-name="item.class">
			    				<template slot-scope="scope">
				      				
				      				<template v-if="item.prop=='sampleState'">
					      				<template v-if="scope.row[item.prop]==-1">
					            			<span style="color:#fc6500;">未扦样</span>
					      				</template>
									    	<template v-if="scope.row[item.prop]==1">
					            			<span style="color:#999999;">已扦样</span>
					      				</template>
					      				<template v-if="scope.row[item.prop]==2">
					            			<span style="color:#666666;">已入库</span>
					      				</template>
				      				</template>
				      				<template v-if="item.prop=='isDeal'">
					      				<template v-if="scope.row[item.prop]==-1">
					            			<span style="color:#fc6500;">待解决</span>
					      				</template>
									    	<template v-if="scope.row[item.prop]==1">
					            			<span style="color:#999999;">已解决</span>
						      			</template>
				      				</template>
				      				<template v-if="item.prop=='depot'">
					      				{{scope.row['depot']+scope.row['counter']}}
				      				</template>
				      				<template v-if="item.prop=='checkeds'">
					      				{{findCheckeds(scope.row[item.prop])}}
				      				</template>
				      				<template v-if="item.prop=='sampleNum'">
					      				监{{scope.row[item.prop]}}
				      				</template>
				      				<template v-if="item.prop=='smallSampleNum'">
					      				监{{scope.row[item.prop]}}
				      				</template>
				      				<template v-if="item.prop=='checkPoint'">
					      				{{findCheckPoint(scope.row)}}
				      				</template>
				      				<template v-if="item.prop=='libraryFullName'">
					      				{{scope.row.pLibraryName}}—{{scope.row.libraryName}}
				      				</template>
					          	</template>
				    		</el-table-column>
			   		</template>				    
			        <el-table-column v-if="actions.show" :resizable="resizable" align="center" label="操作" class-name="tableAction">
			            <template slot-scope="scope">
						<!--是否包含删除操作-->
					        <template v-if="actions.dele">
					            <button class="dele" @click.stop="handleDele(scope.$index, scope.row)">删除</button>
					        </template>     
			            </template>
			        </el-table-column>
			      
			        <template slot="empty"> 
			      		<!--<i class="iconfont icon-xinjian" @click=emptyCreate></i>
			      		<br />
			      		页面空空如也 快去新建吧！     		-->
			      		暂无选中样品！     		
			        </template>
			</el-table>	
			<div class="tableAddWrap">				
				<div  class="editModelWrap" style="border-top: 1px solid #e6e7e7;">
					<div class="tableAdd"  @click="tableAdd">
						<p style="background-image:url('static/images/sys/create.png');">					
							新增样品
						</p>
					</div>
				</div>
			</div>

			
		</div>
		<div class="bottom">
			<div class="create" @click="create">
				<span>生成样品检测报表</span>
			</div>
		</div>
    </div>
</template>

<script>
//import "@/assets/style/common/HandoverConnect.css"
//import SinograinModal from '@/components/common/action/Modal.vue';

export default {
//  components: { SinograinModal },
    props: ["formdatas","tabledata","items","actions","loading"],
    mounted(){
  
    },
    methods: {
//      titleH(num){
//      	return Math.ceil((num+1)/2)*0.5+"rem";
//      },
        tableAdd(){
            this.$emit('addRow')
        },
        create(){
        	this.$refs["form"].validate((valid) => {
                if(valid){
              	
                    this.$emit('create')
                }else{
                    console.log('error submit!!');
                    return false;
                }
            });
        },
	//  设置行类名
	    row_class_name(scope){
	    	return scope.row.row_class_name
	    },
		handleDele(index, row) {
			this.$emit('remove',index,row.id,row)
		},
		findCheckeds(str){
		  	var indexs=str.split(',');
		  		indexs.sort((a,b)=>{return a-b;});
		  	var checkList=["不完善颗粒","杂质","生霉粒","水分","硬度","脂肪酸值（面筋吸水）","品尝评分","卫生","加工品质"]
		  	var res=[];
		  	indexs.forEach((item)=>{
		  		res.push(checkList[item-1])
		  	})
		  	return res.join('，')
		},
		findCheckPoint(obj){
		  	var checkList1=["不完善颗粒","杂质","生霉粒","水分","硬度","脂肪酸值","品尝评分","卫生","加工品质"]
		  	var checkList2=["不完善颗粒","杂质","生霉粒","水分","硬度","面筋吸水","品尝评分","卫生","加工品质"]
		  	var index=obj.checkPoint
		  	var res;
		  	if(obj.sort=='玉米'){
		  		res=checkList1[index-1];  		
		  	}else if(obj.sort=='小麦'){
		  		res=checkList2[index-1];	  		
		  	}
		  	return res;
		},
		notAllowed(){
		  	return false;
		},
    },
    data() {
    	// 普通文本的验证
        var validateText = ( rule, value, callback ) => {
            var str =/^[^'"#$%&\^*》>,."<《？，。！@#￥%……’”：/；]+$/;
            if(!value){
                 return callback(new Error("请输入内容"));
            }else if(!str.test(value)){
                return callback(new Error("请不要输入特殊的字符"))
            }else{
                callback()
            }
        }
        return {
        	max_height:'280',
      		resizable:false,
        	labelWidth:'2rem',
        	errorinline:false,
            rules: {
                tableName: [
                    {validator:validateText,trigger:'blur'}
                ],
	           
            }
        }
    }
}
</script>

<style>
</style>