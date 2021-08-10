<template>
    <div>
        <v-data-table
        dense
        :headers="headers"
        :items="pokemonList"
        item-key="name"
        class="elevation-1"
        :search="search"
        @click:row="onClicked"
        >
            <template v-slot:top>
                <v-text-field
                v-model="search"
                label="検索"
                class="mx-4"
                ></v-text-field>
            </template>
            <template>
                <tr>
                <td></td>
                <td colspan="4"></td>
                </tr>
            </template>
        </v-data-table>
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
    name: 'partySelect',
    props: {
        index: Number
    },
    data() {
        return{
            search:'',
            selector:"",
            pokemonList:[],
            headers: [
                {
                text: '図鑑No',
                align: 'start',
                value: 'no',
                },
                { text: '名前', value: 'name' },
                { text: 'タイプ1', value: 'type1' },
                { text: 'タイプ2', value: 'type2' },
                { text: 'HP', value: 'h' },
                { text: 'こうげき', value: 'a' },
                { text: 'ぼうぎょ', value: 'b' },
                { text: 'とくこう', value: 'c' },
                { text: 'とくぼう', value: 'd' },
                { text: 'すばやさ', value: 's' },
                { text: '合計種族値', value: 'total' },
            ],
        }
    },
    methods:{
        setSelect(value){
            this.selector = value;
        },
        onClicked(row){
            this.$emit('selected', row);
            this.$router.push('/detail/' + this.index)
        }
    },
    mounted(){
        this.pokemonList = this.$store.getters.getPList;
    }
})
</script>