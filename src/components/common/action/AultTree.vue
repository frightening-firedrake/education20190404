<template>
    <el-form ref="form" :inline-message="errorinline" class="sampling" :rules="rules" :model="formdatas.form" :label-width="labelWidth">
        <template>
            <p>{{formdatas.title}}</p>
        </template>      
        <template v-for="(value,key,index) in formdatas.form">
            <template v-if="formdatas.labels[index]['type']=='input'">
		        <el-form-item :label="formdatas.labels[index]['label']" :prop="key" v-bind:class="formdatas.labels[index]['class']">
				    <el-input v-model="formdatas.form[key]" :disabled="formdatas.labels[index]['disable']"></el-input>
				</el-form-item>
            </template>
            <template v-if="formdatas.labels[index]['type']=='num'">
		        <el-form-item :label="formdatas.labels[index]['label']" :prop="key" v-bind:class="formdatas.labels[index]['class']">
					<el-input-number v-model="formdatas.form[key]" :min="1" :max="10"></el-input-number>
				</el-form-item>
            </template>
            <template v-if="formdatas.labels[index]['type']=='checkbox'">
		        <el-form-item :label="formdatas.labels[index]['label']" :prop="key" v-bind:class="formdatas.labels[index]['class']">
					<el-checkbox-group v-model="formdatas.form[key]">
				      	<el-checkbox
					      v-for="item in formdatas.labels[index]['items']"
					      :key="item.value"
					      :label="item.label">
					    </el-checkbox>
				    </el-checkbox-group>
				</el-form-item>
            </template>
            <template v-if="formdatas.labels[index]['type']=='select'">
		        <el-form-item :label="formdatas.labels[index]['label']" :prop="key" v-bind:class="formdatas.labels[index]['class']">
					<el-select v-model="formdatas.form[key]" placeholder="">
				        <el-option
					      v-for="item in formdatas.labels[index]['items']"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				    </el-select>
				</el-form-item>
            </template>
        </template> 
        
         <el-form-item :label="tree.label" class="treelabel full">


	        <div class="treewrap">
		    	<header>
					<el-checkbox v-model="tree_select_toggle" @change="checkall">选中全部</el-checkbox>
					<!--<el-checkbox v-model="tree_open_toggle" @change="openall">展开全部</el-checkbox>-->
					<div class="prompt">
						温馨小提示：此
						<el-checkbox v-model="disabletrue" disabled></el-checkbox>				
						为您的上级权限您无权更改
					</div>
				</header>
				<div class="treezl">
					<el-tree
						node-key="index"
					    :data="tree.data"
					    show-checkbox
					    ref="tree"
						@check-change="checkChange"
					    :check-strictly="tree.checkStrictly"
					    highlight-current
						:default-expand-all="tree_open_toggle"
						:default-checked-keys="defaultCheckedKeys"
					    :props="tree.defaultProps">
					</el-tree>
<!--					@check="checkCurrent"-->
				</div>
	    	
		    	<div class="prompt">
					温馨小提示：此
					<el-checkbox v-model="disabletrue" disabled></el-checkbox>				
					为您的上级权限您无权更改
				</div>		  
		  	</div>
        
		</el-form-item>
        
        <div class="btns">
            <el-button class="yes" type="primary" @click="onSubmit('form')">确认</el-button>
            <el-button class="no" @click="cancel('form')">取消</el-button>
        </div>
        
        <div class="clear"></div>
        {{treeDataReady}}
    </el-form>
</template>
           	
	            

<script>

//import LemonAult  from "@/components/common/action/Ault";
	
export default {

//  components:{ LemonAult},
    props: ['formdatas','tree'],
    computed:{	
//  	由于异步的原因监控数据加载完成时点
		treeDataReady(){      	
	      	if(this.tree.data.length){
	      		this.finddisablecheckkey(this.tree.data)
	      		this.finddisablecheckedid(this.tree.data);
	      		this.finddefaultcheckkey(this.tree.data);
	      		this.findallcheckedid(this.tree.data);	      		
	      	}
	    }
	},
    methods: {
      	onSubmit(formname) {

            this.$refs[formname].validate((valid) => {
                if (valid) {
                    this.$emit('submit',this.formdatas.form,this.$refs.tree.getCheckedNodes())

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(formname) {
            console.log('取消!');
			this.$refs[formname].resetFields();
//          this.$emit('btn_close')
			window.history.go(-1)
        },
      getCheckedNodes() {
//      console.log(this.$refs.tree.getCheckedNodes());
//      console.log(this.tree.data)
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      checkall(value){
//    	console.log(value)
      	var allkeys;
      	if(value){
//    		this.$refs.tree.setCheckedNodes(this.tree.data)
      		allkeys=this.checkallkey;
      	}else{
//    		this.$refs.tree.setCheckedNodes([])
      		allkeys=this.disablecheckedkey;
      	}
      	this.$refs.tree.setCheckedKeys(allkeys);
      },
      openall(a){
      	if(a){
      		this.tree_open_toggle=true;
      	}else{
      		this.tree_open_toggle=false;
      	}
      	console.log(this.tree_open_toggle)
      },
      	findallcheckedid(arr){
      		arr.forEach((val)=>{	      		   			
	      		if((val.checked)&&val.disabled||(!val.disabled)){    			
	      			this.checkallkey.push(val.index);
	      		}
				if(val.children){
					this.findallcheckedid(val.children)
				}
			})	
        },
        //禁用且选中
        finddisablecheckedid(arr){
      		arr.forEach((val)=>{	      		   			
	      		if(!(!val.checked)&&val.disabled){    			
	      			this.disablecheckedkey.push(val.index);
	      		}
				if(val.children){
					this.finddisablecheckedid(val.children)
				}
			})	
        },
        //禁用的
      	finddisablecheckkey(arr){
      		arr.forEach((val)=>{
	      		if(val.disabled){    			
	      			this.disablekey.push(val.index);
	      		}
				if(val.children){
					this.finddisablecheckkey(val.children)
				}
			})
        },
//      已经选中的
        finddefaultcheckkey(arr){
      		arr.forEach((val)=>{
	      		if(val.checked){    			
	      			this.defaultCheckedKeys.push(val.index);
	      		}
				if(val.children){
					this.finddefaultcheckkey(val.children)
				}
			})
//    		console.log(this.defaultCheckedKeys)
        },
        checkCurrent(node,data){

        },
        findchildrenNode(arr){
        	
        },
        checkChange(node,val,child){
        	if(!node.relyId){
        		return
        	}
//      	console.log(node,val,child)
//      	console.log(this.$refs.tree)
        	var nodeName=node.name;//当前节点名称
        	var nodeKey=node.index;//当前节点key
        	var pName;//依赖节点名称
        	var pKey=node.relyId;//依赖节点id
        	var pNode//依赖节点
        	if(pKey!=='-1'){//存在依赖节点
        		pNode=this.$refs.tree.getNode(pKey);//依赖节点
        		pName=pNode.label//依赖节点名称
        	}
//      	var cKey=node.index;//被依赖节点id
//      	var cNode=node.index;//依赖节点
//      	var checkedKeys=this.$refs.tree.getCheckedKeys()//全部选中key值
        	var CheckedNodes=this.$refs.tree.getCheckedNodes()//全部选中节点
//      	当前节点未选中点击后选中了
			if(val&&pNode){
				if(!pNode.checked){//依赖节点未选中
					this.$notify.error({
			          	title: '错误',
			          	message: nodeName+' 依赖于 '+pName+' 目前无法勾选请先勾选 '+pName,
			          	type: 'warning',
//			          	duration: 0,
			        });
			        this.$refs.tree.setChecked(nodeKey,false)
				}
			}else if(!val){
				var childrenNames=[];
				CheckedNodes.forEach((item)=>{
					if(item.relyId==nodeKey){
						childrenNames.push(item.name)
					}
				})
				if(childrenNames.length){
					childrenNames.join('、');
					this.$notify.error({
			          	title: '错误',
			          	message: nodeName+' 被 '+childrenNames+' 依赖无法取消勾选请先取消勾选 '+childrenNames,
			          	type: 'warning',
//			          	duration: 0,
			        });
			        this.$refs.tree.setChecked(nodeKey,true)
				}
			}
        }
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
      	disablecheckedkey:[],//禁止选择且被选中的id
      	disablekey:[],//禁止选择的key id
      	checkallkey:[],//树上的全部可选排除了禁用的id
      	defaultCheckedKeys:[],//默认选中的key id
      	disabletrue:true,//处于禁止状态并选中
      	tree_select_toggle:false,//全部选中开关
      	tree_open_toggle:true,//全部打开开关
      	labelWidth:'2rem',
        errorinline:false,
        disabled:true,
            rules: {
                text: [
                    {validator:validateText,trigger:'blur'}
                ],
                select:[
                    {validator:validateSelect,trigger:'blur'}
                ],
                roleName:[
                    {validator:validateText,trigger:'blur'}
                ],
	            status: [
                    {validator:validateText,trigger:'blur'}
                ],
	            nid: [
                    {validator:validateText,trigger:'blur'}
                ],
	            checkregion:[
                    {validator:validateSelect,trigger:'blur'}
                ],
	            pnumber:[
                    {validator:validateText,trigger:'blur'}
                ],
	            varieties:[
                    {validator:validateText,trigger:'blur'}
                ],
	            quality:[
                    {validator:validateText,trigger:'blur'}
                ],
	            weight:[
                    {validator:validateText,trigger:'blur'}
                ],
	            region:[
                    {validator:validateSelect,trigger:'blur'}
                ],
//	            harvestdate: '2017',//收货年度
	            samplingdate:[
                    {validator:validateText,trigger:'blur'}
                ],
//	            remarks: '',//备注
                
            }
      		
      	}
    }
  }


</script>

<style>
.treewrap{
	/*border:1px solid #d8dce5;*/
	/*border-radius:0.06rem;*/
	height:100%;
	position: relative;
}
.treewrap header{
	height: 0.52rem;
	line-height: 0.52rem;
	background-color: rgba(222, 233, 247, 1);
	/*border-radius: 0.06rem 0.06rem 0 0;*/
}
.treewrap header label{
	line-height: 0.52rem;
	padding-left:0.3rem;
	margin:0!important;
}
.treewrap header label .el-checkbox__label{
	font-size:0.17rem;
}
.treewrap  header div.prompt label{
	padding:0;
}
.treewrap  header div.prompt{
	font-size:0.17rem;
	float:right;
	padding-right:0.1rem;
	display: none;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.treewrap>div.prompt{
	position: absolute;
	bottom:0;
	line-height: 0.52rem;
	padding-left:0.3rem;
	font-size:0.17rem;
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width:100%;
}
.treewrap  header div.prompt{
	display: block;
}
.treewrap>div.prompt{
	display: none;
}
@media (max-width:992px){
	.treewrap  header div.prompt{
		display: none;
	}
	.treewrap>div.prompt{
		display: block;
	}
}
.treewrap>div.prompt label{
	padding:0;
}
.treewrap .treezl{
	position:absolute;
	top:0.54rem;
	left:0;
	right:0;
	bottom:0.54rem;
	overflow:auto; 
	padding:0.1rem;
}
@media (min-width:992px){
	.treewrap .treezl{
		bottom:0.1rem;
	}
}
.treewrap .el-checkbox__input.is-checked+.el-checkbox__label{
	color:rgb(51,51,51);
}
.treewrap .el-tree-node__label{
	font-size:0.17rem;
}
</style>