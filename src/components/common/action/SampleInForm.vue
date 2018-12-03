<template>
    <el-form ref="form" :inline-message="errorinline" class="sampling" :rules="rules" :model="formdatas.form" :label-width="labelWidth">
        <template>
            <p>{{formdatas.title}}</p>
            <!--<p>入库信息</p>-->
        </template>     
        <el-form-item label="被查直属库：" prop="pLibraryName" v-bind:class="{disabled:disabled}">
		    <el-select class="lib1" v-model="selectlib"  placeholder="请选择库点" popper-class='headerSelectlib1' @change="selectlibChange1">
				<el-option v-for="item2 in libraryList1" :label="item2.libraryName" :key="item2.id" :value="item2.id"></el-option>								        									        
			</el-select>
		</el-form-item>
		<el-form-item label="被查库点：" prop="libraryName" v-bind:class="{disabled:disabled}">
		    <el-select class="lib2" v-model="selectlib2"  placeholder="请选择库点" popper-class='headerSelectlib1' @change="selectlibChange">
				<el-option v-for="item3 in libraryList2" :label="item3.libraryName" :key="item3.id" :value="item3.id"></el-option>								        									        
			</el-select>
		</el-form-item>
		<el-form-item label="货位号：" prop="position" v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.position" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="品种：" prop="sort" v-bind:class="{disabled:disabled}">
		    <el-select v-model="formdatas.form.sort" placeholder="品种" class="zhishu">
		        <el-option label="小麦" value="小麦"></el-option>
		        <el-option label="玉米" value="玉米"></el-option>
		        <el-option label="食用油" value="食用油"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="性质：" prop="quality"  v-bind:class="{disabled:disabled}">
		    <el-select v-model="formdatas.form.quality" placeholder="品种" class="zhishu">
		        <el-option label="ZC" value="ZC"></el-option>
		        <el-option label="ZD" value="ZD"></el-option>
		        <el-option label="LC" value="LC"></el-option>
		        <el-option label="SP" value="SP"></el-option>
		        <el-option label="TD" value="TD"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="代表数量(吨)：" prop="amount"  v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.amount" :disabled="disabled" @blur="fixed"></el-input>
		</el-form-item>
		<el-form-item label="产地：" prop="originPlace"  v-bind:class="{disabled:disabled}">
			 <el-input v-model="formdatas.form.originPlace" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="收货年度："  v-bind:class="{disabled:disabled}" prop="gainTime">
		    <el-input v-model="formdatas.form.gainTime" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="入库时间：" prop="barnTime" >
	    	<el-form-item>
	        	<el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择年度" v-model="formdatas.form.barnTime"></el-date-picker>
	    	</el-form-item>
		</el-form-item>
		<el-form-item label="备注："  prop="remark" v-bind:class="{disabled:disabled}" >
		    <el-autocomplete
		      	class="remark-input"
		      	v-model="formdatas.form.remark"
		     	:fetch-suggestions="querySearch"
		      	placeholder="请填写类型"
		      	@select="remarkChange"
		      	select-when-unmatched
		    >
		    </el-autocomplete>
		</el-form-item>
		
		<!--<div class="line">
		</div>
			<el-form-item label="选择样品室："  prop="storage" v-bind:class="{disabled:disabled}">
			    <el-select class="lib1" v-model="selectlib"  placeholder="请选择样品室" popper-class='headerSelectlib1' @change="selectlibChange1">
					<el-option v-for="item2 in libraryList1" :label="item2.libraryName" :key="item2.id" :value="item2.id"></el-option>								        									        
				</el-select>        
			</el-form-item>
			<el-form-item label="选择柜号："  prop="storage" v-bind:class="{disabled:disabled}">
			    <el-select class="lib1" v-model="selectlib"  placeholder="请选择柜号" popper-class='headerSelectlib1' @change="selectlibChange1">
					<el-option v-for="item2 in libraryList1" :label="item2.libraryName" :key="item2.id" :value="item2.id"></el-option>								        									        
				</el-select> 
			</el-form-item>
			<el-form-item label="选择位置："  prop="storage" v-bind:class="{disabled:disabled}">
				<el-select class="lib1" v-model="selectlib"  placeholder="请选择位置" popper-class='headerSelectlib1' @change="selectlibChange1">
					<el-option v-for="item2 in libraryList1" :label="item2.libraryName" :key="item2.id" :value="item2.id"></el-option>								        									        
				</el-select> 
			</el-form-item>
			<el-form-item label="入库签名：" prop="autograph" >
			    <el-input v-model="formdatas.form.autograph"></el-input>
			</el-form-item>-->
        
        <div class="btns">
            <el-button class="yes" type="primary" @click="onSubmit('form')">{{formdatas.submitText?formdatas.submitText:'确定'}}</el-button>
            <el-button class="no" @click="cancel('form')">取消</el-button>
        </div>
        
        <div class="clear"></div>
    </el-form>
</template>

<script>
import "@/assets/style/common/Form.css";
export default {
    props: ["formdatas"],
    created(){
    	this.getlibrarylist()
    },
    computed:{
    	samplestate(){
    		if(this.formdatas.form.sampleState==-1){
    			return "未扦样";
    		}else if(this.formdatas.form.sampleState==1){
    			return "已扦样";
    		}else if(this.formdatas.form.sampleState==2){
    			return "已储存";
    		}else if(this.formdatas.form.sampleState==3){
//  			return "已分小样";
    			return "已储存";
    		}else if(this.formdatas.form.sampleState==4){
    			return "已处理";
    		}
    	},
//  	code(){
//  		return  this.apiRoot +'/grain/upload/barcode/'+this.formdatas.form.samplePic;
//  	},
		libraryList1(){
//	    	if(this.selectlib=='全部'){
//	    		return [];
//	    	}else{    		
	    		return	this.libraryList.filter((item)=>{
	    			return item.pLibraryId==-1
	    		})
//	    	}
	    },
	    libraryList2(){
	    	if(!this.selectlib){
	    		return [];
	    	}else{    		
	    		return	this.libraryList.filter((item)=>{
	    			return item.pLibraryId==this.selectlib
	    		})
	    	}
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
            // 下拉框
            var validateSelect = ( rule, value, callback ) => {
                if(!value){
                    return callback(new Error("必须选择"))
                }else{
                    callback()
                }
            }
            // 电话
            var validatePhone = ( rule, value, callback ) => {
                var str = /^1[3|4|5|8][0-9]\d{4,8}$/
                if(!value){
                    return callback(new Error("手机号不能为空"))
                }else if(!str.test(value)){
                    return callback(new Error("手机号不对"))
                }else{
                    callback()
                }
            }
            // 邮箱
            var validateEmily = ( rule, value, callback ) => {
                var str = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ 
                if(!value){
                    return callback(new Error("邮箱不能为空"))
                }else if(str.test(value)){
                    return callback(new Error("邮箱不正确"))
                }else{
                    return callback()
                }
            }
        return {
//      dyear:new Date(2017),
	        position_error:false,
	        position_error_message:'',
	        labelWidth:'2rem',
	        errorinline:false,
	        disabled:false,
            rules: {
            	sort:[
                    {validator:validateText,trigger:'change'}
            	],
                remark:[
                    {validator:validateText,trigger:'change'}
                ],
//              position:[
//                  {validator:validateText,trigger:'blur'}
//              ],
	            autograph: [
                    {validator:validateText,trigger:'blur'}
                ],
	            
                
            },
          	libraryList:[],
          	depotList:[],
	      	counterList:[],
	     	placeList:[],
          	librarylistURL:this.apiRoot + '/grain/library/getAll',
          	depotlistURL: this.apiRoot + '/grain/warehouse/getAll',
		  	counterlistURL: this.apiRoot + '/grain/warehouseCounter/getAll',
		  	placelistURL: this.apiRoot + '/grain/warehouseCounterPlace/getAll',
          	selectlib:'',
          	selectlib2:'',
		    remSelect:'',
	  	  	restaurants: [{"value": "春季抽查"},{"value": "秋季普查"},{"value": "2017年度轮换验收"},{"value": "2018年度轮换验收"},{"value": "收购巡查"}],
          	
        }
    },
    methods: {  
    	getlibrarylist(){
			var params = {};
			params.pLibraryId = -1
	  		// 获取列表数据（第？页）
			this.$http({
			    method: 'post',
				url: this.librarylistURL,
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
	//			    params: JSON.stringify(params)
				}
			   	}).then(function (response) {
				  	this.libraryList = response.data;
			}.bind(this)).catch(function (error) {
			    console.log(error);
			}.bind(this));
		},
		//获取室信息
	getdepotlist(){
//		var params = {};
//		params.pLibraryId = -1
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.depotlistURL,
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
//			    params: JSON.stringify(params)
			}
		   	}).then(function (response) {
		   		response.data.forEach(function(item,index){
		   			var obj={};
		   			obj.id=item.id;
		   			obj.label=item.depot;
		   			obj.value=item.id;
		   			this.depotList.push(obj);
		   		}.bind(this))
//		   		this.modal.formdatas[2].selectitems=this.depotList;
//			  	this.listHeader.libraryList = response.data;
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
	},
//获取柜子信息
	getcounterlist(){
//		var params = {};
//		params.pLibraryId = -1
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.counterlistURL,
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
//			    params: JSON.stringify(params)
			}
		   	}).then(function (response) {
		   		response.data.forEach(function(item,index){
		   			var obj={};
		   			obj.id=item.id;
		   			obj.label=item.counter;
		   			obj.pId=item.pId;
		   			obj.value=item.id;
		   			this.counterList.push(obj);
		   		}.bind(this))
//			  	this.listHeader.libraryList = response.data;
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
	},
//获取位置信息
	getplacelist(){
//		var params = {};
//		params.pLibraryId = -1
  		// 获取列表数据（第？页）
		this.$http({
		    method: 'post',
			url: this.placelistURL,
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
//			    params: JSON.stringify(params)
			}
		   	}).then(function (response) {
		   		this.placeList=[];
		   		response.data.forEach(function(item,index){
		   			if(item.isStorage==1){		   				
		   				var obj={};
		   				obj.id=item.id;
		   				obj.pId=item.pId;
		   				obj.label=item.place;
		   				obj.value=item.id;
		   				this.placeList.push(obj);
		   			}
		   		}.bind(this))
//			  	this.listHeader.libraryList = response.data;
		}.bind(this)).catch(function (error) {
		    console.log(error);
		}.bind(this));
	},
		selectlibChange1(val){
			this.selectlib2='';
    		this.formdatas.form.libraryId='';
    		this.formdatas.form.PLibraryId=val;
//			this.$emit('selectlibChange','pLibraryId',this.selectlib);
    	},
    	selectlibChange(val){
    		this.formdatas.form.libraryId=val;
//  		if(this.selectlib2=='全部'){
//  			this.$emit('selectlibChange','pLibraryId',this.selectlib);
//  		}else{
//  			this.$emit('selectlibChange','libraryId',this.selectlib2);
//  		}
    	},
    	querySearch(queryString, cb){
	        var restaurants = this.restaurants;
	        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
		},
		createFilter(queryString) {
	    	return (restaurant) => {
	      		return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	    	};
	  	},
	  	remarkChange(val){
//	  		console.log(val)
//	  		this.$refs['form'].validateField('remark')
//	  		this.remSelect=val.value
//	  		this.$emit('remChange',this.remSelect)
	  	},
        onSubmit(formname) {
//      	if(!this.formdatas.form.depot){
//      		this.position_error=true;
//      		this.position_error_message="请选择样品室";
//      		return
//      	}
//      	if(!this.formdatas.form.counter){
//      		this.position_error=true;
//      		this.position_error_message="请填写几号柜";
//      		return
//      	}
//      	this.position_error=false;
            this.$refs[formname].validate((valid) => {
                if (valid) {
//                  alert('submit!');
//					console.log(this.formdatas.form)
                    this.$emit('submit')
//					window.history.go(-1)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(formname) {
            console.log('取消!');
        	this.position_error=false;
			this.$refs[formname].resetFields();
//          this.$emit('btn_close')
			window.history.go(-1)
        },
        //	  两位小数
		fixed(val){
//			console.log(val)
			if(this.formdatas.form.amount){				
				this.formdatas.form.amount=(this.formdatas.form.amount-0).toFixed(3)
			}
//				val.amount=(val.amount-0).toFixed(3)
		}
        
    }

}
</script>

