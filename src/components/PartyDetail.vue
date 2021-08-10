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
        </v-window-item>
        <v-window-item :value="3">
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
        :disabled="step === 3 || isOK"
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


export default ({
    name: 'partyDetail',
    props:[
        'selectedP'
    ],
    data() {
        return{
            selector:"",
            selected:[],
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
            items:[' H 　 　 P ', 'こうげき','ぼうぎょ','とくこう','とくぼう','すばやさ'],
            datas:[0,0,0,0,0,0],
            dataIVs:[31,31,31,31,31,31],
            min: 0,
            max: 252,
            maxIV: 31,
            slider: [],
            slider2: 0,
            isOK: false,
            step:1,
            steps:['わざを選ぶ', '確認画面', '']
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
        }
    },
    mounted(){
        this.selected.push(this.selectedP);
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