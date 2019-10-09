<template>
  <div id="prescription">
    <div>
      <div style="width: 100%;height: 100px;font-size: 34px;line-height: 100px;font-weight: 700;">检查并发送</div>
    </div>
    <div class="prescription" >
      <div class="main">
        <h3 class="p-tit">西药处方</h3>
        <p class="line"></p>
        <div class="case-info">
          <span>患者姓名：张三</span>
          <span>患者性别：男</span>
          <span>患者年龄：36</span>
          <span>开方日期：2019年8月1日</span>
        </div>
        <el-row class="text-item">
          <el-col :span="5"><div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >病史、症状及体征：</div></el-col>
          <el-col :span="18">
            <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >急性阑尾炎嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻</div>
          </el-col>
        </el-row>
        <el-row class="text-item">
          <el-col :span="3"><div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >临床诊断：</div></el-col>
          <el-col :span="18">
            <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >....诊断....诊断</div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 50px;vertical-align: super; text-align: left;font-weight: 100;line-height: 50px; font-size: 30px;padding-left: 30px;" >RP</div>
        <div class="divTab">
          <el-table
            border
            :data="westernData"
            style="width: 100%">
            <el-table-column
              label="项目名称"
              width="">
              <template slot-scope="scope">
                {{ scope.row.m_name }}
              </template>
            </el-table-column>
            <el-table-column
              label="剂型"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_jx }}
              </template>
            </el-table-column>
            <el-table-column
              label="规格"
              width="">
              <template slot-scope="scope">
                {{ scope.row.m_gg }}
              </template>
            </el-table-column>
            <el-table-column
              label="关联"
              width="50">
              <template slot-scope="scope">
                {{ scope.row.m_gl}}
              </template>
            </el-table-column>
            <el-table-column
              label="单次剂量"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_dcjl}}
              </template>
            </el-table-column>
            <el-table-column
              label="剂量单位"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_jldw}}
              </template>
            </el-table-column>
            <el-table-column
              label="频次"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.m_pc}}
              </template>
            </el-table-column>
            <el-table-column
              label="用法"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_yf}}
              </template>
            </el-table-column>
            <el-table-column
              label="疗程"
              width="50">
              <template slot-scope="scope">
                {{ scope.row.m_lc}}
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_dj}}
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              width="50">
              <template slot-scope="scope">
                {{ scope.row.m_sl}}
              </template>
            </el-table-column>
            <el-table-column
              label="滴速"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.m_ds}}
              </template>
            </el-table-column>
            <el-table-column
              label="包装单位"
              width="90">
              <template slot-scope="scope">
                {{ scope.row.m_bzdw}}
              </template>
            </el-table-column>
            <el-table-column
              label="总金额"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_zje}}
              </template>
            </el-table-column>
            <el-table-column
              label="报销"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.m_bx}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="prescription" >
          <el-row class="text-item" style="padding-left: 20px;" >
            <el-col :span="2"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医嘱：</div></el-col>
            <el-col :span="18">
              <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >多喝热水</div>
            </el-col>
          </el-row>
        </div>
        <div class="prescription" >
          <el-row class="text-item" style="padding-left: 20px;" >
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >总价：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >自费：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >可报销：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >科室：</div></el-col>
            <el-col :span="3">
              <div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是科室</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医生：</div></el-col>
            <el-col :span="3">
              <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是医生</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医生签名：</div></el-col>
            <el-col :span="3">
              <div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是签名</div>
            </el-col>
          </el-row>
        </div>
    </div>

    <!-- 中药处方 -->
    <div class="prescription" >
      <div class="main">
        <h3 class="p-tit">中药处方</h3>
        <p class="line"></p>
        <div class="case-info">
          <span>患者姓名：张三</span>
          <span>患者性别：男</span>
          <span>患者年龄：36</span>
          <span>开方日期：2019年8月1日</span>
        </div>
        <el-row class="text-item">
          <el-col :span="5"><div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >病史、症状及体征：</div></el-col>
          <el-col :span="18">
            <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >急性阑尾炎嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻</div>
          </el-col>
        </el-row>
        <el-row class="text-item">
          <el-col :span="3"><div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >临床诊断：</div></el-col>
          <el-col :span="18">
            <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >....诊断....诊断</div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 50px;vertical-align: super; text-align: left;font-weight: 100;line-height: 50px; font-size: 30px;padding-left: 30px;" >RP</div>
        <div class="divTab" v-show="nowIndex===0" style="display: flex;justify-content: space-between;">
          <el-table
          style="padding-left: 80px;"
            border
            :data="westernData">
            <el-table-column
              label="药品名称"
              width="150">
              <template slot-scope="scope">
                {{ scope.row.m_name }}
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_sl}}
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_dj}}
              </template>
            </el-table-column>
            <el-table-column
              label="总金额"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_zje}}
              </template>
            </el-table-column>
          </el-table>

          <el-table
            border
            :data="westernData">
            <el-table-column
              label="药品名称"
              width="150">
              <template slot-scope="scope">
                {{ scope.row.m_name }}
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_sl}}
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_dj}}
              </template>
            </el-table-column>
            <el-table-column
              label="总金额"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_zje}}
              </template>
            </el-table-column>
          </el-table>

          <el-table
            border
            :data="westernData">
            <el-table-column
              label="药品名称"
              width="150">
              <template slot-scope="scope">
                {{ scope.row.m_name }}
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_sl}}
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_dj}}
              </template>
            </el-table-column>
            <el-table-column
              label="总金额"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_zje}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="prescription" >
          <el-row class="text-item" style="padding-left: 20px;" >
            <el-col :span="2"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医嘱：</div></el-col>
            <el-col :span="18">
              <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >多喝热水</div>
            </el-col>
          </el-row>
        </div>
        <div class="prescription" >
          <el-row class="text-item" style="padding-left: 20px;" >
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >总价：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >自费：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >可报销：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >科室：</div></el-col>
            <el-col :span="3">
              <div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是科室</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医生：</div></el-col>
            <el-col :span="3">
              <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是医生</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医生签名：</div></el-col>
            <el-col :span="3">
              <div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是签名</div>
            </el-col>
          </el-row>
        </div>
    </div>

    <!-- 检查单 -->
    <div class="prescription" >
      <div class="main">
        <h3 class="p-tit">检查单</h3>
        <p class="line"></p>
        <div class="case-info">
          <span>患者姓名：张三</span>
          <span>患者性别：男</span>
          <span>患者年龄：36</span>
          <span>开方日期：2019年8月1日</span>
        </div>
        <el-row class="text-item">
          <el-col :span="5"><div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >病史、症状及体征：</div></el-col>
          <el-col :span="18">
            <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >急性阑尾炎嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻</div>
          </el-col>
        </el-row>
        <el-row class="text-item">
          <el-col :span="3"><div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >临床诊断：</div></el-col>
          <el-col :span="18">
            <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >....诊断....诊断</div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 50px;vertical-align: super; text-align: left;font-weight: 100;line-height: 50px; font-size: 30px;padding-left: 30px;" >RP</div>
        <div class="divTab" v-show="nowIndex===0">
          <el-table
            border
            :data="westernData"
            style="width: 100%">
            <el-table-column
              label="项目名称"
              width="">
              <template slot-scope="scope">
                {{ scope.row.m_name }}
              </template>
            </el-table-column>
            <el-table-column
              label="剂型"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_jx }}
              </template>
            </el-table-column>
            <el-table-column
              label="规格"
              width="">
              <template slot-scope="scope">
                {{ scope.row.m_gg }}
              </template>
            </el-table-column>
            <el-table-column
              label="关联"
              width="50">
              <template slot-scope="scope">
                {{ scope.row.m_gl}}
              </template>
            </el-table-column>
            <el-table-column
              label="单次剂量"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_dcjl}}
              </template>
            </el-table-column>
            <el-table-column
              label="剂量单位"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_jldw}}
              </template>
            </el-table-column>
            <el-table-column
              label="频次"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.m_pc}}
              </template>
            </el-table-column>
            <el-table-column
              label="用法"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_yf}}
              </template>
            </el-table-column>
            <el-table-column
              label="疗程"
              width="50">
              <template slot-scope="scope">
                {{ scope.row.m_lc}}
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_dj}}
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              width="50">
              <template slot-scope="scope">
                {{ scope.row.m_sl}}
              </template>
            </el-table-column>
            <el-table-column
              label="滴速"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.m_ds}}
              </template>
            </el-table-column>
            <el-table-column
              label="包装单位"
              width="90">
              <template slot-scope="scope">
                {{ scope.row.m_bzdw}}
              </template>
            </el-table-column>
            <el-table-column
              label="总金额"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_zje}}
              </template>
            </el-table-column>
            <el-table-column
              label="报销"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.m_bx}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="prescription" >
          <el-row class="text-item" style="padding-left: 20px;" >
            <el-col :span="2"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医嘱：</div></el-col>
            <el-col :span="18">
              <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >多喝热水</div>
            </el-col>
          </el-row>
        </div>
        <div class="prescription" >
          <el-row class="text-item" style="padding-left: 20px;" >
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >总价：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >自费：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >可报销：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >科室：</div></el-col>
            <el-col :span="3">
              <div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是科室</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医生：</div></el-col>
            <el-col :span="3">
              <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是医生</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医生签名：</div></el-col>
            <el-col :span="3">
              <div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是签名</div>
            </el-col>
          </el-row>
        </div>
    </div>

    <!-- 治疗单 -->
    <div class="prescription" >
      <div class="main">
        <h3 class="p-tit">治疗单</h3>
        <p class="line"></p>
        <div class="case-info">
          <span>患者姓名：张三</span>
          <span>患者性别：男</span>
          <span>患者年龄：36</span>
          <span>开方日期：2019年8月1日</span>
        </div>
        <el-row class="text-item">
          <el-col :span="5"><div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >病史、症状及体征：</div></el-col>
          <el-col :span="18">
            <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >急性阑尾炎嘻嘻嘻嘻嘻嘻嘻嘻寻寻寻</div>
          </el-col>
        </el-row>
        <el-row class="text-item">
          <el-col :span="3"><div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >临床诊断：</div></el-col>
          <el-col :span="18">
            <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >....诊断....诊断</div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 50px;vertical-align: super; text-align: left;font-weight: 100;line-height: 50px; font-size: 30px;padding-left: 30px;" >RP</div>
        <div class="divTab" v-show="nowIndex===0">
          <el-table
            border
            :data="westernData"
            style="width: 100%">
            <el-table-column
              label="项目名称"
              width="">
              <template slot-scope="scope">
                {{ scope.row.m_name }}
              </template>
            </el-table-column>
            <el-table-column
              label="剂型"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_jx }}
              </template>
            </el-table-column>
            <el-table-column
              label="规格"
              width="">
              <template slot-scope="scope">
                {{ scope.row.m_gg }}
              </template>
            </el-table-column>
            <el-table-column
              label="关联"
              width="50">
              <template slot-scope="scope">
                {{ scope.row.m_gl}}
              </template>
            </el-table-column>
            <el-table-column
              label="单次剂量"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_dcjl}}
              </template>
            </el-table-column>
            <el-table-column
              label="剂量单位"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_jldw}}
              </template>
            </el-table-column>
            <el-table-column
              label="频次"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.m_pc}}
              </template>
            </el-table-column>
            <el-table-column
              label="用法"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_yf}}
              </template>
            </el-table-column>
            <el-table-column
              label="疗程"
              width="50">
              <template slot-scope="scope">
                {{ scope.row.m_lc}}
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.m_dj}}
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              width="50">
              <template slot-scope="scope">
                {{ scope.row.m_sl}}
              </template>
            </el-table-column>
            <el-table-column
              label="滴速"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.m_ds}}
              </template>
            </el-table-column>
            <el-table-column
              label="包装单位"
              width="90">
              <template slot-scope="scope">
                {{ scope.row.m_bzdw}}
              </template>
            </el-table-column>
            <el-table-column
              label="总金额"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.m_zje}}
              </template>
            </el-table-column>
            <el-table-column
              label="报销"
              width="100">
              <template slot-scope="scope">
                {{ scope.row.m_bx}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="prescription" >
          <el-row class="text-item" style="padding-left: 20px;" >
            <el-col :span="2"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医嘱：</div></el-col>
            <el-col :span="18">
              <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >多喝热水</div>
            </el-col>
          </el-row>
        </div>
        <div class="prescription" >
          <el-row class="text-item" style="padding-left: 20px;" >
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >总价：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >自费：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >可报销：</div></el-col>
            <el-col :span="2">
              <div style="color: red; height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >￥999</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >科室：</div></el-col>
            <el-col :span="3">
              <div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是科室</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医生：</div></el-col>
            <el-col :span="3">
              <div style="height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是医生</div>
            </el-col>
            <el-col :span="1.5"><div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >医生签名：</div></el-col>
            <el-col :span="3">
              <div style=" height: 30px; text-align: left;font-weight: 100;line-height: 30px; font-size: 22px;" >我是签名</div>
            </el-col>
          </el-row>
        </div>
    </div>

    <div class="operation">
        <span class="cancel" @click="cancel">返回修改</span>
        <span style="background-color: gold;" class="print">打印并发送患者</span>
        <span class="print" @click="printHtmlCustomStyle">发送患者</span>
    </div>
    <InfoPanel ref="InfoPanel" @addItem="addItem" ></InfoPanel>
  </div>
</template>
<script>
import pagination from '@/components/pagination/pagination'
import InfoPanel from '@/components/Prescription/InfoPanel'
import printJS from 'print-js'
export default {
  components: {
    pagination: pagination,
    InfoPanel: InfoPanel
  },
  props: {
    closable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      msg: 'chatbox',
      dialogVisible: false,
      innerDialogVisible: false,
      medicalHistory: '海末次综合症',
      readonly: false,
      dynamicTags: [
        '***诊断',
        '***诊断',
        '***诊断',
        '***诊断'
      ],
      tabs: [
        '治疗/药品',
        '中药汤剂'
      ],
      activeName: 'second',
      nowIndex: 0, // 默认第一个tab为激活状态
      westernData: [
        {
          m_name: '***药品',
          m_jx: '液体',
          m_gg: '25毫升/瓶',
          m_gl: '1',
          m_dcjl: '200',
          m_jldw: '毫升',
          m_pc: '每天1次',
          m_yf: '静脉滴注',
          m_lc: '1',
          m_dj: '566',
          m_sl: '2',
          m_ds: '15滴/分',
          m_bzdw: '**/分',
          m_zje: '688',
          m_bx: '可报销'
        },
        {
          m_name: '***药品',
          m_jx: '液体',
          m_gg: '25毫升/瓶',
          m_gl: '1',
          m_dcjl: '200',
          m_jldw: '毫升',
          m_pc: '每天1次',
          m_yf: '静脉滴注',
          m_lc: '1',
          m_dj: '566',
          m_sl: '2',
          m_ds: '15滴/分',
          m_bzdw: '**/分',
          m_zje: '688',
          m_bx: '可报销'
        },
        {
          m_name: '***药品',
          m_jx: '液体',
          m_gg: '25毫升/瓶',
          m_gl: '1',
          m_dcjl: '200',
          m_jldw: '毫升',
          m_pc: '每天1次',
          m_yf: '静脉滴注',
          m_lc: '1',
          m_dj: '566',
          m_sl: '2',
          m_ds: '15滴/分',
          m_bzdw: '**/分',
          m_zje: '688',
          m_bx: '可报销'
        }],
      tcmData: [

      ],
      c_fs: '',
      c_ff: '',
      c_pc: '',
      c_ycyy: '',
      historyList: [
        {
          date: '2019-4-02 10:41:35',
          text: '感冒-（上呼吸道感染）（临床诊断）'
        },
        {
          date: '2019-4-02 10:41:35',
          text: '感冒-（上呼吸道感染）（临床诊断）'
        }
      ]
    }
  },
  mounted () {

  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    openInnerDialog () {
      this.innerDialogVisible = true
    },
    closeInnerDialog () {
      this.innerDialogVisible = false
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    toggleTabs: function (index) {
      this.nowIndex = index
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    openPanel (type, display) {
      this.$refs.InfoPanel.displayPanel(type, display)
    },
    addItem (type, data) {
      switch (type) {
        case 'zd':
          this.addZd(data)
          return
        case 'xy':
          this.addXy(data)
          return
        case 'yf':
          this.addYf(data)
      }
    },
    addZd (data) {
      this.dynamicTags.push(data)
    },
    addXy (data) {
      let item = {
        m_gl: '1',
        m_dcjl: '200',
        m_jldw: '毫升',
        m_pc: '每天1次',
        m_yf: '静脉滴注',
        m_lc: '1',
        m_dj: '566',
        m_sl: '2',
        m_ds: '15滴/分',
        m_bzdw: '**/分',
        m_zje: '688'
      }
      item.m_name = data.name
      item.m_jx = data.jx
      item.m_gg = data.gg
      item.m_bx = data.bx
      this.westernData.push(item)
    },
    addYf (data) {
      for (let i = 0, len = data.length; i < len; i += len / 3) {
        this.tcmData.push(data.slice(i, i + len / 3))
      }
    },
    printHtmlCustomStyle () {
      const style = '@page { margin: 0 } @media print { h1 { color: blue } }'// 直接写样式
      printJS({
        printable: 'prescription', // 要打印内容的id
        type: 'html',
        style: style,
        scanStyles: false
      })
    },
    cancel () {
      this.$emit('closeInnerDialog')
    }
  }

}
</script>
<style scoped lang="less">
.prescription {
  padding: 30px 0 30px 0;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
  .p-tit {
    font-size: 32px;
    font-weight: bold;
  }
  .line {
    width: 100%;
    margin: 40px auto 20px;
    border-bottom: 2px dashed #333333;
  }
  .case-info{
    font-size: 22px;
  }
  &>.main{
    width: 70%;
    min-width: 1000px;
    margin: 0 auto;
    .case-info {
      display: flex;
      justify-content: space-between;
      padding: 30px 0px;
    }
    .text-item {
      margin: 30px 0 0 0 ;
      .tit {
        text-align: right;
        font-size: 22px;
        line-height: 30px;
        margin-right: 10px;
      }
      .tags{
        border:1px solid rgba(210,210,210,1);
        border-radius:3px;
        min-height: 204px;
        text-align: left;
        padding: 15px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        .el-tag {
          background:rgba(238,238,238,1);
          color: #565656;
          margin: 0 20px 20px 0;
          width: 135px;
          height: 50px;
          box-sizing: border-box;
          text-align: center;
          line-height: 50px;
          font-size: 18px;
          .el-tag__close {
            color: #999999;
            border: 1px solid #999999;
            border-radius: 50%;
            transition: 0.3s;
            &:hover {
              background:rgba(238,238,238,1);
              transform:rotate(90deg);
              transition: 0.3s;
            }
          }
        }
        .operations{
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .btns {
            text-align: center;
            span{
              display: inline-block;
              width:130px;
              height:50px;
              font-size:20px;
              line-height:50px;
              margin-right: 10px;
              border-radius:3px;
              cursor: pointer;
              &.clear{
                background:rgba(242,242,242,1);
                color:rgba(170,170,170,1);
              }
              &.add {
                background:rgba(67,190,127,1);
                color:#fff;
              }
            }
          }
          .limit {
            color: #AAAAAA;
            font-size:20px;
          }
        }
      }
    }
  }

}
.medical {
  padding: 10px 0;
  .tabs-wrap {
    text-align: left;
    .tabs {
      border-radius: 25px;
      overflow: hidden;
      display: inline-block;
      margin: 10px 0;
      li {
        text-align: center;
        display: inline-block;
        width:150px;
        height:50px;
        line-height: 50px;
        color: #565656;
        background:#fff;
        box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
        cursor: pointer;
        font-size: 22px;
        transition: 0.3s ease-in-out;
        &.active{
          background:rgba(67,190,127,1);
          color: #fff;
          transition: 0.3s ease-in-out;
        }
      }
    }
    .tabs-block{
      box-shadow:0px -1px 9px 0px rgba(234,234,234,1);
      border-radius:3px 3px 0px 0px;
      .divTab {
        .add-item {
          height:70px;
          background:rgba(255,255,255,1);
          font-size:18px;
          color:rgba(67,190,127,1);
          line-height:70px;
          cursor: pointer;
          i {
            margin: 0 5px 0 30px;
          }
        }
        .change{
          color: #fff;
          height:45px;
          line-height: 45px;
          background:rgba(67,190,127,1);
          border-radius:3px;
          width:180px;
          text-align: center;
          margin: 20px auto;
          cursor: pointer;
        }
      }
      .tcmTab {
        display: flex;
        width: 100%;
        /*overflow-x: scroll;*/
        justify-content: space-between;
        flex-wrap: wrap;
        .tcmData{
          margin: 5px;
          box-shadow:0px -1px 9px 0px rgba(234,234,234,1);
        }
      }
      .handleWrite{
        display: flex;
        justify-content: space-between;
        background: #fff;
        padding: 20px 10px;
        box-sizing: border-box;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
            display: inline-block;
            min-width: 90px;
          }
        }
      }
    }
  }
}
.history{
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
  padding: 40px 0;
  &>.main{
    width: 70%;
    min-width: 1000px;
    margin: 0 auto;
    .tit {
      font-size: 22px;
      line-height: 50px;
      text-align: right;
    }
    .history-main {
      margin-top: 60px;
      .history-list{
        border:1px solid rgba(210,210,210,1);
        border-radius:3px;
        li {
          height: 66px;
          border-bottom:1px solid rgba(210,210,210,1);
          line-height: 66px;
          text-align: left;
          box-sizing: border-box;
          padding: 0 10px;
          font-size: 22px;
          &:last-child{
            border: 0;
          }
        }
      }
    }
  }
}
.operation {
  padding: 35px 0 40px 0;
  span {
    display: inline-block;
    height:50px;
    line-height: 50px;
    text-align: center;
    border-radius:3px;
    min-width: 100px;
    cursor: pointer;
    margin: 0 27px;
    &.cancel{
      color: #565656;
      background:rgba(229,229,229,1);
    }
    &.print{
      color: #fff;
      background:rgba(67,190,127,1);
    }
  }
}
</style>
<style type="text/css">
  .el-table--enable-row-transition .el-table__body td{
    text-align: center !important;
  }
  .el-table td, .el-table th{
    text-align: center;
  }
  .el-table th{
    background-color: #F6F6F6 !important;
  }
  .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed,
  .el-table td, .el-table th.is-leaf{
    border-color: #DCDCDC !important;
  }
  .el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid #DCDCDC !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background:rgba(67,190,127,1);
  }
   .el-textarea__inner{
    font-size: 20px;
  }
  .el-table .cell{
    font-size: 18px;
  }
  .el-table th>.cell{
    font-size: 18px;
  }
  .el-tag .el-tag__close{
    color: #999;
  }
  .el-tag .el-tag__close:hover {
    color: #FFF;
    background-color: #999;
  }
  .el-table{
    flex: auto!important;

  }
</style>
