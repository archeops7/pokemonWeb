<template>
    <v-container>
        <v-card>
            <v-card-title class="text-center justify-center py-3">
            <h2 class="font-weight-bold text-h4 basil--text">
                Party Editor
            </h2>
            </v-card-title>

            <v-tabs
            v-model="tab"
            background-color="transparent"
            color="#2f4f4f"
            grow
            >
            <v-tab
                v-for="item in items"
                :key="item"
            >
                {{ item }}
            </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in items"
                :key="item"
                class="ma-auto"
            >
                <v-card
                flat

                >
                <partyShow :party=party></partyShow>
                </v-card>
            </v-tab-item>
            </v-tabs-items>
        </v-card>
        <br>
        <v-card>
            <router-view class="ma-1" @selected="setSelectedP" :selectedP="this.selectedP"/>
        </v-card>
    <!--
        子要素
        １．自分または相手の選択 現在のパーティベースを表示
        ２．ポケモンの選択 名前のリスト表示
        ３．ポケモン詳細（努力値やわざなど）→２に戻る


    -->
    </v-container>
</template>

<script>
import partyShow from './PartyShow.vue'

export default ({
    name: 'partyEdit',
    data() {
        return{
            tab:null,
            items:['MyParty', 'EnemyParty'],
            text:'sample',
            selector:"",
            selectedP:{},
            partyBase:[],
            party:[],
            pokemonList:[],
            moveList:[]
        }
    },
    components:{
        partyShow:partyShow
    },
    methods:{
        setSelect(value){
            this.selector = value;
        },
        setSelectedP(value){
            this.selectedP = value;
        }
    },
    mounted(){
        this.pokemonList = this.$store.getters.getPList;
        this.moveList = this.$store.getters.getMList;
        this.party = this.$store.getters.getPParty;
    },
    watch:{
        tab(newTab){
            if(newTab == 0){
                this.party = this.$store.getters.getPParty;
            }else{
                this.party = this.$store.getters.getEParty;
            }
        }
    }
})
</script>

<style>
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
.center{
    text-align: center;
}
</style>
