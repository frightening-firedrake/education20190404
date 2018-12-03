<template>
    <div class="SelectChecklist">
    	<el-form ref="form" :model="form" :label-width="labelWidth" label-position="left">
	    	<el-form-item label="直属库名" style="border-bottom:none;">
	    		<el-select v-model="pLibraryId" placeholder="请选择直属库名称" @change="pLibraryIdchange">
			        <el-option v-for="item in pLibraryList" :label="item.libraryName" :value="item.id" :key="item.id"></el-option>
			    </el-select>
	    	</el-form-item>
	    	<el-form-item label="库点名称" style="border-left:none;border-bottom:none;">
	    		<el-select v-model="libraryId" placeholder="请选择库点名称" @change="libraryIdchange">
			        <el-option v-for="item in libraryList" :label="item.libraryName" :value="item.id" :key="item.id"></el-option>
			    </el-select>
	    	</el-form-item>
	    	<el-form-item label="选择品种" style="border-bottom:none;">
			    <el-select v-model="sort" placeholder="请选择品种" @change="changeSort">
			        <el-option label="玉米" value="玉米"></el-option>
			        <el-option label="小麦" value="小麦"></el-option>
			    </el-select>
			</el-form-item>
			
			<el-form-item label="选择类型" style="border-left:none;border-bottom:none;">
			    <el-autocomplete
			      	class="remark-input"
			      	v-model="remSelect"
			     	:fetch-suggestions="querySearch"
			      	placeholder="请填写类型"
			    >
			    </el-autocomplete>
			</el-form-item>
			
	    	<el-form-item label="编号范围" class="full">
			    <template>
		    		<el-input class="sampleNumRange" v-model="sampleNumRange[0]" placeholder="起始编号数字" style="margin-left:1em;"></el-input>
		    		<span style="font-size:0.16rem;"> 至 </span>
		    		<el-input class="sampleNumRange" v-model="sampleNumRange[1]" placeholder="结束编号数字"></el-input>			    
				</template>

			</el-form-item>
			
			
			
			
			<!--<el-form-item label="检测状态" class="full" style="border-top:none;">
			    <el-select v-model="isChecked" placeholder="请选择检测状态" @change="changeIsChecked">
			        <el-option label="未检测" :value="2"></el-option>
			        <el-option label="已检测" :value="3"></el-option>
			        <el-option label="全部" :value="0"></el-option>
			    </el-select>
			</el-form-item>-->
			
			
		</el-form>
		<!--全选中处理-->
		<p>
			样品管理
			<el-checkbox v-model="checkAll" @change="handleCheckAllChange"  style="margin-left:0.35rem;">全部选中</el-checkbox>
		</p>
		<div class="checkboxwrap">
			
			
			<!--序号-->
            <el-row class="order">
				<el-col :span="6" class="">
                    <div class='pull-left1'>
                    	检验编号
                    </div>                   
                </el-col>
                <el-col :span="6" class="">
                    <div class='pull-left1'>
                    	检验编号
                    </div>                   
                </el-col>
                <el-col :span="6" class="">
                    <div class='pull-left1'>
                    	检验编号
                    </div>                   
                </el-col>
                <el-col :span="6" class="">
                    <div class='pull-left1'>
                    	检验编号
                    </div>                   
                </el-col>
            </el-row>
            
            <div v-if="!checkedListFilter.length" class="checklistemit">
				<!--请重新选择检索范围！！！-->
				请重新选择检索范围！！！
			</div>
			<template>
				
			  <el-checkbox-group v-model="checkedList" @change="checkedListChange">

			  	<el-checkbox :label="item"  v-for="(item,index) in checkedListFilter" :key="item.id">监{{item.sampleNum}}</el-checkbox>

			  		
			    
			  </el-checkbox-group>
			</template>
			<div class="clear"></div>
		</div>
		<div class="btns">
            <el-button class="yes" type="primary" @click="onSubmit('form')" v-bind:disabled="!checkedList.length">确认</el-button>
            <el-button class="no" @click="cancel('form')">取消</el-button>
            <div>{{listready}}</div>
        </div>
    </div>
</template>

<script>
import "@/assets/style/common/SelectChecklist.css";
//本地测试要用下面import代码
//import data from '@/util/mock';
import { mapState,mapMutations,mapGetters,mapActions} from 'vuex';
export default {
    props: ["checkedListAdd","checkList","taskList"],
//  props: ["checkList"],
    created(){
    	if(this.$route.params.library){
			this.libraryId=this.$route.params.library.libraryId;
			this.pLibraryId=this.$route.params.library.pLibraryId;
//			this.searchingfor()
		}
//		this.checkedList=this.checkedListAdd;
//  	if(this.$route.params.formdatas){
//			this.$route.params.formdatas.items.forEach((item)=>{
//				this.checkedList.push(item)
//			});
//		}
//		console.log(this.checkedListAdd)

//		       	this.checkedList=this.$route.params.formdatas.items;



    },
    mounted: function() {
//		console.log(this.formdatas)
    },
    computed:{
  		...mapGetters(["remarkses"]),
    	listready(){
//  		console.log(this.taskList)
    		if(this.checkList.length&&this.$route.params.tabledatas){
    			var checkNums=this.$route.params.tabledatas.map((val)=>{
    				return val.sampleNum?val.sampleNum:val;
    			})
    			this.sort=this.checkList[0].sort
    			this.checkedList=this.checkList.filter((item)=>{
    				return checkNums.includes(item.sampleNum)
    			})
    		}else{
    			
    		}
    	},
//  	disabledCheckAll(){
//  		if(this.checkList.length){
//  			return false
//  		}else{
//  			return true
//  		}
//  	},
		pLibraryList(){
			return this.taskList.filter((item,index)=>{
				return item.pLibraryId==-1;
			})
		},
		libraryList(){
//			if(this.pLibraryId){
				return this.taskList.filter((item,index)=>{
					return item.pLibraryId==this.pLibraryId;
				})
//			}else{
//				
//			}
			
		},
    	checkedListFilter(){
    		if(!this.libraryId){
    			return [];
    		}
//  		console.log(this.checkList)
			return this.checkList.filter((item,index)=>{
//				return (this.remSelect?item.remark.indexOf(this.remSelect)>-1:true)&&((this.sampleNumRange[0]?this.sampleNumRange[0]-0:0)<(item.sampleNum.slice(1)-0)&&((item.sampleNum.slice(1)-0)<(this.sampleNumRange[1]?(this.sampleNumRange[1]-0):100000000000000000)))
//				return (item.detectionState==2)&&(item.sort==this.sort)&&(this.remSelect?item.remark.indexOf(this.remSelect)>-1:true)&&((this.sampleNumRange[0]?this.sampleNumRange[0]-0:0)<(item.sampleNum-0)&&((item.sampleNum-0)<(this.sampleNumRange[1]?(this.sampleNumRange[1]-0):100000000000000000)))
				return (item.libraryId==this.libraryId)&&(item.sort==this.sort)&&(this.remSelect?item.remark.indexOf(this.remSelect)>-1:true)&&((this.sampleNumRange[0]?this.sampleNumRange[0]-0:0)<(item.sampleNum-0)&&((item.sampleNum-0)<(this.sampleNumRange[1]?(this.sampleNumRange[1]-0):100000000000000000)))
//				return (this.isChecked?item.sampleState==this.isChecked:true)&&(item.sort==this.sort)&&(this.remSelect?item.remark.indexOf(this.remSelect)>-1:true)&&((this.sampleNumRange[0]?this.sampleNumRange[0]-0:0)<(item.sampleNum-0)&&((item.sampleNum-0)<(this.sampleNumRange[1]?(this.sampleNumRange[1]-0):100000000000000000)))
			})
    	},

    },
    methods: {  
		checkedListChange(val){
//			console.log(val)
		},
		changeIsChecked(val){
//			console.log(val,this.isChecked)
//			this.$emit('changeIsChecked',val)
		},
//  	提交
    	onSubmit(formname) {
//			通过
            if (this.checkedList.length) {
//                  alert('submit!');
                    this.$emit('getCheckedList',this.checkedList,this.pLibraryId,this.libraryId)
//				console.log(this.checkedList)
//				window.history.go(-1)
//			未通过
            } else {
//                  console.log('error submit!!');
//                  this.$message('请先勾选管理样品！！！');
                this.$notify({
		            title: '提示信息',
		            message: '请先勾选管理样品！！！',
		            offset: 100
		        });
                return false;
            }
        },
        cancel(formname) {
            this.$emit('getCheckedList',this.checkedList,this.pLibraryId,this.libraryId)
        	
//          console.log('取消!');
//			this.$refs[formname].resetFields();
//          this.$emit('btn_close')
//			this.$router.go(-1)
//			window.history.go(-1)
        },


        getcheckList(){
//      	this.loading=true;
			this.$http({
			    method: 'post',
				url: this.checkListUrl,
				transformRequest: [function (data) {
					// Do whatever you want to transform the data
					let ret = ''
					for (let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	//			data: {
	//
	//			}
		    }).then(function (response) {
		    	this.checkAll=false;
			  	this.checkList=response.data.checkList;
			  	this.checkedList=response.data.checkedList;
//		  		setTimeout(()=>{			  		
//			  		this.loading=false;
//			  	},1000)
			}.bind(this)).catch(function (error) {
			    console.log(error);
			}.bind(this));
        },
        handleCheckAllChange(val){
        	if(val){
        		this.checkedList=this.checkedListFilter        			        		
        	}else{      		
        		this.checkedList=[];
        	}
        },
        querySearch(queryString, cb){
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
//	    任务搜索
	  	searchingfor(){
//	  		this.$emit('searchingfor',this.searching)
	  	},
	  	changeSort(){
	  		this.checkedList=[];
	  	},
	  	pLibraryIdchange(val){
//	  		console.log(val)
	  		this.libraryId='';
	  	},
	  	libraryIdchange(val){
//	  		console.log(val)
			this.checkedList=[];
	  	},
    },
    data() {

        return {
			searching:12,
			isChecked:2,
			sort:'小麦',
//			checkListUrl:'checklist',//		        被选中库点对应的样品地址
//			checkList:[],
			checkedList:[],
//      	全部选中按钮
        	checkAll:false,
//      	筛选列表
//	  	  	restaurants: [{"value": "春季抽查"},{"value": "秋季普查"},{"value": "2017年度轮换验收"},{"value": "2018年度轮换验收"},{"value": "收购巡查"}],
        	
//      	表单数据
        	form:{
        		
        	},
			labelWidth:'1rem',
		    remSelect:'',
	        sampleNumRange:[],
	        libraryId:'',
	        pLibraryId:'',
        }
    },
}
</script>

