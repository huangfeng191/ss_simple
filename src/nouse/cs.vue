<template>
    <div id="cs">
        <!-- position:absolute 脱离默认文档流，相对浏览器
                      relative：原地脱离


 -->
        <div id="a" class="out" style="background-color: green; position:relative; left:110px;top:100px;z-index:12" >
            <div id="aa" class="in" style="">
            </div>
        </div>
        <div id="b" class="out" style="position:absolute;z-index:11 ">
            <div id="bb" class="in" style="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {


        };
    },
    methods: {

    },
    watch: {

    },
    mounted() {}
};
</script>
<style lang="less">
#cs {
    .out {
        width: 1000px;
        height: 200px;
        background-color: blue;
        margin: 0 auto;
    }
    .in {
        width: 500px;
        height: 100px;
        background-color: red;
        margin: 0 auto;
    }
}
</style>