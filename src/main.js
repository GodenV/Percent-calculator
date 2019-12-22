import Vue from 'vue'
import App from './App.vue'
import Slider from 'ant-design-vue/lib/slider';
import InputNumber from 'ant-design-vue/lib/input-number'
import Select from 'ant-design-vue/lib/select'
import Table from 'ant-design-vue/lib/table'
import Button from 'ant-design-vue/lib/button'
import Statistic from 'ant-design-vue/lib/statistic'
import 'ant-design-vue/dist/antd.css';

Vue.component(Statistic.name, Statistic)
Vue.component(Button.name, Button)
Vue.component(Slider.name, Slider)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Select.OptGroup.name, Select.OptGroup)
Vue.component(Table.name, Table)

Vue.config.productionTip = false

Date.prototype.isLeapYear = function()
{
    var y = this.getFullYear();
    return y % 4 == 0 && y % 100 != 0 || y % 400 == 0;
};

Date.prototype.getDaysInMonth = function()
{
    return this.isLeapYear() ? this.getDaysInMonth.L[this.getMonth()] : this.getDaysInMonth.R[this.getMonth()];
};



Date.prototype.getDaysInMonth.R = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
Date.prototype.getDaysInMonth.L = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

new Vue({
  render: h => h(App),
}).$mount('#app')
