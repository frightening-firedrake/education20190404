<template>
  <div class="listpagewrap StatisticalList">
    <!--面包屑-->
    <breadcrumb :breadcrumb="breadcrumb" v-on:searchingfor="searchingfor"></breadcrumb>
    <div class="StatisticalListRow" style="padding-top:0.28rem;">
      <div class="StatisticalListItemWrap part4" v-for="(value, key, index) in carList" :key="key">
        <div class="card">
          <div class="icon" :style="carListStyle[index].img"></div>
          <div class="content">
            <div class="title">{{carListStyle[index].title}}</div>
            <div class="data" :style="carListStyle[index].font">{{value}}</div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="StatisticalListRow">
      <div class="StatisticalListItemWrap" style="width:66%;">
        <div class="listHeader blue">
          <div class="dataSelete">
            <p>本题测试合格率统计表</p>
          </div>
          <div class="bottomline"></div>
        </div>
        <div class="chart" id="chartH" style="width:100%;"></div>
      </div>
      <div class="StatisticalListItemWrap" style="width:34%;">
        <list-header :listHeader="listHeader2"></list-header>
        <list
          class="list nopointer"
          :tabledata="tabledatas2"
          :items="items2"
          :actions="actions2"
          :loading="loading2"
        ></list>
        <pagination :page="page2" v-on:getCurrentPage="getCurrentPage2"></pagination>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import List from "@/components/common/action/List.vue";
import Prompt from "@/components/common/prompt/Prompt.vue";
import Breadcrumb from "@/components/common/action/Breadcrumb.vue";
import Pagination from "@/components/common/action/Pagination.vue";
//import ListHeaderMore from '@/components/common/action/ListHeaderMore.vue';
import ListHeader from "@/components/common/action/ListHeader.vue";
import Modal from "@/components/common/action/Modal.vue";
import Message from "@/components/common/action/Message";
import "@/assets/style/common/list.css";
import "@/assets/style/common/StatisticalList.css";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

//这里是打印控件
//import {getLodop} from 'static/lodop/LodopFuncs'
//let LODOP
//本地测试要用下面import代码
import data from "@/util/mock";

// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入折线图图组件
require("echarts/lib/chart/line");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/title");
require("echarts/lib/component/dataZoom");
require("echarts/lib/component/toolbox");

export default {
  components: {
    List,
    Prompt,
    Pagination,
    Breadcrumb,
    Modal,
    ListHeader,
    Message
  },
  computed: {
    ...mapState([]),
    ...mapGetters(["userName", "Token"])
  },
  created() {
    //	this.findSumAndValid()
    //	this.setChart();
    //	console.log(this.$route.query)
    //  获取列表数据（第一页）
    this.getlistdata1(1);
    this.getlistdata2(1);
    this.getcard();
    //	移除监听事件
    this.$root.eventHub.$off("delelistitem");
    this.$root.eventHub.$off("viewlistitem");

    //	监听列表删除事件
    this.$root.eventHub.$on(
      "delelistitem",
      function(rowid, list) {
        this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.tabledatas2 = this.tabledatas2.filter(function(item) {
              return item.id !== rowid;
            });
            //  	this.sendDeleteId(rowid);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });

        //  	console.log(rowid,list);
      }.bind(this)
    );
    //	监听列表点击查看事件
    this.$root.eventHub.$on(
      "viewlistitem",
      function(id, row) {
        //		if(!this.$_ault_alert('information:get')){
        //			return
        //		}
        this.$router.push({
          path:
            "/index/evilCriminalCases/comprehensiveCriminalCaseList/criminalCasesView",
          query: { id: id, state: row.state }
        });
      }.bind(this)
    );
  },
  mounted() {
    // this.findSumAndValid();
  },
  destroy() {
    this.$root.eventHub.$off("viewlistitem");
    this.$root.eventHub.$off("delelistitem");
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
    //获取card的数据
    getcard() {
      let params = { testId: this.$route.query.id };
      this.$http({
        method: "post",
        url: this.carListUrl,
        transformRequest: [
          function(data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          testId: this.$route.query.id
        }
      })
        .then(
          function(response) {
            let res = response.data;
            // oneTesterSum：某题测试总人次，oneTesterPassSum:某题测试合格人次,oneTesterFailureSum:某题测试不合格人次
            // 		carList: {
            //     testSum: "",
            //     testerSum: "",
            //     testPass: "",
            //     testUnpass: ""
            //   },
            this.carList.testSum = isNaN(
              res.oneTesterPassSum / res.oneTesterSum
            )
              ? 0
              : (res.oneTesterPassSum / res.oneTesterSum).toFixed(2) * 100 +
                "%";
            this.carList.testerSum = res.oneTesterSum;
            this.carList.testPass = res.oneTesterPassSum;
            this.carList.testUnpass = res.oneTesterFailureSum;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    //	列表头触发的事件
    //	搜索电话号码
    search(data) {
      this.searchText = data;
      this.getlistdata(1);
    },
    emptyCreate() {
      //		this.scanCode();
    },
    //	获取搜索数据
    searchingfor(searching, page) {
      page ? page : 1;
      this.searchText =
        searching.indexOf("监") == 0 ? searching.slice(1) : searching;
      //		console.log(this.searchText);
      var params = {};
      params.sampleWordOrsampleNumLike = this.searchText;
      params.ruKuSampleState = 2;
      params.fenxiaoyangSampleState = 3;
      params.rank = "sampleNum";
      //		console.log(this.breadcrumb.searching);
      // 获取列表数据（第？页）
      this.$http({
        method: "post",
        url: this.searchURL,
        transformRequest: [
          function(data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          page: page,
          rows: this.page.size,
          params: JSON.stringify(params)
        }
      })
        .then(
          function(response) {
            this.tabledatas = response.data.rows;
            this.page.total = response.data.total;
            this.page.currentPage = page;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },

    //	获取列表数据方法
    getlistdata1(page) {
      var params = {};
      if (this.searchText) {
        params.phoneNumber = this.searchText;
      }

      this.loading1 = false;
      // 获取列表数据（第？页）
      this.$http({
        method: "post",
        url: this.datalistURL1,
        transformRequest: [
          function(data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          page: page,
          rows: this.page1.size,
          params: JSON.stringify(params)
        }
      })
        .then(
          function(response) {
            //			console.log(response)
            // this.tabledatas1 = response.data.rows;
            // this.page1.total = response.data.total;
            // this.page1.currentPage = page;
            this.findSumAndValid(response.data.rows);
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    //	获取列表数据方法
    getlistdata2(page) {
      var params = {};

      this.loading2 = false;
      // 获取列表数据（第？页）
      this.$http({
        method: "post",
        url: this.datalistURL2,
        transformRequest: [
          function(data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          page: page,
          rows: this.page2.size,
          params: JSON.stringify(params)
        }
      })
        .then(
          function(response) {
            //			console.log(response)
            this.tabledatas2 = response.data.rows;
            this.page2.total = response.data.total;
            this.page2.currentPage = page;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    //	发送删除id
    sendDeleteId(id) {
      this.$http({
        method: "post",
        url: this.deleteURL,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          listName: this.list,
          id: id
        }
      })
        .then(function(response) {}.bind(this))
        .catch(
          function(error) {
            console.log(error);
          }.bind(this)
        );
    },
    //	获取分页点击事件中及当前页码
    getCurrentPage1(currentPage) {
      if (this.searchText) {
        this.searchingfor(this.searchText, currentPage);
      } else {
        this.getlistdata1(currentPage);
      }
    },
    getCurrentPage2(currentPage) {
      this.getlistdata2(currentPage);
    },
    titleEvent() {
      console.log("titleEvent");
    },
    getDateNow() {
      var date1 = new Date();
      return (
        date1.getFullYear() +
        "-" +
        (date1.getMonth() + 1) +
        "-" +
        date1.getDate()
      );
    },
    findSumAndValid(data) {
      //		this.$http({
      //		    method: 'post',
      //			url: this.datalistURL1,
      //			transformRequest: [function (data) {
      //				// Do whatever you want to transform the data
      //				let ret = ''
      //				for (let it in data) {
      //				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      //				}
      //				return ret
      //			}],
      //			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //			data: {
      //
      //			}
      //	    }).then(function (response) {
      //	    	var arr_sum=[];
      //	    	var arr_validNumber=[];
      //	    	response.data.forEach((value)=>{
      //	    		var obj_sum=[];
      //	    		var obj_validNumber=[];
      //	    		obj_sum[0]=value.createTime;
      //	    		obj_sum[1]=value.sum;
      //	    		obj_validNumber[0]=value.createTime;
      //	    		obj_validNumber[1]=value.validNumber;
      //	    		arr_sum.push(obj_sum);
      //	    		arr_validNumber.push(obj_validNumber);
      //	    	})
      //			this.sum=arr_sum;
      //    		this.validNumber=arr_validNumber;
      //  		this.setChart();
      //
      //		}.bind(this)).catch(function (error) {
      //		    console.log(error);
      //		}.bind(this));
      //   title标题，form测试题形式，type类型（1性格2情感3健康4人际）source来源，createTime发布时间，testerPassSum 测试合格人次  testerFailureSum 测试不合格人次
      //   var data = [
      //     {
      //       sum: 2,
      //       invalidNumber: 0,
      //       validNumber: 1,
      //       endNumber: 0,
      //       createTime: "2018-11-24"
      //     }
      //   ];
      var data = data;
      console.log(data)
      var arr_sum = [];
      var arr_validNumber = [];
      data.forEach(value => {
        var obj_sum = [];
        var obj_validNumber = [];
        obj_sum[0] = value.createTime;
        obj_sum[1] = value.testerPassSum - 0 + value.testerFailureSum - 0;
        obj_validNumber[0] = value.createTime;
        obj_validNumber[1] = value.testerPassSum;
        arr_sum.push(obj_sum);
        arr_validNumber.push(obj_validNumber);
      });
      this.sum = arr_sum;
      this.validNumber = arr_validNumber;
      this.setChart();
    },
    setChart() {
      let myChart = echarts.init(document.getElementById("chartH"));

      var lastdata = this.sum[this.sum.length - 1][0];
      var dataNow = new Date(); //今天
      var dataLast = new Date(lastdata); //数据最后一天
      var oneDay = 24 * 3600 * 1000; //一天毫秒
      //		var datastart = new Date(dataNow-oneDay*7);//默认最后7天
      var datastart = new Date(dataLast - oneDay * 7); //默认最后7天
      console.log("set ok");
      myChart.setOption({
        title: {
          text: "本题测试合格率统计表",
          show: false
        },
        color: ["#2474bd", "#dba85b"],
        tooltip: {
          trigger: "axis",
          backgroundColor: "#ffffff",
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          //		        alwaysShowContent:true,
          textStyle: {
            color: "#333"
          },
          formatter: function(params) {
            var num = isNaN(params[1].data[1] / params[0].data[1])
              ? 0
              : Math.round((params[1].data[1] / params[0].data[1]) * 100);
            var str2 =
              "<div><p><span style='color:#333;'>" +
              params[0].data[0] +
              "</span></p><p>&nbsp;&nbsp;&nbsp;测试总人次：<span style='color:" +
              params[0].color +
              ";'>" +
              params[0].data[1] +
              "次</span></p><p>测试合格人次：<span style='color:" +
              params[1].color +
              ";'>" +
              params[1].data[1] +
              "次</span></p><p>合格率：<span style='color:#2abb03;'>" +
              num +
              "%</span></p><p style='text-align:center;'><span style='color:#333;'>" +
              params[0].name +
              "</span></p></div>";
            return str2;
          },
          padding: [5, 10, 5, 10]
        },
        legend: {
          top: 25,
          //		    	bottom:25,
          data: ["测试总人次", "测试合格人次"]
        },
        grid: {
          left: "80",
          right: "85",
          bottom: "80"
          //		      	containLabel: true
        },
        toolbox: {
          orient: "vertical",
          feature: {
            mark: { show: true },
            dataView: {
              show: true,
              readOnly: false,
              optionToContent: function(opt) {
                var axisData = opt.series[0].data;
                var series = opt.series;
                var table =
                  '<table style="width:100%;text-align:center"><tbody><tr>' +
                  "<td>时间</td>" +
                  "<td>" +
                  series[0].name +
                  "</td>" +
                  "<td>" +
                  series[1].name +
                  "</td>" +
                  "<td>合格率</td>" +
                  "</tr>";
                for (var i = 0, l = axisData.length; i < l; i++) {
                  table +=
                    "<tr>" +
                    "<td>" +
                    axisData[i][0] +
                    "</td>" +
                    "<td>" +
                    series[0].data[i][1] +
                    "次</td>" +
                    "<td>" +
                    series[1].data[i][1] +
                    "次</td>" +
                    "<td>" +
                    Math.round(
                      (series[1].data[i][1] / series[0].data[i][1]) * 100
                    ) +
                    "%</td>" +
                    "</tr>";
                }
                table += "</tbody></table>";
                return table;
              },
              contentToOption: function(a, b) {
                //							console.log(a,b)
              }
            },
            //		            magicType: {show: true, type: ['line', 'bar','tiled']},
            //		            magicType: {show: true,
            //		            	type: ['line', 'bar',]
            //		            },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          itemGap: 20,
          top: 50,
          right: 30
        },
        xAxis: {
          type: "time",
          //		        boundaryGap: false,
          //		        boundaryGap: [3600 * 24 * 1000, 3600 * 24 * 1000],
          //		        min:'dataMin',
          //				min: function(value) {
          //				    return value.min - 3600 * 24 * 1000;
          //				},
          //				max: function(value) {
          //				    return value.max + 3600 * 24 * 1000;
          //				},
          minInterval: 3600 * 24 * 1000,
          axisLabel: {
            formatter: function(value, index) {
              var date = new Date(value);
              var time =
                date.getFullYear() +
                "年\n" +
                (date.getMonth() + 1) +
                "月" +
                date.getDate() +
                "日";
              return time;
            }
          }
        },
        yAxis: {
          type: "value"
        },
        dataZoom: [
          {
            type: "inside",

            start: 0,
            //			        startValue:datastart,
            end: 100
            //			        minValueSpan:3600 * 24 * 1000 * 7,
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            labelFormatter: function(value) {
              var date = new Date(value);
              var time =
                date.getFullYear() +
                "年\n" +
                (date.getMonth() + 1) +
                "月" +
                date.getDate() +
                "日";
              return time;
            }
          }
        ],
        series: [
          {
            name: "测试总人次",
            type: "line",
            data: this.sum
          },
          {
            name: "测试合格人次",
            type: "line",
            data: this.validNumber
          }
        ]
      });
    }
  },
  data() {
    return {
      carListUrl: this.apiRoot + "statistical/findSumByTestId",
      datalistURL1: this.apiRoot + "test/dataStatistical",
      datalistURL2: this.apiRoot + "account/dataRiskAssessment",
      //    datalistURL: this.apiRoot+'information/data',
      searchURL: this.apiRoot + "/grain/sample/data",
      deleteURL: "/liquid/role2/data/delete",
      sum: [],
      validNumber: [],
      carList: {
        testSum: "",
        testerSum: "",
        testPass: "",
        testUnpass: ""
      },
      carListStyle: [
        {
          title: "本题测试合格率",
          font: "color:#dbc24c;",
          img:
            "background-color:#dbc24c;background-image:url('static/images/sys/icon5.png');"
        },
        {
          title: "本题测试总人次",
          font: "color:#4c90db;",
          img:
            "background-color:#4c90db;background-image:url('static/images/sys/icon2.png');"
        },
        {
          title: "本题测试合格人次",
          font: "color:#36cebe;",
          img:
            "background-color:#36cebe;background-image:url('static/images/sys/icon3.png');"
        },
        {
          title: "本题测试危险人次",
          font: "color:#f16b74;",
          img:
            "background-color:#f16b74;background-image:url('static/images/sys/icon4.png');"
        }
      ],
      searchText: "",
      breadcrumb: {
        search: false,
        searching: ""
      },
      loading1: false,
      loading2: false,
      //    分页数据1
      page1: {
        size: 10,
        total: 1,
        currentPage: 1,
        show: true,
        tfootbtns: {}
      },
      //    分页数据2
      page2: {
        size: 10,
        total: 1,
        currentPage: 1,
        show: true,
        tfootbtns: {}
      },
      //    弹窗数据
      alerts: [
        {
          title: "温馨提示：储存前请准备好条码打印机，以便于更换检验编号!",
          type: "info"
        }
      ],
      //    表格数据1
      listHeader1: {
        search: true,
        placeholder: "请输入标题名称",
        class: "blue"
      },

      tabledatas1: [],
      items1: [
        {
          id: 1,
          prop: "title",
          label: "标题名称"
          //      minWidth:130,
          //      width:'15%',
          //      status:true,
          //      sort:true,
        },
        {
          id: 2,
          prop: "passPercentage",
          label: "合格率",
          width: 80,
          status: true
          //      sort:true,
        }
      ],
      actions1: {
        number: true,
        view1: true,
        show: true,
        actionWidth: 90
      },
      //    表格数据1
      listHeader2: {
        subtitle: true,
        title: "危险评测表榜单",
        class: "red"
      },
      tabledatas2: [],
      items2: [
        {
          id: 1,
          prop: "account",
          label: "学号"
          //      status:true,
          //      sort:true
        },
        {
          id: 2,
          prop: "sex",
          label: "性别",
          width: 70
          //      sort:true
        },
        {
          id: 3,
          prop: "weixinNum",
          label: "微信号"
          //      width:80,
          //      sort:true,
        }
      ],
      actions2: {
        show: true,
        dele: true,
        actionWidth: 70
      }
    };
  }
};
</script>

