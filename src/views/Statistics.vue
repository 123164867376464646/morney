<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="bar-wrapper" ref="barWrapper">
      <Chart class="chart-bar" :options="chartOptions"/>
    </div>
    <ol v-if="groupedList.length>0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record"
          >
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      <span>目前没有相关记录</span>
    </div>
  </Layout>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Money/Tabs.vue';
import recordTypeList from '@/constents/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import 'echarts';
import _ from 'lodash'
import day from 'dayjs'

@Component({
  components: {Tabs, Chart},
})
export default class Statistics extends Vue {
  get keyValueList() {
    const today = new Date();
    const array = [];
    for(let i = 0; i <= 29; i++) {
      const dateString = day(today).subtract(i, 'day').format('YYYY-MM-DD')
      const found = _.find(this.groupedList, {
        title: dateString
      });
      array.push({
        key: dateString, value: found ? found.total: 0
      });
      array.sort((a, b) => {
        if(a.key > b.key) {
          return 1;
        } else if(a.key === b.key) {
          return 0;
        } else {
          return -1;
        }
      });
    }
    return array;
  }

  get chartOptions() {
    const keys = this.keyValueList.map(item => item.key);
    const values = this.keyValueList.map(item => item.value);
    return {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove|click',
        position: 'top',
        formatter: '{c}'
      },
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel:{
          formatter: function(value:string){
            return value.substr(5)
          }
        },
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        }
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
          symbol: 'circle',
          symbolSize: 12,
          itemStyle: {
            color: '#666',
          },
          data: values,
          type: 'line',


        }
      ]
    };
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();

    if(day.isSame(now, 'day')) {
      return '今天';
    } else if(day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if(day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if(day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if(newList.length === 0) {return [];}
    type Result = {
      title: string,
      total?: number,
      items: RecordItem[]
    }[]
    const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for(let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if(dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(newList[i]);
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  mounted() {
    const div = this.$refs.barWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }

  type = '-';
  recordTypeList = recordTypeList;

}
</script>

<style scoped lang="scss">
.noResult {
  padding: 16px;
  text-align: center;
}

::v-deep {
  .type-tabs-item {
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item
}

.record {
  @extend %item;
  background: white;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}

.chart {
  height: 400px;
}

.chart-bar {
  width: 430%;
}

.bar-wrapper {
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

</style>