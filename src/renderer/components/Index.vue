<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">{{username}}</el-menu-item>
        </el-menu>


        <el-row>
            <!--左空白-->
            <el-col :span="6">
                <div>&nbsp;</div>
            </el-col>

            <!--中间区域-->
            <el-col :span="12">
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="search_text" class="input-with-select">
                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                            <el-option label="餐厅名" value="1"></el-option>
                            <el-option label="订单号" value="2"></el-option>
                            <el-option label="用户电话" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>


            </el-col>

            <!--右添加作业-->
            <el-col :span="6">
                <el-button type="primary" icon="el-icon-plus" class="add-homework-btn" @click="addHomework">添加作业</el-button>
            </el-col>

        </el-row>


        <el-row>

            <!--左空白-->
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>

            <!--中间区域-->
            <el-col :span="18">
                <el-table class="class-table"
                          :data="tableData"
                          border
                          style="width: 100%">
                    <el-table-column
                            fixed
                            prop="id"
                            label="编号"
                            width="100%">
                    </el-table-column>
                    <el-table-column
                            prop="class"
                            label="班级"
                            width="100%">
                    </el-table-column>
                    <el-table-column
                            prop="statue"
                            label="状态"
                            width="100%">
                    </el-table-column>
                    <el-table-column
                            prop="start_time"
                            label="开始时间"
                            width="200%">
                    </el-table-column>
                    <el-table-column
                            prop="end_time"
                            label="结束时间"
                            width="200%">
                    </el-table-column>
                    <el-table-column
                            prop="commit"
                            label="提交人数"
                            width="100%">
                    </el-table-column>

                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">
                                查看
                            </el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>

            <!--右空白-->
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>

        </el-row>

    </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      select: "",
      username: JSON.parse(window.localStorage.getItem("user")).name,
      activeIndex: "1",
      tableData: [
        {
          id: "1",
          class: "15140Y01",
          statue: "已经结束",
          start_time: "2018年4月2日 21点03分",
          end_time: "2018年4月2日 21点03分",
          commit: "12/50"
        },
        {
          id: "2",
          class: "15140Y01",
          statue: "进行中",
          start_time: "2018年4月2日 21点03分",
          end_time: "2018年4月2日 21点03分",
          commit: "48/50"
        },
        {
          id: "3",
          class: "15140Y02",
          statue: "已经结束",
          start_time: "2018年4月2日 21点03分",
          end_time: "2018年4月2日 21点03分",
          commit: "34/ 52"
        }
      ],
      search_text: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    // 编辑按键
    handleClick(row) {
      console.log(row.id);
      this.$router.push();
    },
    // 添加作业
    addHomework: function() {
      this.$router.push("/addPage");
    }
  },
  computed: {
    user() {
      return JSON.parse(window.localStorage.getItem("user"));
    }
  }
};
</script>

<style scoped>
.class-table {
  margin-top: 30px;
}

.add-homework-btn {
  margin: 15px;
}
</style>