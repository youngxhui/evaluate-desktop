<template>
    <div>

        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><i class="el-icon-arrow-left"></i></el-menu-item>
        </el-menu>

        <div>
            &nbsp;
        </div>
        <el-row>

            <!--左空白-->
            <el-col :span="6">
                <div>
                    &nbsp;
                </div>
            </el-col>

            <!--中间区域-->
            <el-col :span="15">

                <div>基础信息</div>
                <table>

                    <tr>
                        <td>
                            名称
                        </td>
                        <td>
                            <el-input type="text" v-model="title"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>科目</td>
                        <td>
                           <el-autocomplete
                                v-model="state4"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelectInput"
                                ></el-autocomplete>
                        </td>
                    </tr>

                    <tr class="tr">
                        <td>班级</td>
                        <td>
                            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                         @change="handleCheckAllChange">全选
                            </el-checkbox> -->
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="checkedClasses" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="c in classes" :label="c" :key="c">{{c.name}}</el-checkbox>
                            </el-checkbox-group>
                        </td>
                    </tr>
                    <tr class="tr">
                        <td>时间</td>
                        <td>
                            <div class="block">
                                <el-date-picker
                                        v-model="value4"
                                        type="datetimerange"
                                        :picker-options="pickerOptions2"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        align="right">
                                </el-date-picker>
                            </div>
                        </td>

                    </tr>


                    <tr>
                        <td>备注</td>
                        <td>
                            <el-input
                                    class="note-input"
                                    type="textarea"
                                    autosize

                                    placeholder="请输入内容"
                                    v-model="note">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <el-button type="primary" class="next-btn" @click="addTitle">下一步</el-button>
                        </td>
                    </tr>
                </table>

            </el-col>

            <!--右空白-->
            <el-col :span="3">
                <div>&nbsp;
                    &nbsp;
                </div>
            </el-col>

        </el-row>

    </div>
</template>

<script>
// const cityOptions = ["15140Y01", "15140Y02", "15140Y03", "15140Y04"];
export default {
  name: "AddHomeWork",
  data() {
    return {
      title: "",
      courses: [],
      restaurants: [],
      state4: "",
      timeout: null,
      note: "",
      select: "",
      checkAll: false,
      checkedClasses: [],
      checkedCities: ["15140Y01", "15140Y02"],
      classes: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则"
            },
            {
              value: "qita",
              label: "其他"
            }
          ]
        },
        {
          value: "qita",
          label: "其他"
        }
      ],
      isIndeterminate: true,
      activeIndex: "1",
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value4: "",
      selectedOptions2: ""
      //   value: ''
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push("/index");
    },
    handleSelectInput(item) {
      console.log(item);
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleCheckAllChange(val) {
      this.checkedClasses = val ? classes.name : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      
    },
    addTitle() {
      console.log("next");
    },
    handleChange(value) {
      console.log(value);
    },
    getClassByTeacherId() {
      this.$http
        .get("/teacher/getClassByTeacherId", {
          params: {
            teacherId: "1"
          }
        })
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.classes.push(res.data.data[i]);
          }
        })
        .then(err => {});
    },
    getCourseByTeacherId() {
      this.$http
        .get("/teacher/getCourseByTeacherId", {
          params: {
            teacherId: "1"
          }
        })
        .then(res => {
          console.log("res", res);
          for (let i = 0; i < res.data.data.length; i++) {
            const course = {};
            course.name = res.data.data[i].name;
            course.id = res.data.data[i].id;
            this.courses.push({ value: course.name, address: course.id });
          }
          console.log("courses", this.courses);
        })
        .then(err => {});
    },
    loadAll() {
      return this.courses;
    }
  },
  created() {
    this.getClassByTeacherId();
    this.getCourseByTeacherId();
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>

<style scoped>
.tr {
  margin: 20px;
}

table {
  width: 100%;
  margin-top: 30px;
}

.note-input {
  width: 70%;
}

.next-btn {
  width: 100%;
}
</style>