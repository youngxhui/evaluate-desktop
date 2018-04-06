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
                            <el-input type="text"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>科目</td>
                        <td>
                            <el-cascader
                                    expand-trigger="hover"
                                    v-model="selectedOptions2"
                                    @change="handleChange">
                            </el-cascader>
                        </td>
                    </tr>

                    <tr class="tr">
                        <td>班级</td>
                        <td>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                         @change="handleCheckAllChange">全选
                            </el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
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
    const cityOptions = ['15140Y01', '15140Y02', '15140Y03', '15140Y04'];
    export default {
        name: "AddHomeWork",
        data() {
            return {
                note: '',
                select: '',
                checkAll: false,
                checkedCities: ['15140Y01', '15140Y02'],
                cities: cityOptions,
                isIndeterminate: true,
                activeIndex: '1',
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value4: '',
                selectedOptions2: '',
                value: ''
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$router.push("/index")
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            addTitle() {
                console.log("next")
            },
            handleChange(value) {
                console.log(value);
            },
            getClass() {
                this.$http.get('/teacher/getClass').then(res => {
                    console.log(res)
                }).then(err => {

                })
            }

        },
        created() {
            this.getClass()
        }

    }

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