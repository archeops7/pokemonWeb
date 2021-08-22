<template>
    <div>
        <!--
        <v-breadcrumbs
        :items="items"
        large
        ></v-breadcrumbs>-->
        <v-row>
        <v-col
        v-for="(p, i) in party"
        :key="i"
        class="ma-2"
        >
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    v-bind="attrs"
                    v-on="on"
                    :to='link(i)'
                    @click="selected(i)"
                    >
                        {{p._name}}
                    </v-btn>
                </template>
                <div>
                <v-row>
                    <v-col
                    v-for="(m, n) in party[i]._moves"
                    :key="n"
                    class="ma-1"
                    cols="4"
                    >
                    {{m._name}}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <br>
                        HP<br>
                        こうげき<br>
                        ぼうぎょ<br>
                        とくこう<br>
                        とくぼう<br>
                        すばやさ<br>
                    </v-col>
                    <v-col cols="3" align="right">
                        個体値
                        <div
                        v-for="(iv, v) in partyBase[i].IVs"
                        :key="v"
                        >
                        {{iv}}
                        </div>
                    </v-col>
                    <v-col cols="3" align="right">
                        努力値
                        <div
                        v-for="(ef, e) in partyBase[i].efbases"
                        :key="e"
                        >
                        {{ef}}
                        </div>
                    </v-col>
                    <v-col cols="3" align="right">
                        実数値<br>
                        {{p._hp}}<br>
                        {{p._a}}<br>
                        {{p._b}}<br>
                        {{p._c}}<br>
                        {{p._d}}<br>
                        {{p._s}}<br>
                    </v-col>
                </v-row>
                </div>
            </v-tooltip>
        </v-col>
        <v-col cols="1" justify="end">
            <v-btn x-small dark color="orange darken-1" :disabled="disPlus" :to="addLink">
                <v-icon dark x-small>
                    mdi-plus
                </v-icon>
            </v-btn>
            <v-btn x-small dark color="blue lighten-4" :disabled="disDelete" @click="deleteP">
                <v-icon dark x-small>
                    mdi-cancel
                </v-icon>
            </v-btn>
        </v-col>
        </v-row>
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
        party: Array,
        partyBase: Array,
    },
    data() {
        return{
            items:[],
            disPlus:null,
            disDelete:null,
            selector:null,
            addLink:'',
        }
    },
    methods:{
        setItems(){
            this.items = []
            for(let i = 0; i < this.party.length; i++){
                    let item = {text:this.party[i]._name, disabled: false, to:'/select/' + i}
                    this.items.push(item)
                }
                if(this.party.length < 6){
                    let item = {text:'ポケモンを選ぶ', disabled: false, to:'/select/' + this.party.length}
                    this.items.push(item)
                }
        },
        link(i){
            return '/select/' + i
        },
        selected(i){
            this.selector = i;
        },
        deleteP(){
            this.$emit('deleteP', {index:this.selector});
        }
    },
    mounted(){
        this.setItems();
        if(this.party.length < 6){
            this.disPlus = false;
            this.addLink = '/select/' + this.party.length
        }else{
            this.disPlus = true;
        }
        this.disDelete = true;
    },
    watch:{
        party(){
            this.setItems();
            if(this.party.length < 6){
                this.disPlus = false;
                this.addLink = '/select/' + this.party.length
            }else{
                this.disPlus = true;
            }
        },
        selector(){
            if(this.selector){
                this.disDelete = false;
                console.log(this.selector)
            }
        }
    }
})
</script>