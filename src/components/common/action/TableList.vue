<template>
<!--	:max-height="maxHeight"-->
  <el-table 
  	ref="multipleTable" 
  	tooltip-effect="dark" 
  	style="width: 100%" 
  	:data="tabledata" 
  	border
  	highlight-current-row
  	@selection-change="handleSelectionChange" 
		@current-change="currentChange"
  	v-loading="loading"
  	:row-class-name="row_class_name"
    element-loading-customClass="table_loading"
    element-loading-text="loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255,255,255, 0.8)">
   		<!--是否包含多选框-->
   		<template v-if="actions.selection">
        <el-table-column :resizable="resizable" align="center" type="selection" class-name="tableAction">
        </el-table-column>
      </template>
      <!--是否添加编号-->
      <el-table-column type="index" :index="1" align="center" label="序号" v-if="actions.number"></el-table-column>
      <!--<el-table-column type="index" :index="indexMethod" v-if="actions.number"></el-table-column>-->
      <!--循环数据-->
   		<template v-for="item in items">
      
	    		<el-table-column show-overflow-tooltip v-if="!item.status" :width="item.width?item.width:'auto'" :resizable="resizable"	 align="center" :key="item.id" :label="item.label" :sortable="item.sort" :prop="item.prop" :class-name="item.class">
	    		</el-table-column>
	    		
	    		<!--<el-table-column show-overflow-tooltip v-if="!item.status&&item.prop=='pLibraryId'" :width="item.width?item.width:'auto'" :resizable="resizable"	 align="center" :key="item.id" :label="item.label" :sortable="item.sort" :prop="item.prop" :class-name="item.class">
	    				<template slot-scope="scope" class='test'>	    
		    					{{findPLibraryName(scope.row[item.prop])}}
	    				</template>
	    		</el-table-column>-->
	    		
	    		<el-table-column show-overflow-tooltip v-if="item.status" :width="item.width?item.width:'auto'" :resizable="resizable"	 align="center" :key="item.id" :label="item.label" :sortable="item.sort" :prop="item.prop" :class-name="item.class">
	    				<template slot-scope="scope">
		      				<template v-if="item.prop=='regState'">
				      				<template v-if="scope.row[item.prop]==-1">
				            			<span style="color:#fc6500;">待审核</span>
				      				</template>
								    	<template v-if="scope.row[item.prop]==1">
				            			<span style="color:#999999;">未同意</span>
				      				</template>
				      				<template v-if="scope.row[item.prop]==2">
				            			<span style="color:#666666;">已同意</span>
				      				</template>
				      				<template v-if="scope.row[item.prop]==3">
				            			<span style="color:blue;">草稿</span>
				      				</template>
		      				</template>
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
		      				<template v-if="item.prop=='pLibraryId'">
		    						{{findPLibraryName(scope.row[item.prop])}}				      				
		      				</template>
		          </template>
	    		</el-table-column>
   		</template>
	    
	   
      
      <template slot="empty"> 
      		<!--<i class="iconfont icon-xinjian" @click=emptyCreate></i>
      		<br />
      		页面空空如也 快去新建吧！     		-->
      		页面空空如也！     		
      </template>
  </el-table>	
</template>
<script>
export default {
  props: ['items', 'tabledata','actions','list','loading','librarylist'],
  computed:{
  	maxHeight(){
  		return 400;
  	},
  },
  data() {
    return {
//  	importLoading: false,
      multipleSelection: [],
      resizable:false,
    }
  },
  mounted: function() {
  	
//		this.openloading()
//			console.log(this.loading)
  },
  methods: {
//	formatter(row, column, cellValue){
//		if(column.className=='status'){
//			if(cellValue==0){
//				return '待审核';
//			}else if(cellValue==1){
//				return '未同意'; 				
//			}else if(cellValue==2){
//				return '已同意'; 				
//			}
//		}else{
//			return cellValue;
//		}
//	},
    handleSelectionChange(val) {
      this.multipleSelection = val;
      var checkedId=val.map(function(item){
      	return item.id;
      })
			this.$emit('getchecked',checkedId)
    },
//  设置行类名
    row_class_name(scope){
    	return scope.row.row_class_name
    },
//  工作底稿
    handleViewManuscript(index, row){
    	this.$router.push({path: '/index/sampling/libraryList/samplingList/sampleShowList/manuscriptEdit'})
    },
    handleCreateManuscript(index, row){
    	console.log(this.$router)
    	this.$router.push({path: '/index/sampling/libraryList/samplingList/sampleShowList/manuscriptCreate'})
    },
//  安全报告
    handleViewSafetyReport(index, row){
    	this.$router.push({path: '/index/sampling/libraryList/samplingList/sampleShowList/safetyReportEdit'})
    },
    handleCreateSafetyReport(index, row){
    	this.$router.push({path: '/index/sampling/libraryList/samplingList/sampleShowList/safetyReportCreate'})
    },
    handleInput(index, row,scope) {
//	  	console.log(index,row);
//		    this.$root.eventHub.$emit('openmodal',row.id,'view',this.list)
		    this.$root.eventHub.$emit('inputlistitem',row.id)
		},
    handleView(index, row,scope) {
//	  	console.log(index,row);
//		    this.$root.eventHub.$emit('openmodal',row.id,'view',this.list)
		    this.$root.eventHub.$emit('viewlistitem',row.id)
		},
		handleEdit(index, row) {
//	  	console.log(index,row,this.list);
		    this.$root.eventHub.$emit('editlistitem',row.id)
		},
	
	  handleDele(index, row) {
	    this.$confirm('此操作将永久删除该'+row.rowType+', 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(() => {
	    	this.$root.eventHub.$emit('delelistitem',row.id,this.list);
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
	  emptyCreate(){
	  	this.$emit('emptyCreate');
	  },
	  findPLibraryName(pid){
	  	var pitem= this.librarylist.filter((item)=>{
	  		return item.id==pid
	  	})
	  	if(pitem.length){	  		
	  		return pitem[0].libraryName;
	  	}
	  },
	  currentChange(currentRow, oldCurrentRow){
	  	this.$emit("currentRow",currentRow)
	  },
	}
}

</script>
