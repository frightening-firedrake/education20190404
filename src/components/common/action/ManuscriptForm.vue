<template>
    <el-form ref="form" :inline-message="errorinline" class="sampling Manuscript" :rules="rules" :model="formdatas.form" :label-width="labelWidth">
        <template>
            <p>{{formdatas.title}}</p>
        </template>      
		<el-form-item label="被检查企业" prop="enterprise" class="three" v-bind:class="{disabled:disabled}">
		    <el-input v-model="formdatas.form.pLibraryName" disabled></el-input>
		</el-form-item>
		<!--<el-form-item label="被查时点"  class="three">
		    <el-form-item prop="checkedTime">

		        <el-date-picker type="month" placeholder="选择被查时点" v-model="formdatas.form.checkedTime"></el-date-picker>
		    </el-form-item>
		</el-form-item>-->
		<el-form-item label="实际查库日"  class="three">
		    <el-form-item prop="realCheckedTime">
		        <!--<el-date-picker type="year" :default-value="dyear" placeholder="选择年度" v-model="form.harvestdate"></el-date-picker>-->
		        <el-date-picker type="date" placeholder="选择实际查库日" v-model="formdatas.form.realCheckedTime"  @change="dateChange"></el-date-picker>
		    </el-form-item>
		</el-form-item>
		<el-form-item label="收货年度"  v-bind:class="{disabled:disabled}" class="three">
		    <el-form-item prop="gainTime">
		        <!--<el-date-picker type="year" :default-value="dyear" placeholder="选择年度" v-model="form.harvestdate"></el-date-picker>-->
		        <el-date-picker type="year" placeholder="选择年度" v-model="formdatas.form.gainTime"  :disabled="disabled"></el-date-picker>
		    </el-form-item>
		</el-form-item>
		<el-form-item label="货位号" prop="position"  v-bind:class="{disabled:disabled}" class="three">
		    <el-input v-model="formdatas.form.position" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="品种" prop="sort"  v-bind:class="{disabled:disabled}" class="three">
		    <el-input v-model="formdatas.form.sort" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="性质" prop="quality"  v-bind:class="{disabled:disabled}" class="three">
		    <el-input v-model="formdatas.form.quality" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="所在库区" prop="libraryName"  v-bind:class="{disabled:disabled}" class="full">
		    <el-input v-model="formdatas.form.libraryName" :disabled="disabled"></el-input>
		</el-form-item>
		<el-form-item label="仓房类型" prop="barnType"  class="three">
		 	<el-select v-model="formdatas.form.barnType" placeholder="选择仓房类型">
		        <el-option label="平房仓" value="平房仓"></el-option>
		        <el-option label="高大平房仓" value="高大平房仓"></el-option>
		        <el-option label="苏式仓" value="苏式仓"></el-option>
				<el-option label="窑洞仓" value="窑洞仓"></el-option>
				<el-option label="地下仓" value="地下仓"></el-option>
		    </el-select>
		</el-form-item>
		
		<el-form-item label="储存形式" prop="storge" class="three">
		    <el-select v-model="formdatas.form.storge" placeholder="选择储存形式">
		        <el-option label="散存" :value="1"></el-option>
		        <el-option label="包装" :value="2"></el-option>
		        <el-option label="围包散存" :value="3"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="保管帐数量（kg）" prop="grainQuality" class="three">
		    <el-input v-model.number="formdatas.form.amount*1000" disabled></el-input>
		</el-form-item>
		<el-form-item label="质量等级" prop="qualityGrade" class="three">
		    <el-select v-model="formdatas.form.qualityGrade" placeholder="选择质量等级">
		        <el-option label="一等" :value="1"></el-option>
		        <el-option label="二等" :value="2"></el-option>
		        <el-option label="三等" :value="3"></el-option>
		    </el-select>
		</el-form-item>
		<!--<el-form-item label="入仓方式" prop="stored_way" class="three2">
		    <el-checkbox-group v-model="formdatas.form.stored_way">
		        <el-checkbox label="人工入仓" name="type"></el-checkbox>
		        <el-checkbox label="机械入仓" name="type"></el-checkbox>
		    </el-checkbox-group>
		</el-form-item>-->
		<el-form-item label="入仓方式" prop="putWay" class="three2">
	    	<el-radio-group v-model="formdatas.form.putWay">
		        <el-radio :label="2">人工入仓</el-radio>
		        <el-radio :label="1">机械入仓</el-radio>
		    </el-radio-group>
		</el-form-item>
		
		<!--分两半-->
		<div class="left">
			<div>
				<div class="merge_title_3">
					粮食入库质量
				</div>
				<el-form-item label="容重（g/l）" prop="storageCapacity" class='leftborder'>
				    <el-input v-model.number="formdatas.form.storageCapacity"></el-input>
				</el-form-item>
				<el-form-item label="水分（%）" prop="storageWater" class='leftborder'>
				    <el-input v-model.number="formdatas.form.storageWater"></el-input>
				</el-form-item>
				<el-form-item label="杂质（%）" prop="storageImpurity" class='leftborder'>
				    <el-input v-model.number="formdatas.form.storageImpurity"></el-input>
				</el-form-item>
				<div class="clear"></div>
			</div>
		</div>

		<div class="right">
			<div>
				<div class="merge_title_right">						
					<div class="merge_title_3">
						实测粮食质量
					</div>
				</div>
				<el-form-item label="容重（g/l）" prop="realCapacity" class='leftborder'>
				    <el-input v-model.number="formdatas.form.realCapacity"></el-input>
				</el-form-item>
				<el-form-item label="水分（%）" prop="realWater" class='leftborder'>
				    <el-input v-model.number="formdatas.form.realWater"></el-input>
				</el-form-item>
				<el-form-item label="杂质（%）" prop="realImpurity" class='leftborder'>
				    <el-input v-model.number="formdatas.form.realImpurity"></el-input>
				</el-form-item>		
				<div class="clear"></div>
				
			</div>
		</div>
		
		<div class="left">
			<div>
				
				<div class="fromrow">
					1.计算粮堆体积
				</div>
				<el-form-item label="粮堆测量体积(m³)" prop="measuredVolume" >
				    <el-input v-model="ldcltj" disabled></el-input>
				</el-form-item>
				<el-form-item label="需要扣除体积(m³)" prop="deductVolume" >
				    <el-input v-model.number="formdatas.form.deductVolume"></el-input>
				</el-form-item>
				<el-form-item label="粮堆实际体积(m³)" prop="realVolume" >
				    <el-input v-model="ldsjtj" disabled></el-input>
				</el-form-item>
				<div class="fromrow">
					2.计算粮堆平均密度
				</div>
				<div class="box">
					<div class="merge_title_3">
						<el-radio v-model="calculation_density" label="1" @change="pjmdff">标准容重器法</el-radio>
					</div>
					<el-form-item label="粮食容重（g/l）" prop="realCapacity1"  class='leftborder' :class="{disabled:calculation_density==2}">
					    <el-input v-model="formdatas.form.realCapacity" :disabled="calculation_density==2" disabled></el-input>
					</el-form-item>
					<el-form-item label="校正后修正系数" prop="correctioFactor"  class='leftborder' :class="{disabled:calculation_density==2}">
					    <el-input v-model.number="formdatas.form.correctioFactor" :disabled="calculation_density==2"></el-input>
					</el-form-item>
					<el-form-item label="粮堆平均密度（kg/m³）" prop="aveDensity"  class='leftborder' :class="{disabled:calculation_density==2}">
					    <el-input v-model="bzldpjmd" :disabled="calculation_density==2" disabled></el-input>
					</el-form-item>
					<div class="clear"></div>
				</div>
				<div class="box">				
					<div class="merge_title_3">
						<el-radio v-model="calculation_density" label="2" @change="pjmdff" disabled>特制大容器法</el-radio>
					</div>
					<el-form-item label="单位体积粮食重量（kg/m³）" prop="unit_volume_weight_tz"  class='leftborder' :class="{disabled:calculation_density==1}">
					    <el-input v-model="formdatas.form.unit_volume_weight_tz" :disabled="calculation_density==1"></el-input>
					</el-form-item>
					<el-form-item label="校正后修正系数" prop="correction_factor_tz2"  class='leftborder' :class="{disabled:calculation_density==1}">
					    <el-input v-model.number="formdatas.form.correction_factor_tz2" :disabled="calculation_density==1"></el-input>
					</el-form-item>
					<el-form-item label="粮堆平均密度（kg/m³）" prop="average_density_tz"  class='leftborder' :class="{disabled:calculation_density==1}">
					    <el-input v-model="tzldpjmd" :disabled="calculation_density==1" disabled></el-input>
					</el-form-item>
					<div class="clear"></div>
				</div>

				
			</div>
		</div>
		<div class="right">
			<div class="cover_left">
				<div></div>
			</div>	
					
				<el-form-item label="粮堆形状及基本尺寸" prop="shape"  class="">
				 	<el-select v-model="formdatas.form.shape" placeholder="选择粮堆形状" @change="changeShape">
				        <el-option label="长方体" value="长方体"></el-option>
				        <el-option label="圆柱体" value="圆柱体"></el-option>
				        <el-option label="长方截锥体" value="长方截锥体"></el-option>
						<el-option label="其他" value="其他"></el-option>
				    </el-select>
				</el-form-item>
				
				<div class="clear"></div>
			<div class="padding">
				<!--<div class="fromrow">
					粮堆形状及基本尺寸 
				</div>-->
				
				
				<div v-if="formdatas.form.shape=='长方体'" class="imgbox" style="background-image:url('static/images/sys/box1.png')"></div>
				<div v-if="formdatas.form.shape=='圆柱体'" class="imgbox" style="background-image:url('static/images/sys/box2.png')"></div>
				<div v-if="formdatas.form.shape=='长方截锥体'" class="imgbox" style="background-image:url('static/images/sys/box3.png')"></div>
				<div v-if="formdatas.form.shape=='其他'" class="imgbox" style="height:4rem; background-image:url('static/images/sys/box4.png')"></div>
					
				<template v-if="formdatas.form.shape=='长方体'">
					<el-form-item key="长方体1" label="长（m）：" prop="length" class="small"  style="border-left: solid 1px #dfdfdf;">
					    <el-input v-model.number="formdatas.form.length" ></el-input>
					</el-form-item>
					<el-form-item key="长方体2" label="宽（m）：" prop="wide" class="small" >
					    <el-input v-model.number="formdatas.form.wide" @change="changeNum('formdatas.form.wide')"></el-input>
					</el-form-item>
					<el-form-item key="长方体3" label="高（m）：" prop="high" class="small">
					    <el-input v-model.number="formdatas.form.high"></el-input>
					</el-form-item>	
					<div class="clear"></div>					
				</template>
				
				<template v-if="formdatas.form.shape=='圆柱体'">
					<el-form-item key="圆柱体1" label="直径（m）：" prop="diameter"  class="small"  style="width:50%; border-left: solid 1px #dfdfdf;" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
					    <el-input v-model.number="formdatas.form.diameter" ></el-input>
					</el-form-item>
					<el-form-item key="圆柱体2" label="高（m）：" prop="high" class="small" style="width:50%;" >
					    <el-input v-model.number="formdatas.form.high" ></el-input>
					</el-form-item>
					<div class="clear"></div>					
				</template>
				
				<template v-if="formdatas.form.shape=='长方截锥体'">
					<el-form-item key="长方截锥体1" label="S1（m²）：" prop="topS" class="small"  style="border-left: solid 1px #dfdfdf;" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
					    <el-input v-model.number="formdatas.form.topS" ></el-input>
					</el-form-item>
					<el-form-item key="长方截锥体2" label="S2（m²）：" prop="bottomS" class="small"  :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
					    <el-input v-model.number="formdatas.form.bottomS" ></el-input>
					</el-form-item>
					<el-form-item key="长方截锥体3" label="高（m）：" prop="high" class="small">
					    <el-input v-model.number="formdatas.form.high"></el-input>
					</el-form-item>	
					<div class="clear"></div>					
				</template>
				
				<template v-if="formdatas.form.shape=='其他'">
					
					
					<el-form-item key="其他4" label="长1（m）：" prop="length" class="small"  style="border-left: solid 1px #dfdfdf;">
					    <el-input v-model.number="formdatas.form.length" ></el-input>
					</el-form-item>
					<el-form-item key="其他5" label="长2（m）：" prop="length_2" class="small"  :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
					    <el-input v-model.number="formdatas.form.length_2"></el-input>
					</el-form-item>
					
					<el-form-item key="其他3" label="宽（m）：" prop="wide" class="small">
					    <el-input v-model.number="formdatas.form.wide"></el-input>
					</el-form-item>	
					<div class="clear"></div>	
					
					<el-form-item key="其他1" label="高1（m）：" prop="high" class="small"  style="border-left: solid 1px #dfdfdf;">
					    <el-input v-model.number="formdatas.form.high" ></el-input>
					</el-form-item>
					<el-form-item key="其他2222" label="高2（m）：" prop="high_2" class="small"  :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
					    <el-input v-model.number="formdatas.form.high_2" ></el-input>
					</el-form-item>
					<el-form-item key="其他6" label=""  class="small">
					    <!--<el-input v-model.number="formdatas.form.high"></el-input>-->
					</el-form-item>	
					<div class="clear"></div>
				</template>
			</div>		
		</div>
		<div class="clear"></div>
		
		<div class="left">
			<div>
				<div class="fromrow">
					3.计算粮食数量
				</div>
				<el-form-item label="测量计算数（kg）" prop="unQuality" >
				    <el-input v-model="cljss" disabled></el-input>
				</el-form-item>
				<div class="box">				
					<div class="merge_title_3">
						应记粮食损耗(kg)	
					</div>
					<el-form-item label="水分减量" prop="lossWater"  class='leftborder'>
					    <el-input v-model.number="formdatas.form.lossWater"></el-input>
					</el-form-item>
					<el-form-item label="保管自然损耗" prop="lossNature"  class='leftborder'>
					    <el-input v-model.number="formdatas.form.lossNature"></el-input>
					</el-form-item>
					<el-form-item label="合计" prop="weight_total"  class='leftborder'>
					    <el-input v-model="sum" disabled></el-input>
					</el-form-item>
					
					<div class="clear"></div>
				</div>
				<el-form-item label="检查计算数（kg）" prop="weight_calculation" >
				    <el-input v-model="jcjss"  disabled></el-input>
				</el-form-item>
				<div class="clear"></div>
				
			</div>
		</div>
		<div class="right">
			<div class="padding">
				<div class="fromrow">
					4.认定粮食实际数量
				</div>
			</div>
				

				<div class="merge_title_right">				
					<div class="merge_title_2">
						检查计算数与保管账数量比较
					</div>
				</div>
					<el-form-item label="差数（kg）" prop="difference"  class='leftborder'>
					    <el-input v-model="difference" disabled></el-input>
					</el-form-item>
					<el-form-item label="差率（％）" prop="slip"  class='leftborder'>
					    <el-input v-model="slip" disabled></el-input>
					</el-form-item>
				<div class="clear"></div>
				<div class="cover_left">
					<div></div>
				</div>	
					<el-form-item label="账实是否相符" prop="isMatch" >

					    <el-select v-model="formdatas.form.isMatch" placeholder="选择是否相符">
					        <el-option label="是" value="是"></el-option>
					        <el-option label="否" value="否"></el-option>
					    </el-select>

					    <!--<el-input v-model="formdatas.form.is_same"></el-input>-->
					</el-form-item>
				<div class="cover_left">
					<div></div>
				</div>	
				<el-form-item label="粮食实际数量（kg）" prop="grainQuality2" >
				    <el-input v-model.number="formdatas.form.amount*1000" disabled></el-input>
				</el-form-item>
				<div class="cover_left">
					<div></div>
				</div>	
				<el-form-item label="账实不符原因" prop="result" >
				    <el-input v-model="formdatas.form.result"></el-input>
				</el-form-item>	
				<div class="clear"></div>
				

		</div>
		
		<el-form-item label="备注" prop="remark"  class="full">
		    <el-input v-model="formdatas.form.remark" disabled></el-input>
		</el-form-item>
		<el-form-item label="检查人" prop="rummager"  class="three">
		    <el-input v-model="formdatas.form.rummager"></el-input>
		</el-form-item>
		<el-form-item label="保管责任人" prop="custodian"  class="three">
		    <el-input v-model="formdatas.form.custodian"></el-input>
		</el-form-item>
		<el-form-item label="被检查企业负责人" prop="leader"  class="three">
		    <el-input v-model="formdatas.form.leader"></el-input>
		</el-form-item>

        
        <div class="btns">
            <el-button class="yes" type="primary" @click="onSubmit('form')">确认</el-button>
            <el-button class="no" @click="cancel('form')">取消</el-button>
            <div class="exportexcel" @click="exportexcel('form')">
				<span>
					导出Excel表格
				</span>					
			</div>
        </div>
        
        <div class="Explain">
        	<pre>
	    填表说明：								
		1.根据检查情况在表内相关项目后的“□”内打“√”。								
		2.粮堆实际体积＝粮堆测量体积－需要扣除体积。								
		3.粮堆平均密度＝粮食容重(单位体积粮食重量)×校正后修正系数。								
		4.测量计算数＝粮堆实际体积×粮堆平均密度。								
		5.水分减量＝保管账数量×(入库水分%－实测水分%)/(1－实测水分%)。								
		6.保管自然损耗＝保管账数量×0.2%×粮食储存年数。								
		7.应记粮食损耗=水分减量＋保管自然损耗。								
		8.检查计算数＝测量计算数＋应记粮食损耗。								
		9.差数＝保管账数量－检查计算数；差率＝差数/保管账数量×100％。								
		10.差率在±3％以内的，认定账实相符，保管账数量即为粮食实际数量。								
		11.账实不符原因可另附说明。								
		12.表中以kg、g/l为单位的栏目保留整数，以kg/m³、％为单位的保留1位小数，修正系数以及长、宽、高数值保留2位小数。								

        	</pre>
        </div>
        
        <div class="clear"></div>
    </el-form>
</template>

<script>
import "@/assets/style/common/Form.css";
export default {
    props: ["formdatas"],
    created(){
//  	this.getlibrarylist();
    },
    mounted: function() {
//		console.log(this.formdatas)
    },
    computed:{
		ldcltj() {//粮堆测量体积
			var shape = this.formdatas.form.shape;			
			var length = this.formdatas.form.length-0;
			var high = this.formdatas.form.high-0;
			var wide = this.formdatas.form.wide-0;			
        	var topS = this.formdatas.form.topS-0;
        	var bottomS = this.formdatas.form.bottomS-0;
        	var diameter = this.formdatas.form.diameter-0;
        	var length_2 = this.formdatas.form.length_2-0;
        	var high_2 = this.formdatas.form.high_2-0;
        	if(shape=='长方体'){
				return this.jsdjg.measuredVolume = (length*high*wide).toFixed(1)     		
        	}else if(shape=='圆柱体'){
        		return this.jsdjg.measuredVolume = (3.14*diameter*diameter/4*high).toFixed(1)     		
        	}else if(shape=='长方截锥体'){
        		return this.jsdjg.measuredVolume = ((topS+bottomS+Math.sqrt(topS*bottomS))*high/3).toFixed(1)     		
        	}else if(shape=='其他'){
        		return this.jsdjg.measuredVolume = (length*high*wide+(high+high_2)*length_2/2).toFixed(1)     		
        	}
		},
		ldsjtj() { //粮堆实际体积
			var length = this.formdatas.form.length;
			var high = this.formdatas.form.high;
			var wide = this.formdatas.form.wide;
			return this.jsdjg.realVolume = (this.ldcltj - this.formdatas.form.deductVolume).toFixed(1)
		},
		bzldpjmd() { // 标准粮堆平均密度
			return this.jsdjg.aveDensity = (this.formdatas.form.realCapacity*this.formdatas.form.correctioFactor).toFixed(1)
		},
		tzldpjmd() { //特制粮堆平均密度
//			return this.jsdjg.aveDensity = (this.formdatas.form.realCapacity*this.formdatas.form.correction_factor_tz).toFixed(2)
		},
		cljss() { //测量计算数（kg）
			var length = this.formdatas.form.length-0;
			var high = this.formdatas.form.high-0;
			var wide = this.formdatas.form.wide-0;
			if(this.calculation_density == 1) {
//				return this.jsdjg.unQuality = Math.round((length*high*wide - this.formdatas.form.deductVolume)*this.formdatas.form.realCapacity*this.formdatas.form.correctioFactor)
				return this.jsdjg.unQuality = Math.round(this.ldsjtj*this.bzldpjmd)

			} else if(this.calculation_density == 2) { 
				return this.jsdjg.unQuality = Math.round((length*high*wide - this.formdatas.form.deductVolume)*this.formdatas.form.realCapacity*this.formdatas.form.correction_factor_tz)
			}
		},
		// sfjl() { //水分减量
		// 	return this.jsdjg.lossWater = (this.formdatas.form.grainQuality*(this.formdatas.form.storageWater-this.formdatas.form.realWater)/(100-this.formdatas.form.realWater)).toFixed(2)
		// },
		// bgzrsh() { //保管自然损耗
		// 	var date = new Date();
//		var date=new Date(this.formdatas.form.realCheckedTime);
		// 	var year = date.getFullYear();
			
		// 	if(year==this.formdatas.form.gainTime){
		// 		return this.jsdjg.lossNature = 0;
		// 	} else {
		// 		return this.jsdjg.lossNature = (this.formdatas.form.grainQuality*0.002*(year-this.formdatas.form.gainTime)).toFixed(2);
		// 	}

		// },
		sum() { //合计
		//var sfjl = this.formdatas.form.grainQuality*(this.formdatas.form.storageWater-this.formdatas.form.realWater)/(1-this.formdatas.form.realWater);
			var sfjl = this.formdatas.form.lossWater - 0;
//			var date = new Date();
			var date=new Date(this.formdatas.form.realCheckedTime);
			var year = date.getFullYear();
			//var bgzrsh = this.formdatas.form.grainQuality*0.002*(year-this.formdatas.form.gainTime);
			var bgzrsh = this.formdatas.form.lossNature - 0;
			return this.jsdjg.loss = (sfjl + bgzrsh).toFixed(0);
		},
		jcjss() { //检查计算数（kg）
			var length = this.formdatas.form.length;
			var high = this.formdatas.form.high;
			var wide = this.formdatas.form.wide;
			if(this.calculation_density == 1) {
//				var cljss = ((length*high*wide - this.formdatas.form.deductVolume)*this.formdatas.form.realCapacity*this.formdatas.form.correctioFactor)
				var cljss = Math.round(this.ldsjtj*this.bzldpjmd)
			} else if(this.calculation_density == 2) {
				var cljss = ((length*high*wide - this.formdatas.form.deductVolume)*this.formdatas.form.realCapacity*this.formdatas.form.correction_factor_tz)
			}
			//var sfjl = this.formdatas.form.grainQuality*(this.formdatas.form.storageWater-this.formdatas.form.realWater)/(1-this.formdatas.form.realWater);
			var sfjl = this.formdatas.form.lossWater - 0;
//			var date = new Date();
			var date=new Date(this.formdatas.form.realCheckedTime);
			var year = date.getFullYear();
			//var bgzrsh = this.formdatas.form.grainQuality*0.002*(year-this.formdatas.form.gainTime);
			var bgzrsh = this.formdatas.form.lossNature - 0;
			var sum = sfjl + bgzrsh;
			return this.jsdjg.checkNum = (cljss + sum).toFixed(0);
		},
		difference() { //差数
			var length = this.formdatas.form.length;
			var high = this.formdatas.form.high;
			var wide = this.formdatas.form.wide;
			if(this.calculation_density == 1) {
//				var cljss = ((length*high*wide - this.formdatas.form.deductVolume)*this.formdatas.form.realCapacity*this.formdatas.form.correctioFactor)
				var cljss = Math.round(this.ldsjtj*this.bzldpjmd)
			} else if(this.calculation_density == 2) { 
				var cljss = ((length*high*wide - this.formdatas.form.deductVolume)*this.formdatas.form.realCapacity*this.formdatas.form.correction_factor_tz)
			}
			//var sfjl = this.formdatas.form.grainQuality*(this.formdatas.form.storageWater-this.formdatas.form.realWater)/(1-this.formdatas.form.realWater);
			var sfjl = this.formdatas.form.lossWater - 0;
//			var date = new Date();
			var date=new Date(this.formdatas.form.realCheckedTime);
			var year = date.getFullYear();
			//var bgzrsh = this.formdatas.form.grainQuality*0.002*(year-this.formdatas.form.gainTime);
			var bgzrsh = this.formdatas.form.lossNature - 0;
			var sum = sfjl + bgzrsh;
			var jcjss = cljss +sum;
//			console.log(111111,this.formdatas.form.amount,jcjss)
			return this.jsdjg.difference = (this.formdatas.form.amount*1000 - jcjss).toFixed(0);
		},
		slip() { //差率
			var slip = (this.difference-0)/(this.formdatas.form.amount*1000 - 0) * 100;
			return this.jsdjg.slip = slip.toFixed(1);
		},
//		zssfxf() {
//			if(this.slip > -3 && this.slip < 3) {
//				return "相符";
//			} else {
//				return "不相符";
//			}
//		},
//		lssjsl(){
//			return this.formdatas.form.grainQuality;
//		},
//		pLibraryName(){
//			if(this.librarylist.length){
//			  	var pitem= this.librarylist.filter((item)=>{
//			  		return item.id==this.formdatas.form.pLibraryId
//			  	})
//			  	return pitem[0].libraryName;
//			}else{
//				return "";				
//			}
//		},
		
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
		jsdjg:{//计算的结果

		},
		shape:'长方体',
		librarylist:[],
//      dyear:new Date(2017),
        calculation_density:"1",//计算密度方法
        labelWidth:'2rem',
        errorinline:false,
        disabled:true,
            rules: {           
//          必填类型
//              barnType: [
//		            { required: true, message: '请输入', trigger: 'blur' },
//		        ],
		        // result: [
		        //     { required: true, message: '请输入', trigger: 'blur' },
		        // ],
		        // rummager: [
		        //     { required: true, message: '请输入', trigger: 'blur' },
		        // ],
		        // custodian: [
		        //     { required: true, message: '请输入', trigger: 'blur' },
		        // ],
		        // leader: [
		        //     { required: true, message: '请输入', trigger: 'blur' },
		        // ],
				// enterprise: [
		        //     { required: true, message: '请输入', trigger: 'blur' },
		        // ],
//		        数字输入类型
//		        grainQuality: [
//		            { required: true, message: '请输入', trigger: 'blur' },
//		            { type: 'number', message: '请输数字', trigger: 'blur' },
//		        ],
				lossWater: [
		            { required: true, message: '请输入', trigger: 'blur' },
		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
		        lossNature: [
		            { required: true, message: '请输入', trigger: 'blur' },
		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
		        storageCapacity: [
		            { required: true, message: '请输入', trigger: 'blur' },
//		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
		        storageWater: [
		            { required: true, message: '请输入', trigger: 'blur' },
//		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
//		        storageImpurity: [
//		            { required: true, message: '请输入', trigger: 'blur' },
//		            { type: 'number', message: '请输数字', trigger: 'blur' },
//		        ],
		        realCapacity: [
		            { required: true, message: '请输入', trigger: 'blur' },
//		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
		        realWater: [
		            { required: true, message: '请输入', trigger: 'blur' },
//		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
//		        realImpurity: [
//		            { required: true, message: '请输入', trigger: 'blur' },
//		            { type: 'number', message: '请输数字', trigger: 'blur' },
//		        ],
		        
		        deductVolume: [
		            { required: true, message: '请输入', trigger: 'blur' },
		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
		        length: [
		            { required: true, message: '请输入', trigger: 'blur' },
//		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
		        wide: [
		            { required: true, message: '请输入', trigger: 'blur' },
//		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
		        high: [
		            { required: true, message: '请输入', trigger: 'blur' },
//		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
		        correctioFactor: [
		            { required: true, message: '请输入', trigger: 'blur' },
		            { type: 'number', message: '请输数字', trigger: 'blur' },
		        ],
//		        下拉框类型
		        storge: [
		            { required: true, message: '请选择', trigger: 'change' }
		        ],
		        qualityGrade: [
		            { required: true, message: '请选择', trigger: 'change' }
		        ],
		        barnType: [
		            { required: true, message: '请选择', trigger: 'change' }
		        ],
		        isMatch:[
		            { required: true, message: '请选择', trigger: 'change' }
		        ],
//		        日期类型
		        checkedTime: [
		            { type: 'date', required: true, message: '请选日期', trigger: 'change' }
		        ],
		        realCheckedTime: [
		            { type: 'date', required: true, message: '请选日期', trigger: 'change' }
		        ],

//		        单选类型
		        putWay: [
		            { required: true, message: '请选择入仓方式', trigger: 'change' }
		        ],
		    },
        }
    },
    methods: {  
    	//	获取库列表
	  	getlibrarylist(){
			this.$http({
			    method: 'post',
				url: this.apiRoot + '/grain/library/data',
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
					
				}
		    }).then(function (response) {
			  	this.librarylist = response.data.rows;
//			  	console.log(this.librarylist)
			}.bind(this)).catch(function (error) {
			    console.log(error);
			}.bind(this));
	  	},
        onSubmit(formname) {
            this.$refs[formname].validate((valid) => {
                if (valid) {
//              	console.log(123)
                 this.$emit('submit',this.jsdjg,'save')
					// window.history.go(-1)
                } else {
//                  console.log('error submit!!');
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
        pjmdff(){
//      	console.log(this.calculation_density)
			this.$emit('pjmdff',this.calculation_density)
        },
        exportexcel(formname) {
            this.$refs[formname].validate((valid) => {
                if (valid) {
//              	console.log(123)
//               this.$emit('exportexcel',this.jsdjg)
                 this.$emit('submit',this.jsdjg,'exportexcel')
					// window.history.go(-1)
                } else {
//                  console.log('error submit!!');
                    return false;
                }
            });
        },
        dateChange(){
//      	console.log(this.formdatas.form.realCheckedTime)
        },
//      保留,并四舍五入
        changeNum(field){
//      	var path=field.split('.');
//      	var value=this[path[0]][path[1]][path[2]]-0;
//      	var toFixed=value.toFixed(2);
//      	var res=parseFloat(toFixed);
//      	this[path[0]][path[1]][path[2]]=res;       	
        },
        changeShape(val){
//      	console.log(this.formdatas.form.high_2)
        	this.$refs['form'].clearValidate()
        	this.formdatas.form.high="0.00";
        	this.formdatas.form.length="0.00";
        	this.formdatas.form.wide="0.00";
        	this.formdatas.form.topS="0.00";
        	this.formdatas.form.bottomS="0.00";
        	this.formdatas.form.diameter="0.00";
        	this.formdatas.form.length_2="0.00";
        	this.formdatas.form.high_2="0.00";
        },
    }

}
</script>