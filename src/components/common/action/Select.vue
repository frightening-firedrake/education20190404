<template>
    <div class="common_select">
        <label>
            <span class="title_select">选择品种:</span>
            <el-select v-model="sample" @change="getList" placeholder="请选择品种">
                <el-option label="玉米" value="1"></el-option>
                <el-option label="小麦" value="2"></el-option>
            </el-select>
        </label>
        <label>
            <span class="title_select">选择直属库:</span>
            <el-select v-model="region" placeholder="请选择直属库"  @change="close">
                <!--<el-option value="全部"></el-option>-->
                <el-option v-for="item in regionList" :key="item.id" :label="item.libraryName" :value="item.id">
                </el-option>
            </el-select>
        </label>
        <label>
            <span class="title_select">选择库点:</span>
            <el-select v-model="point" placeholder="请选择库点" @change="_select">
                <el-option v-for="item in pointList" :key="item.id" :label="item.libraryName" :value="item.id">
                </el-option>
            </el-select>
        </label>
        <label>
            <span class="title_select">选择货位号:</span>
            <el-tooltip class="item" effect="dark" content="请按回车搜索" placement="top-start" :value="true">
                <el-button>
                    <el-input v-model="number" placeholder="请输入货位号" @keyup.native.enter="_select" :disabled="ispoint" class="el-select"></el-input>
                </el-button>
            </el-tooltip>
        </label>
    </div>
</template>


<script>
import "@/assets/style/common/Select.scss";
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
            point: [],
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
            this.$emit("_select", { "regin": `${this.region}`, "point": `${this.point}`, "number": `${this.number}`, "sample": `${this.sample}` })
        }
    }

}
</script>

