<template>
	<div class="common_select_header" >
		<div class="btnwrap" >
			<!--<el-button type="primary" :loading="false">确认搜索</el-button>-->
			<!--<span @click="_select" :class="{disabled:ispoint}" :disabled="ispoint">搜索</span>-->
			<span @click="_select">搜索</span>
		</div>
		<div class="selectwrap">
			<div class="selectitemwrap">
				<div class="label bg">
					品种
				</div>
				<div class="selectitem">
					<el-select v-model="sample" @change="getList" placeholder="请选择品种">
		                <el-option label="玉米" value="1"></el-option>
		                <el-option label="小麦" value="2"></el-option>
		            </el-select>
				</div>
			</div>
			<div class="selectitemwrap">
				<div class="label bg">
					直属库
				</div>
				<div class="selectitem">
					<el-select v-model="region" placeholder="请选择直属库"  @change="close">
		                <el-option v-for="item in regionList" :key="item.id" :label="item.libraryName" :value="item.id">
		                </el-option>
		            </el-select>
				</div>
			</div>
			<div class="selectitemwrap">
				<div class="label bg">
					库点
				</div>
				<div class="selectitem">
					<el-select v-model="point" placeholder="请选择库点" @change="_select">
		                <el-option v-for="item in pointList" :key="item.id" :label="item.libraryName" :value="item.id">
		                </el-option>
		            </el-select>
				</div>
			</div>
			<div class="selectitemwrap">
				<div class="label bg">
					货位号
				</div>
				<div class="selectitem">
                    <el-input v-model="number" placeholder="请输入货位号" ></el-input>
				</div>
			</div>
		</div>

		
	</div>
</template>
<style>
	div.common_select_header{
		width:auto;
		height: 0.5rem;
		line-height:0.5rem;
		border: solid 1px #ccc;
		/*border-bottom: none;*/
		margin-top: 0.05rem;
		overflow: hidden;
	}
	div.common_select_header .btnwrap{
		width:0.9rem;
		height: 0.5rem;
		float:right;
		/*margin:-1px -1px -1px 0;
		background:white;*/
	}
	div.common_select_header .btnwrap span{
		display:block;
		width:0.76rem;
		height:0.36rem;
		line-height:0.36rem;
		background-color: #58b481;
		color: #ffffff;
		font-size: 0.16rem;
		margin:0.06rem auto 0;
		text-align: center;
		cursor:pointer;
		/*border-radius:0.1rem;*/
	}
	div.common_select_header .btnwrap span.disabled{
		cursor:not-allowed;
		pointer-events: none;
	}
	div.common_select_header .selectwrap{
		width:auto;
		height: 0.5rem;
		line-height:0.5rem;
		overflow: hidden;
	}
	div.common_select_header .selectwrap .selectitemwrap{
		width:25%;
		height: 0.5rem;
		line-height:0.5rem;
		overflow: hidden;
		float:left;
	}
	div.common_select_header .selectwrap .selectitemwrap .label{
		width:0.8rem;
		height: 0.5rem;
		line-height:0.5rem;
		float:left;
		color: #333333;
		text-align: center;
		font-size:0.16rem;
	}
	div.common_select_header .selectwrap .selectitemwrap .selectitem{
		width:auto;
		height: 0.5rem;
		line-height:0.48rem;
		overflow: hidden;
		color: #333333;
		font-size:0.16rem;
		border-left: solid 1px #ccc;
		border-right: solid 1px #ccc;
		padding:0 0.07rem;
	}
	/*下拉框样式*/
	div.common_select_header .el-select{
		width:100%;
	}

	div.common_select_header .el-select .el-input input{
		height:0.36rem;
		width:100%;
		line-height:0.34rem;
		border:solid  0.01rem #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		border-radius:0;
		text-align: center;
	}
	div.common_select_header .el-select.lib1 .el-input input{
		padding:0;
	}
	.headerSelectlib1{
		padding:0;
		text-align:center;
	}
	.headerSelectlib1 li{
		padding:0;
		text-align:center;
	}
	/*时间选择*/
	
	div.common_select_header .el-date-editor{
		width:100%;
		height:0.36rem;
		font-size:0.16rem;
		background:#f2f2f2;
		text-align: center;
		display:inline-flex;
	}
	div.common_select_header .el-date-editor input{
		width:100%;
		height:0.36rem;
		border-radius:0;
		border:0.01rem solid #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		text-align: center;
		color:#333;
		padding-right:30px;
	}
	div.common_select_header .el-input__prefix{
		line-height: 0.34rem;
	}

	div.common_select_header .el-input input{
		height:0.36rem;
		width:100%;
		line-height:0.34rem;
		border:solid  0.01rem #dfdfdf;
		font-size:0.16rem;
		background:#f2f2f2;
		border-radius:0;
		text-align: center;
	}
	div.common_select_header .bg{
		background-color: #fbfbfb;
	}

</style>


<script>

export default {
    props: ["formdatas"],
    created() {

        // this.region = null
        this.$http({
            method: 'post',
            url: this.apiRoot + "/grain/library/getAll",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: {
            }
        }).then(function(res) {
            this.option = res.data
            // console.log(this.regionList)
        }.bind(this)).catch(function(error) {
            console.log(error);
        }.bind(this));

    },
    mounted: function() {


        //		console.log(this.formdatas)
    },
    computed: {
        // 直属库
        regionList() {
            return this.option.filter((i, v) => {
                return i.pLibraryId == -1
            })
        },
        // 库点
        pointList() {
            this.point = null
            this.number = ""
            if (this.region == '全部') {
                return [];
            } else {
                return this.option.filter((i, v) => {
                    return i.pLibraryId == this.region
                })
            }
        },
        ispoint() {
            if (this.point) {
                return false
            } else {
                return true
            }
        }
    },
    data() {

        return {
            option: [],
            region: "",
            point: '',
            number: "",
            sample: "1"
        }
    },
    methods: {
        //筛选的时候让表格消失
        close(){
            this.$emit("close")
        },
        getList() {
            this.$emit("close")
            this.region = null
            this.point = null
            
//          this.$http({
//              method: 'post',
//              url: this.apiRoot + "/grain/library/getAll",
//              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//              data: {
//              }
//          }).then(function(res) {
//              this.option = res.data.rows
//              // console.log(this.regionList)
//          }.bind(this)).catch(function(error) {
//              console.log(error);
//          }.bind(this));
        },
        _select() {
        	if(!this.point){
        		this.$notify({
		          	title: '错误提示',
		          	message: '请选择库点！！！',
		          	type: 'warning'
		        });
        		return
        	}
            this.$emit("_select", { "regin": `${this.region}`, "point": `${this.point}`, "number": `${this.number}`, "sample": `${this.sample}` })
        }
    }

}
</script>

