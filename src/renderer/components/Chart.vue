<template>

  <div>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <i class="el-icon-arrow-left"></i>
      </el-menu-item>
    </el-menu>

    <!-- 图标 -->
    <div>
      <p>班级完成情况</p>
      <ve-pie :data="pieData" :settings="chartPieSettings"></ve-pie>
    </div>

    分数情况
    <div>
      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </div>

  </div>

</template>

<style scoped>

</style>

<script>
name: "Chart";
export default {
  data() {
    return {
      activeIndex: "1",
      clazzes: [],
      classList: "",
      chartData: {},
      pageId: "",
      do: 0,
      notDo: 0,
      classId: "",
      rows: []
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push("/index");
    },
    getChart: function() {
      this.pieData = {
        columns: ["已完成", "未完成"],
        rows: [
          {
            状态: "已完成",
            完成度: this.do
          },
          {
            状态: "未完成",
            完成度: this.notDo
          }
        ]
      };
      this.chartPieSettings = {
        dimension: "状态",
        metrics: "完成度",
        dataType: "%",
        selectedMode: "single",
        hoverAnimation: false,
        radius: 100,
        offsetY: 200
      };
      this.chartData = {
        columns: ["学生", "成绩"],
        rows: this.rows
      };
      this.chartSettings = {
        metrics: ["成绩"],
        dimension: ["学生"]
      };
    },
    getCount: function() {
      console.log("getCount");
    },
    getParam: function() {
      this.pageId = this.$route.query.pageId;
      this.classId = this.$route.query.classId;

      this.$http
        .get("/teacher/getClassStudentStatues", {
          params: {
            pageId: this.pageId,
            classId: this.classId
          }
        })
        .then(doRes => {
          console.log("doRes", doRes);
          this.do = doRes.data.data.do;
          this.notDo = doRes.data.data.count - this.do;
          this.getChart();
          this.$http
            .get("/teacher/getClassAllScore", {
              params: {
                classId: this.classId,
                pageId: this.pageId
              }
            })
            .then(res => {
              console.log("res", res);

              for (let index = 0; index < res.data.data.length; index++) {
                const element = res.data.data[index];
                const item = { 成绩: "", 学生: "" };
                if (element.score == null) {
                  element.score = 0;
                }
                item.成绩 = element.score;
                item.学生 = element.studentId;
                this.rows.push(item);
              }
            })
            .catch(err => {
              console.log("err", err);
            });
        })
        .catch(err => {});
    }
  },
  created() {
    this.getParam();
  }
};
</script>
