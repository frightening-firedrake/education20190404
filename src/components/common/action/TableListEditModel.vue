<template>
  <el-table 
  	ref="multipleTable" 
  	tooltip-effect="dark" 
  	style="width: 100%" 
  	:data="tabledata" 
  	border
  	highlight-current-row
  	@current-change="currentChange"
  
  	@selection-change="handleSelectionChange" 
  	:default-sort = "{prop: 'id', order: 'ascending'}" 
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
      
	    		<el-table-column show-overflow-tooltip v-if="!item.status" :width="item.width?item.width:'auto'" :resizable="resizable"	 align="center" :key="item.id" :label="item.label" :sortable="item.sort" :prop="item.prop" :class-name="item.class" :show-overflow-tooltip="false">
	    				<template slot-scope="scope" class='test'>
	    						<template v-if="item.prop=='libraryPid'">
		    							<el-select  v-model="tabledata[0].pLibraryId" placeholder="直属" class="zhishu" @change="PlibraryChange">
									         <el-option v-for="item2 in Plibrarylist" :label="item2.libraryName" :key="item2.id" :value="item2.id"></el-option>								        
									         <!--<el-option  label="无" key="-1" :value="-1"></el-option>-->								        
									    </el-select>
	    						</template>
	    						<template v-if="item.prop=='amount'">
		    							<input class="editModelInput" type="text" v-model.number="scope.row[item.prop]" @blur="fixed(scope.row)"/>
	    						</template>
	    						<template v-else-if="item.prop=='libraryName'">
		    							<!--<el-select  v-if="!item.editLibraryName" v-model="libraryName2" placeholder="选择库点" @change="libraryChange">
									         <el-option v-for="item2 in librarylist" :label="item2.libraryName" :key="item2.id" :value="item2.id"></el-option>								        
									    </el-select>

									    <el-select v-if="item.editLibraryName" v-model="scope.row[item.prop]" placeholder="选择品种">
									        <el-option v-for="item2 in librarylist" :label="item2.libraryName" :key="item2.id" :value="item2.id"></el-option>								        
									    </el-select>-->
									    <el-select  v-model="tabledata[0].libraryName" placeholder="库点" @change="libraryChange">
									         <el-option v-for="item2 in Clibrarylist" :label="item2.libraryName" :key="item2.id" :value="item2.id"></el-option>								        
									    </el-select>
		
	    						</template>
	    						<template v-else-if="item.prop=='barnTime'">
		        					<el-date-picker type="month" placeholder="选择入库日期" v-model="scope.row[item.prop]"></el-date-picker>		    							
	    						</template>
	    						<template v-else-if="item.prop=='sort'">
		    							<el-select v-model="scope.row[item.prop]" placeholder="品种" class="zhishu">
									        <el-option label="小麦" value="小麦"></el-option>
									        <el-option label="玉米" value="玉米"></el-option>
									        <el-option label="食用油" value="食用油"></el-option>
									    </el-select>
	    						</template>
	    						<template v-else-if="item.prop=='quality'">
		    							<el-select v-model="scope.row[item.prop]"  class="zhishu" placeholder="性质">
									        <el-option label="ZC" value="ZC"></el-option>
									        <el-option label="ZD" value="ZD"></el-option>
									        <el-option label="LC" value="LC"></el-option>
									        <el-option label="SP" value="SP"></el-option>
									        <el-option label="TD" value="TD"></el-option>
									    </el-select>
	    						</template>
	    						<template v-else-if="item.prop=='remark'">
		    							<!--<el-select v-model="scope.row[item.prop]" placeholder="选择备注">
									        <el-option label="春季普查" value="春季普查"></el-option>
									        <el-option label="秋季普查" value="秋季普查"></el-option>
									        <el-option label="2017轮换年度" value="2017轮换年度"></el-option>
													<el-option label="2018轮换年度" value="2018轮换年度"></el-option>
									        <el-option label="收购寻查" value="收购寻查"></el-option>
									        <el-option label="其他" value="其他"></el-option>
									    </el-select>-->
									    <el-autocomplete
									      	class="remark-input"
									      	v-model="scope.row[item.prop]"
									     	 	:fetch-suggestions="querySearch"
									      	placeholder="请填写备注"
									    ></el-autocomplete>
<!--									    @select="handleSelect"-->
	    						</template>
	    						<template v-else-if="item.nosign">

	    						</template>
	    						<template v-else>
		    							<input class="editModelInput" type="text" v-model="scope.row[item.prop]" />
	    						</template>
	    				</template>
	    		</el-table-column>
	    		
	    		
   		</template>
  </el-table>	
</template>
<style>
.editmodel .el-table__empty-block{
	height:auto;
}
.editmodel .el-date-editor{
	width:2rem!important;
}
.editmodel .el-date-editor input{
	height:0.36rem;
	width:2rem;
	line-height:0.34rem;
	border:solid 0.01rem #dfdfdf;
	font-size:0.16rem;
	background:#f2f2f2;
	padding:0;
	border-radius:0;
	padding-left:0.5rem;
}
.editmodel .el-date-editor .el-icon-date{
	line-height:0.5rem;
	color:#2dc0e8;
}
.editmodel .remark-input{
	margin: 0 0.05rem;
}
.editmodel .remark-input .el-input__inner{
		height: 0.36rem;
    width: 2rem;
    line-height: 0.34rem;
    border: solid 0.01rem #dfdfdf;
    font-size: 0.16rem;
    background: #f2f2f2;
    padding: 0;
    border-radius: 0;
    text-align: center;
    /*padding-left: 0.5rem;*/
}

.el-autocomplete-suggestion li{
	font-size:0.16rem;
	height:34px;
	line-height:34px;
}
.tablelist.editmodel .el-table__body-wrapper{
	min-height: auto; 
}
</style>
<script>
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
export default {
  props: ['items', 'tabledata','actions','list','loading','librarylist'],
  created(){

  },
  computed:{
  	...mapGetters(["remarkses"]),
  	maxHeight(){
  		return 320;
  	},
  	Plibrarylist(){
  		return this.librarylist.filter((item,index)=>{
  			return item.pLibraryId==-1;
  		})
  	},
  	Clibrarylist(){
  		return this.librarylist.filter((item,index)=>{
  			return item.pLibraryId==this.tabledata[0].pLibraryId;
  		})
  	}
  },
  data() {
    return {
    	true:true,
    	false:false,
//  	importLoading: false,
      multipleSelection: [],
      resizable:false,
//    libraryPid:'',
	    libraryName2:'',
//	    备注列表
//	    restaurants:this.remarkses(),
    }
  },
  mounted: function() {
  	
//		this.openloading()
//			console.log(this.loading)
  },
  methods: {
		libraryChange(){
			this.$emit('getLibraryId',this.tabledata[0].libraryName)
		},
		PlibraryChange(){
//			console.log(this.tabledata[0].pLibraryId)
			var item=this.librarylist.filter((value)=>{
				return value.id==this.tabledata[0].libraryName;
			})
			if(item.length){
//				console.log(item[0].pLibraryId)
				if(this.tabledata[0].pLibraryId==item[0].pLibraryId){

				}else{
						this.tabledata[0].libraryName=""
				}
			}
//			this.tabledata[0].libraryName="";
//			console.log(this.tabledata[0].pLibraryId,this.Clibrarylist)
		},
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
	  currentChange(currentRow, oldCurrentRow){
	  	this.$emit("currentRow",currentRow)
	  },
	  emptyCreate(){
	  	this.$emit('emptyCreate');
	  },
	  querySearch(queryString, cb) {
        var restaurants = this.remarkses;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
	  },
	  createFilter(queryString) {
	    	return (restaurant) => {
	      		return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	    	};
	  },
//	  两位小数
		fixed(val){
				val.amount=(val.amount-0).toFixed(3)
		}
	}
}

</script>
