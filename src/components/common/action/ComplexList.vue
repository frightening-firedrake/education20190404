<template>
	<div>
		

	  <el-table 
	  	class="nobody"
	  	ref="TableHeader" 
	  	tooltip-effect="dark" 
	  	style="width: 100%" 
	  	:data='tabledatasFilter'
	  	show-summary
	  	:summary-method="headerGetSummaries"
	  	:default-sort = "{prop: 'pLibraryName', order: 'ascending'}" 
	  	v-loading="loading"
	  	:row-class-name="row_class_name"
	    element-loading-customClass="table_loading"
	    element-loading-text="loading..."
	    element-loading-spinner="el-icon-loading"
	    element-loading-background="rgba(255,255,255, 0.8)">

	      <!--单位-->
	      <el-table-column show-overflow-tooltip width="auto" :resizable="resizable" align="center" label="单位" prop="pLibraryName">
		    </el-table-column>
	      <!--是否添加编号-->
	      <el-table-column type="index" :index="1" align="center" label="序号" v-if="actions.number"></el-table-column>
	      <!--<el-table-column type="index" :index="indexMethod" v-if="actions.number"></el-table-column>-->
	      <!--循环数据-->
	   		<template v-for="item in items" v-if="item.pid==0">    
	    		<el-table-column  show-overflow-tooltip :width="item.width?item.width:'auto'" :resizable="resizable"	 align="center" :key="item.id" :label="item.label" :sortable="item.sort" :prop="item.prop" :class-name="item.class">
		    		<template v-for="item1 in items" v-if="item1.pid==item.id">    
			    		<el-table-column show-overflow-tooltip :width="item1.width?item1.width:'auto'" :resizable="resizable"	 align="center" :key="item1.id" :label="item1.label" :sortable="item1.sort" :prop="item1.prop" :class-name="item1.class">
				    		<template v-for="item2 in items" v-if="item2.pid==item1.id">    
					    		<el-table-column show-overflow-tooltip :width="item2.width?item2.width:'auto'" :resizable="resizable"	 align="center" :key="item2.id" :label="item2.label" :sortable="item2.sort" :prop="item2.prop" :class-name="item2.class">
						    		<template v-for="item3 in items" v-if="item3.pid==item2.id">    
							    		<el-table-column show-overflow-tooltip :width="item3.width?item3.width:'auto'" :resizable="resizable"	 align="center" :key="item3.id" :label="item3.label" :sortable="item3.sort" :prop="item3.prop" :class-name="item3.class">
							    			<template v-for="item4 in items" v-if="item4.pid==item3.id">    
									    		<el-table-column show-overflow-tooltip :width="item4.width?item4.width:'auto'" :resizable="resizable"	 align="center" :key="item4.id" :label="item4.label" :sortable="item4.sort" :prop="item4.prop" :class-name="item4.class">
									    		
									    		</el-table-column>
									   		</template>
							    		</el-table-column>
							   		</template>
					    		</el-table-column>
					   		</template>
			    		</el-table-column>
			   		</template>
	    		</el-table-column>
	   		</template>
	   		<template slot="empty"> 
	      		<!--<i class="iconfont icon-xinjian" @click=emptyCreate></i>-->
	      		<!--<br />
	      		加载中请稍后！     		-->
	      	</template>
	  </el-table>	
	  
	  	<div class="selectlib">
	  		<el-select v-model="unitfilter" placeholder="">
	  			<el-option label="全部库" value="全部库"></el-option>
			    <el-option
			      v-for="item in unitall"
			      :key="item"
			      :label="item"
			      :value="item">
			    </el-option>
			</el-select>
	  	</div>
	  
	  <div class="scrollwrap">	  	
		  <template v-for="(unititem,unitindex) in units">
			  <el-table 
			  	ref="multipleTable" 
			  	tooltip-effect="dark" 
			  	style="width: 100%" 
			  	:show-header=false
			  	:data='unitdata(unititem)'
			  	:span-method="arraySpanMethod"
			  	show-summary
			  	:summary-method="getSummaries"
			  	:default-sort = "{prop: 'WarehouseNumber', order: 'ascending'}" 
			  	v-loading="loading"
			  	:row-class-name="row_class_name"
			    element-loading-customClass="table_loading"
			    element-loading-text="loading..."
			    element-loading-spinner="el-icon-loading"
			    element-loading-background="rgba(255,255,255, 0.8)">
			      <!--单位-->
			      <el-table-column width="auto" :resizable="resizable" align="center" label="单位" prop="pLibraryName" class-name="unit">
				    </el-table-column>
			      <!--是否添加编号-->
			      <el-table-column type="index" :index="1" align="center" label="序号" v-if="actions.number"></el-table-column>
			      <!--<el-table-column type="index" :index="indexMethod" v-if="actions.number"></el-table-column>-->
			      <!--循环数据-->
			   		<template v-for="item in items">    
		    		<el-table-column v-if="item.pid==0" show-overflow-tooltip :width="item.width?item.width:'auto'" :resizable="resizable"	 align="center" :key="item.id" :label="item.label" :sortable="item.sort" :prop="item.prop" :class-name="item.class">
			    		<template v-for="item1 in items"> 
			    			
				    		<el-table-column v-if="item1.pid==item.id&&item1.prop=='sampleNum'" show-overflow-tooltip :width="item1.width?item1.width:'auto'" :resizable="resizable"	 align="center" :key="item1.id" :label="item1.label" :sortable="item1.sort" :prop="item1.prop" :class-name="item1.class">
	    						<template slot-scope="scope">
						      		监{{scope.row[item1.prop]}}
				      			</template>
				    		</el-table-column>

				    		<el-table-column v-if="item1.pid==item.id&&item1.prop!=='sampleNum'" show-overflow-tooltip :width="item1.width?item1.width:'auto'" :resizable="resizable"	 align="center" :key="item1.id" :label="item1.label" :sortable="item1.sort" :prop="item1.prop" :class-name="item1.class">
					    		<template v-for="item2 in items">    

						    		<el-table-column v-if="item2.pid==item1.id&&item2.prop!=='sampleNum'" show-overflow-tooltip :width="item2.width?item2.width:'auto'" :resizable="resizable"	 align="center" :key="item2.id" :label="item2.label" :sortable="item2.sort" :prop="item2.prop" :class-name="item2.class">
							    		<template v-for="item3 in items">    
								    		<el-table-column v-if="item3.pid==item2.id" show-overflow-tooltip :width="item3.width?item3.width:'auto'" :resizable="resizable"	 align="center" :key="item3.id" :label="item3.label" :sortable="item3.sort" :prop="item3.prop" :class-name="item3.class">
								    			<template v-for="item4 in items" v-if="item4.pid==item3.id">    
										    		<el-table-column show-overflow-tooltip :width="item4.width?item4.width:'auto'" :resizable="resizable"	 align="center" :key="item4.id" :label="item4.label" :sortable="item4.sort" :prop="item4.prop" :class-name="item4.class">
										    		
										    		</el-table-column>
										   		</template>
								    		</el-table-column>
								   		</template>
						    		</el-table-column>
						   		</template>
						   		
						   		
				    		</el-table-column>
				   		</template>
		    		</el-table-column>
		   		</template>
			  </el-table>	
		  </template>
	  </div>
  </div>
</template>
<script>
export default {
  props: ['items', 'tabledata','actions','list','loading'],
  computed:{
  	maxHeight(){
  		return 400;
  	},
  	tabledatasFilter(){
		if(this.unitfilter=="全部库"){
			return this.tabledata;
		}else{
			return this.tabledata.filter((value,index)=>{
				return value.pLibraryName==this.unitfilter
			})
		}
	},
	units(){
		var units=[];
		this.tabledatasFilter.forEach((value,index)=>{
			if(!units.includes(value.pLibraryName)){
				units.push(value.pLibraryName);
			}
		});
		return units;
	},
	unitall(){
		var unitall=[];
		this.tabledata.forEach((value,index)=>{
			if(!unitall.includes(value.pLibraryName)){
				unitall.push(value.pLibraryName);
			}
		});
		return unitall;
	},
  },
  data() {
    return {
    	unitfilter:'全部库',
//  	importLoading: false,
      	multipleSelection: [],
      	resizable:false,
    }
  },
  created(){
	console.log(this.loading)
  	
  },
  mounted: function() {
//	console.log(this.tabledatasFilter)
//		this.openloading()
//			console.log(this.loading)
  },
  methods: {
  	unitdata(unit){
  		return  this.tabledatasFilter.filter((data,index)=>{
		  			return data.pLibraryName==unit;
		  		});
  	},
  	arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          	if (rowIndex === 0) {
            	return [100000, 1];
          	}else{
          		return [0, 0];
          	}
        }
    },
    headerGetSummaries({columns,data}) {
//  	console.log({columns,data})
        const sums = [];
        var weightIndex
        columns.forEach((column, index) => {
//      	console.log(column.property, index)
            if (index === 3) {
            	sums[index] = '总计';
            	return;
            }
            const values = data.map((item)=>{
            		if(column.property=="amount"){ 
            			return Number(item[column.property]);       			
            		}else if(column.property=="grainQuality"){
            			return Number(item[column.property]);       			
            		}else{
            			return "心情不好这行我不加"
            		}
            	});
//          const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
            	sums[index] = values.reduce((prev, curr) => {
                	const value = Number(curr);
                	if (!isNaN(value)) {
                    	return prev + curr;
                    } else {
                   		return prev;
                    }
                }, 0);
                if(column.property=="amount"){
                	sums[index]=sums[index].toFixed(3);
                }
//              sums[index] += ' 元';
            }else{
//              sums[index] = 'no';
            }
        });
        return sums;
    },
    getSummaries({columns,data}) {
//  	console.log({columns,data})
        const sums = [];
        var weightIndex
        columns.forEach((column, index) => {
//      	console.log(column.property, index)
            if (index === 3) {
            	sums[index] = '小计';
            	return;
            }
            const values = data.map((item)=>{
            		if(column.property=="amount"){ 
            			return Number(item[column.property]);       			
            		}else if(column.property=="grainQuality"){
            			return Number(item[column.property]);       			
            		}else{
            			return "心情不好这行我不加"
            		}
            	});
//          const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
            	sums[index] = values.reduce((prev, curr) => {
                	const value = Number(curr);
                	if (!isNaN(value)) {
                    	return prev + curr;
                    } else {
                   		return prev;
                    }
                }, 0);
                if(column.property=="amount"){
                	sums[index]=sums[index].toFixed(3);
                }
//              sums[index] += ' 元';
            }else{
//              sums[index] = 'no';
            }
        });
        return sums;
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
//  设置行类名
    row_class_name(scope){
    	return scope.row.row_class_name
    },

	  emptyCreate(){
//	  	this.$emit('emptyCreate');
	  }
	}
}

</script>
