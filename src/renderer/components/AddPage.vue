<template>
   <div>

        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
                <i class="el-icon-arrow-left"></i>
            </el-menu-item>
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

                <table>
                    <!-- <tr>
                        <td>班级</td>
                        <td>
                            <el-checkbox-group v-model="checkedClasses" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="c in classes" :label="c" :key="c">{{c.name}}</el-checkbox>
                            </el-checkbox-group>
                        </td>
                    </tr> -->
                    <tr>
                        <td>科目</td>
                        <td>
                           <el-autocomplete
                                v-model="courseName"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelectInput"
                                ></el-autocomplete>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <el-button type="primary" class="submit-btn" plain @click="submitPage">下一步</el-button>
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
export default {
  name: "AddPage",
  data() {
    return {
      activeIndex: "1",
      checkAll: false,
      checkedClasses: [],
      checkedCities: ["15140Y01", "15140Y02"],
      classes: [],
      courseId: "",
      courseName: "",
      courses: [],
      classId: "",
      state4: "",
      page: {
        courseId: 0,
        teacherId: 0
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push("/index");
    },
    handleCheckedCitiesChange(value) {
      console.log(value[0]);
      this.classId = value[0].id;
    },
    getClassByTeacherId() {
      this.$http
        .get("/teacher/getClassByTeacherId", {
          params: {
            teacherId: "1"
          }
        })
        .then(res => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.classes.push(res.data.data[i]);
          }
        })
        .then(err => {});
    },
    handleSelectInput(item) {
      this.courseId = item.id;
      this.courseName = item.value;
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 800 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return this.courses;
    },
    getCourseByTeacherId() {
      this.$http
        .get("/teacher/getCourseByTeacherId", {
          params: {
            teacherId: JSON.parse(window.localStorage.getItem("user")).id
          }
        })
        .then(res => {
          console.log("res", res);
          for (let i = 0; i < res.data.data.length; i++) {
            const course = {};
            course.name = res.data.data[i].name;
            course.id = res.data.data[i].id;
            this.courses.push({ value: course.name, id: course.id });
          }
          console.log("courses", this.courses);
        })
        .then(err => {});
    },
    submitPage() {
      // 对象
      this.page.courseId = this.courseId;
      this.page.teacherId = JSON.parse(window.localStorage.getItem("user")).id;

      console.log(this.page);

      // 提交
      this.$http
        .post(
          "/teacher/addPage",
          {
            courseId: this.page.courseId,
            teacherId: this.page.teacherId
          },
          { emulateJSON: true }
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            var pageId = res.data.data.id;
            var courseId = this.courseId;
            this.$router.push({
              path: "/addknowledge",
              query: { 'pageId': pageId, 'courseId': courseId }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getCourseByTeacherId();
    this.getClassByTeacherId();
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>

<style scoped>
.submit-btn {
  width: 100%;
}
</style>
