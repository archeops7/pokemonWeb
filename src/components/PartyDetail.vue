<template>
<v-card elevation="0">
    <v-window v-model="step">
        <v-window-item :value="1">
            <v-container class="ma-auto">
                <v-card>
                    <v-data-table
                    dense
                    :headers="headers"
                    :items="selected"
                    item-key="name"
                    class="elevation-1"
                    hide-default-footer
                    >
                    <template>
                        <tr>
                        <td></td>
                        <td colspan="4"></td>
                        </tr>
                    </template>
                </v-data-table>
                </v-card>
                <v-container>
                    <v-row no-gutters>
                            <v-col class="ma-2">
                                <v-card class="pa-2">
                                    <v-card-title>努力値</v-card-title>
                                    <hr>
                                        <v-slider
                                            v-for='(item, index) in items'
                                            :key='item'
                                            class="align-center"
                                            :max="max"
                                            :min="min"
                                            hide-details
                                            step="4"
                                            :thumb-size="24"
                                            thumb-label="always"
                                            :label='item'
                                            v-model='datas[index]'
                                        >
                                            <template v-slot:append>
                                            <v-text-field
                                                v-model="datas[index]"
                                                class="mt-0 pt-0"
                                                hide-details
                                                single-line
                                                type="number"
                                            ></v-text-field>
                                            </template>
                                        </v-slider>
                                        <v-sheet :class="setColor()" class="restnum mt-2">残り: {{restNum}} / 510</v-sheet>
                                </v-card>
                            </v-col>
                            <v-col class="ma-2">
                                <v-card class="pa-2">
                                    <v-card-title>個体値</v-card-title>
                                    <hr>
                                    <v-slider
                                            v-for='(item, index) in items'
                                            :key='item'
                                            class="align-center"
                                            :max="maxIV"
                                            :min="min"
                                            hide-details
                                            :thumb-size="24"
                                            thumb-label="always"
                                            :label='item'
                                            v-model='dataIVs[index]'
                                        >
                                            <template v-slot:append>
                                            <v-text-field
                                                v-model="dataIVs[index]"
                                                class="mt-0 pt-0"
                                                hide-details
                                                single-line
                                                type="number"
                                            ></v-text-field>
                                            </template>
                                        </v-slider>
                                </v-card>
                                <v-slider
                                label="Lv"
                                v-model="level"
                                hide-details
                                :thumb-size="24"
                                thumb-label="always"
                                :max="100"
                                :min="0"
                                >
                                <template v-slot:append>
                                <v-text-field
                                    v-model="level"
                                    class="mt-0 pt-0"
                                    hide-details
                                    single-line
                                    type="number"
                                ></v-text-field>
                                </template>
                                </v-slider>
                                <v-select
                                :items="natures"
                                v-model="nature"
                                label="nature(せいかく)"
                                ></v-select>
                            </v-col>
                    </v-row>
                </v-container>
                <!--
                    子要素
                    １．自分または相手の選択 現在のパーティベースを表示
                    ２．ポケモンの選択 名前のリスト表示
                    ３．ポケモン詳細（努力値やわざなど）→２に戻る
            -->
            </v-container>
        </v-window-item>
        <v-window-item :value="2">
            <v-chip-group>
            <v-chip
                v-for="(name,index) in moveNames"
                :key="name"
                color="blue"
                outlined
                close
                @click:close="onClose(index)"
            >
                {{ name }}
            </v-chip>
            </v-chip-group>
            <v-data-table
            dense
            :headers="moveHeaders"
            :items="moveList"
            item-key="name"
            class="elevation-1"
            :search="search"
            v-model="selectMove"
            show-select
            show-expand
            :expanded.sync="expanded"
            >
                <template v-slot:top>
                    <v-text-field
                    v-model="search"
                    label="検索"
                    class="mx-4"
                    ></v-text-field>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                     {{ item.effectText }}
                </td>
                </template>
            </v-data-table>
        </v-window-item>
        <v-window-item :value="3">
            <v-container>
                <v-row>
                    <v-sheet>
                        {{selected.name}}
                    </v-sheet>
                </v-row>
                <v-row>
                    <v-col class="ma-auto" cols="3">
                        <v-list>
                            <v-list-item>

                            </v-list-item>
                            <v-list-item>
                                HP
                            </v-list-item>
                            <v-list-item>
                                こうげき
                            </v-list-item>
                            <v-list-item>
                                ぼうぎょ
                            </v-list-item>
                            <v-list-item>
                                とくこう
                            </v-list-item>
                            <v-list-item>
                                とくぼう
                            </v-list-item>
                            <v-list-item>
                                すばやさ
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col class="ma-auto" cols="3">
                        <v-list>
                            <v-list-item>
                                努力値
                            </v-list-item>
                            <v-list-item
                            v-for="(data,i) in datas"
                            :key="i"
                            ><v-list-item-title v-text="data"></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col class="ma-auto" cols="3">
                        <v-list>
                            <v-list-item>
                                個体値
                            </v-list-item>
                            <v-list-item
                            v-for="(data,i) in dataIVs"
                            :key="i"
                            ><v-list-item-title v-text="data"></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col class="ma-auto">
                        <v-chip-group>
                        <v-chip
                            v-for="name in moveNames"
                            :key="name"
                            color="blue"
                            outlined
                            column
                        >
                            {{ name }}
                        </v-chip>
                        </v-chip-group>
                    </v-col>
                    <v-btn
                        :disabled="isOK || isMoveOK || isPOK"
                        color="accent"
                        elevation="2"
                        outlined
                        class="ma-auto"
                        @click="onSubmit"
                        >確定</v-btn>
                </v-row>
            </v-container>
        </v-window-item>
    </v-window>
    <v-card-actions class="mb-5">
      <v-btn
        :disabled="step === 1"
        text
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
            <v-btn
                :disabled="step === 3 || isOK || isMoveOK || isPOK"
                color="primary"
                depressed
                @click="step++"
            >
                {{steps[step - 1]}}
            </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import pokemonBase from '../pokemon/pokemonBase'
import atkMove from '../moves/attackMove'

export default ({
    name: 'partyDetail',
    props:[
        'selectedP'
    ],
    data() {
        return{
            selector:"",
            selected:[],
            selectMove:[],
            moveNames:[],
            expanded: [],
            level:50,
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
            moveHeaders:[
                {
                text: 'No',
                align: 'start',
                value: 'no',
                },
                { text: '名前', value: 'name' },
                { text: 'タイプ', value: 'type' },
                { text: '種類', value: 'moveType' },
                { text: 'いりょく', value: 'power' },
                { text: 'めいちゅう', value: 'accuracy' },
                { text: 'pp', value: 'pp' },
                { text: '接触', value: 'contact' },
                { text: '詳細', value: 'data-table-expand' },
            ],
            items:[' H 　 　 P ', 'こうげき','ぼうぎょ','とくこう','とくぼう','すばやさ'],
            datas:[0,0,0,0,0,0],
            dataIVs:[31,31,31,31,31,31],
            natures:['adamant(a↑c↓)','bashful','bold(b↑a↓)','brave(a↑s↓)','calm(d↑a↓)','careful(d↑c↓)','docile','gentle(d↑b↓)','hardy','hasty(s↑b↓)','impish(b↑c↓)','jolly(s↑c↓)','lax(b↑d↓)','lonely(a↑b↓)','mild(c↑b↓)','modest(c↑a↓)','naive(s↑d↓)','naughty(a↑d↓)','quiet(c↑s↓)','quirky','rash(c↑d↓)','relaxed(b↑s↓)','sassy(d↑s↓)','serious','timid(s↑a↓)'],
            min: 0,
            max: 252,
            maxIV: 31,
            slider: [],
            slider2: 0,
            isOK: false,
            isPOK: false,
            isMoveOK: false,
            step:1,
            steps:['わざを選ぶ', '確認画面', ''],
            moveList:[],
            nature:'hardly',
            search:''
        }
    },
    methods:{
        setSelect(value){
            this.selector = value;
        },
        setColor(){
            if(this.restNum >= 0){
                return "blackNum"
            }
            return "redNum"
        },
        onClose(index){
            this.selectMove.splice(index,1)
        },
        onSubmit(){
            let moves = []
            let moveNos = []
            let beNature = this.nature.split('(')[0]
            this.selectMove.forEach(move =>{
                moves.push(new atkMove(
                    move.no,
                    move.name,
                    move.type,
                    Number(move.pp),
                    Number(move.power),
                    move.moveType,
                    Number(move.accuracy),
                    move.contact,
                ))
                moveNos.push(move.no)
            })

            for(let i = 0; i < 5- moves.length; i++){
                console.log("setdummy");
                moves.push(new atkMove())
            }

            let pcomp = new pokemonBase(
                this.selectedP.no,
                this.selectedP.name,
                this.level,
                beNature,
                [this.selectedP.type1, this.selectedP.type2],
                [this.selectedP.h,this.selectedP.a,this.selectedP.b,this.selectedP.c,this.selectedP.d,this.selectedP.s],
                this.datas,
                moves,
                this.dataIVs
                )

            let pb = {
                no:this.selectedP.no,
                level:this.level,
                nature:beNature,
                efbases:this.datas,
                moves:moveNos,
                IVs:this.dataIVs
                }
            this.$emit('addP', {pcomp:pcomp, pb:pb, index:this.$route.params.index});
        }
    },
    computed:{
        restNum(){
            return 510 - this.datas.reduce((sum, element) => sum + element, 0)
        },
        btnable(){
            if(this.restNum >= 0){
                return true
            }
            return false
        }
    },
    watch:{
        restNum(){
            this.isOK = !(this.restNum > 0)
        },
        selectMove(){
            this.moveNames = []
            for(let i = 0; i < this.selectMove.length; i++){
                this.moveNames.push(this.selectMove[i].name)
            }
            this.isMoveOK = !(this.selectMove.length < 5)
        },
        selected(){
            console.log(Object.keys(this.selected[0]).length)
            this.isPOK = !(Object.keys(this.selected[0]).length)
        },
    },
    mounted(){
        this.selected.push(this.selectedP);
        this.moveList = this.$store.getters.getMList.filter(m =>{
            return m.moveType === "Physics" || m.moveType === "Special"
        });
    }
})
</script>

<style lang="scss" scoped>
/* Helper classes */
.restnum{
    font-size: small;
}
.redNum{
    color: #ff4500;
}
.blackNum{
    color: darkslategrey;
}
.fRight{
    display: flex;
    justify-content: flex-end;
}
</style>