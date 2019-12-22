<template>
    <div class="main">

        <h1>Кредитный калькулятор</h1>
        <label>Сумма кредита(BYN)</label>
        <div class="sliderBlock">
            <a-slider :min="creditInfo.minCreditSum" :max="creditInfo.maxCreditSum" v-model="creditInfo.creditSum"/>
            <a-input-number :min="creditInfo.minCreditSum" :max="creditInfo.maxCreditSum"
                            v-model="creditInfo.creditSum"/>
        </div>
        <label>Срок кредита(BYN)</label>
        <div class="sliderBlock">
            <a-slider :min="creditInfo.minCreditTerm" :max="creditInfo.maxCreditTerm"
                      v-model="creditInfo.creditDuration" :step="1"/>
            <a-input-number :min="creditInfo.minCreditTerm" :max="creditInfo.maxCreditTerm" :step="1"
                            v-model="creditInfo.creditDuration"/>
        </div>

        <div>
            <label>Способ погашения: </label>
            <a-select defaultValue="equ" v-model='creditInfo.accountMethod'
                      class="selectBox">
                <a-select-option value="equ">Равными частями</a-select-option>
                <a-select-option value="dif">Дифференцированные платежи</a-select-option>
            </a-select>
        </div>
        <div>
            <label>Процент по кредиту: </label>
            <a-input-number :min="0" :max="100" :step="0.1" v-model="creditInfo.percent"/>
        </div>
        <div v-if="this.creditInfo.accountMethod === 'equ'">
            <a-statistic title="Ежемесячная сумма выплат (BYN)" :precision="2" :value="res" style="margin-right: 50px"/>
            <a-statistic title="Общая сумма выплаты (BYN)" :precision="2" :value="res * creditInfo.creditDuration"/>
        </div>
        <div v-else class=tableContainer>
            <a-button @click = "$emit('onClick')">Рассчитать</a-button>
             <a-statistic title="Общая сумма выплаты (BYN)" :precision="2" :value="creditInfo.creditDifAllSum"/>
            <TableMonths v-bind:columns="this.columns"
                         v-bind:data='this.diffCreditInfo'/>
        </div>


    </div>
</template>

<script>
    import TableMonths from "@/components/TableMonths";

    export default {
        components: {TableMonths},
        props: ['creditInfo', 'res', 'diffCreditInfo', 'columns'],
    };
</script>

<style scoped lang="scss">
    @import "../style.scss";
    @import url('https://fonts.googleapis.com/css?family=Prata&display=swap');

    h1 {
        font-size: 2.3rem;
    }


    label {
        font-family: 'Prata', serif;
        font-size: 1.3rem;
    }

    .selectBox {

    }

    .main {
        .tableContainer {
            @include flexColumn();
        }

        font-family: 'Prata', serif;
        @include flexColumn();
        width: 90%;

        > div {
            margin-top: 20px;
        }

        .selectBox {
            width: 200px;
        }

        .sliderBlock {
            @include flexRow();
            width: 100%;

            > .ant-slider {
                width: 70%;
            }
        }
    }


</style>