<template>
    <a-table class = "table"
            :columns="this.columns"
            :dataSource="this.data">
    </a-table>
</template>

<script>

    export default {
        props: ['data', 'columns'],
        name: "TableMonths"
    }
</script>

<style scoped>
    .table{
        margin-top: 3vh;
        width: 70vw;
    }
</style>