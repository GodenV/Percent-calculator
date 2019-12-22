<template>
    <div id="app">
        <Calculator
                v-bind:creditInfo='creditInfo'
                v-bind:res='countingEqualParts'
                v-bind:diffCreditInfo="difCredit"
                v-bind:columns="columns"
                v-on:onClick="onClick"
        />
    </div>
</template>

<script>
    import Calculator from "@/components/Calculator";

    const columns = [
        {
            title: 'Дата',
            dataIndex: 'months',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Остаток',
            dataIndex: 'balance',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Долг',
            dataIndex: 'debt',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Проценты',
            dataIndex: 'percent',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Платеж',
            dataIndex: 'payment',
            sorter: true,
            width: '20%',
        },
    ];

    export default {
        name: 'app',
        data() {
            return {
                buf: 0,
                difCredit: [{}],
                columns,
                creditInfo: {
                    creditDuration: 12,
                    creditSum: 100,
                    maxCreditTerm: 50,
                    minCreditTerm: 12,
                    minCreditSum: 100.0,
                    maxCreditSum: 500000.0,
                    percent: 0.1,
                    accountMethod: "equ",
                }
            }
        },

        watch: {
            creditInfo: function () {

            }
        },
        methods: {
            onClick() {
                // eslint-disable-next-line no-unused-vars
                let allSum = 0;
                let everyMonthSum = this.creditInfo.creditSum / this.creditInfo.creditDuration;
                let date = new Date();
                let allMoneyBuf = this.creditInfo.creditSum;
                let percentMoney;
                this.difCredit = [];
                for (let i = 0; i < this.creditInfo.creditDuration; i++) {
                    percentMoney = (allMoneyBuf * this.creditInfo.percent) / ((date.isLeapYear() ? 366 : 365) * date.getDaysInMonth());
                    this.difCredit.push({
                        payment: Math.round(everyMonthSum + percentMoney * 100) / 100,
                        months: date.toLocaleString('ru', {month: 'long'}) + " " + date.getFullYear(),
                        percent: Math.round(percentMoney * 100) / 100,
                        debt: Math.round(everyMonthSum * 100) / 100,
                        balance: Math.round(allMoneyBuf * 100) / 100
                    })
                    allMoneyBuf -= everyMonthSum;
                    allSum += percentMoney;
                    date.setMonth(date.getMonth() + 1)
                }
            },
        },
        components: {
            Calculator,
        },
        computed: {
            countingEqualParts: function () {
                let percentMouth = this.creditInfo.percent / 1200;
                return Math.round(((percentMouth * (1 + percentMouth) ** this.creditInfo.creditDuration) / ((1 + percentMouth) ** this.creditInfo.creditDuration - 1) * this.creditInfo.creditSum) * 100) / 100
            }
        }
    }
</script>

<style lang="scss">
    @import './style.scss';

    #app {
        @include flexColumn();
        width: 100%;
        min-height: 100%;
        background: linear-gradient(to top right, rgba(128, 0, 128, 0.4) 10%, rgba(220, 20, 60, 0.4) 30%, rgba(255, 69, 0, 0.4) 50%, rgba(255, 215, 0, 0.4) 100%);;
    }


</style>
