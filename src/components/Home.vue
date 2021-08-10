<template>
    <v-container>
        <h2>pokemonJS</h2>
        <br>
        <v-card
            max-width="650"
            class="mx-auto pa-3 cards"
        >
        <v-file-input
            accept=".json"
            label="使用するパーティのデータを選択"
            show-size
            outlined
            @change="onFile"
        ></v-file-input>
        </v-card>
        <br>
        <v-btn
            color="accent"
            elevation="4"
            large
            x-large
            outlined
            text
            tile
            @click="output"
        >JSONに出力してDL</v-btn>
        <br>
        <br>
        <hr>
        <v-card
            max-width="650"
            color="#d3d3d3"
            class="mx-auto pa-3 mt-5 cards"
            elevation="3"
        >
        <v-file-input
            accept=".json"
            label="相手パーティのデータを選択"
            show-size
            outlined
            dence
            @change="onFileE"
        ></v-file-input>
        </v-card>
        <br>
        <v-btn
            color="#a9a9a9"
            dark
            elevation="4"
            large
            x-large
            outlined
            text
            tile
            @click="outputE"
        >JSONに出力してDL</v-btn>
    </v-container>
</template>

<script>

export default ({
    name: 'home',
    data() {
        return{
            PParty:[],
            EParty:[]
        }
    },
    methods:{
        onFile(e){
            if(e){
                let reader = new FileReader();
                reader.onload = (e) =>{
                    let json = JSON.parse(e.target.result);
                    this.$store.dispatch('updatePartyBase', json);
                    this.$store.dispatch('setPFromJ');
                }
                reader.readAsText(e)
            }
        },
        onFileE(e){
            if(e){
                let reader = new FileReader();
                reader.onload = (e) =>{
                    let json = JSON.parse(e.target.result);
                    this.$store.dispatch('updateEPartyBase', json);
                    this.$store.dispatch('setEFromJ');
                }
                reader.readAsText(e)
            }
        },
        output(){
            const fileName = "partyOutput.json";
            const data = JSON.stringify(this.$store.getters.getPartyBase);
            const link = document.createElement("a")
            link.href = "data:text/plain," + encodeURIComponent(data);
            link.download = fileName;
            link.click()
        },
        outputE(){
            const fileName = "enemyOutput.json";
            const data = JSON.stringify(this.$store.getters.getEPartyBase);
            const link = document.createElement("a")
            link.href = "data:text/plain," + encodeURIComponent(data);
            link.download = fileName;
            link.click()
        }
    }
})
</script>
