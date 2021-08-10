<template>
    <div>
        <v-breadcrumbs
        :items="items"
        large
        ></v-breadcrumbs>

    </div>
    <!--
        子要素
        １．自分または相手の選択 現在のパーティベースを表示
        ２．ポケモンの選択 名前のリスト表示
        ３．ポケモン詳細（努力値やわざなど）→２に戻る
    -->
</template>

<script>
export default ({
    name: 'partyShow',
    props:{
        party: Array
    },
    data() {
        return{
            items:[]
        }
    },
    methods:{
        setItems(){
            this.items = []
            for(let i = 0; i < this.party.length; i++){
                    let item = {text:this.party[i]._name, disabled: false, to:'/detail/' + i}
                    this.items.push(item)
                }
                if(this.party.length < 6){
                    let item = {text:'ポケモンを選ぶ', disabled: false, to:'/select/' + this.party.length}
                    this.items.push(item)
                }
        }
    },
    mounted(){
        this.setItems();
    },
    watch:{
        party(){
            this.setItems();
        }
    }
})
</script>