import Vue from 'vue'
import Vuex from 'vuex'
import cps from 'vuex-persistedstate'
import pokemonBase from '../pokemon/pokemonBase'
import atkMove from '../moves/atkbase'
import pokemonList from '../datajsons/pokemonList.json'
import moveList from '../datajsons/moveList.json'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {

    pokemonList:pokemonList,
    moveList:moveList,
    partyBase:[],
    ePartyBase:[],
    pParty:[],
    eParty:[],
    bco:[],
    msg: []
  },
  getters:{
    getPList(state){
      return state.pokemonList
    },
    getMList(state){
      return state.moveList
    },
    getPartyBase(state){
      return state.partyBase
    },
    getEPartyBase(state){
      return state.ePartyBase
    },
    getPParty(state){
      return state.pParty
    },
    getEParty(state){
      return state.eParty
    },
    getBco(state){
      return state.bco
    },
    getMsg(state){
      return state.msg
    }
  },
  mutations: {
    updatePartyBase(state, payload){
      state.partyBase = payload;
    },
    updateEPartyBase(state, payload){
      state.ePartyBase = payload;
    },
    setPFromJ(state){
      let party = [];
      for(let i = 0; i < state.partyBase.length; i++){
        let p = this.getters.getPartyBase[i]
        let pData = this.getters.getPList[p.no - 1]
        p.name = pData.name
        p.type = [pData.type1, pData.type2]
        p.bases = [pData.h, pData.a, pData.b, pData.c, pData.d, pData.s]
        let ms = []
        p.moves.forEach(m =>{
          let md = this.getters.getMList[Number(m) - 1]
          ms.push(new atkMove(md.no,md.name,md.type,Number(md.pp),Number(md.power),md.moveType,Number(md.accuracy),md.contact,Number(md.additional),Number(md.addProb),Number(md.priority),Number(md.critical)))
        })
        party.push(new pokemonBase(p.no, p.name, p.level, p.nature, p.type, p.bases, p.efbases, ms, p.IVs));
      }
        state.pParty = party.concat();
    },
    setEFromJ(state){
      let party = [];
      for(let i = 0; i < state.ePartyBase.length; i++){
        let p = this.getters.getEPartyBase[i]
        let pData = this.getters.getPList[p.no - 1]
        p.name = pData.name
        p.type = [pData.type1, pData.type2]
        p.bases = [pData.h, pData.a, pData.b, pData.c, pData.d, pData.s]
        let ms = []
        p.moves.forEach(m =>{
          let md = this.getters.getMList[Number(m) - 1]
          console.log(md);
          ms.push(new atkMove(md.no,md.name,md.type,Number(md.pp),Number(md.power),md.moveType,Number(md.accuracy),md.contact,Number(md.additional),Number(md.addProb),Number(md.priority),Number(md.critical)))
        })
        party.push(new pokemonBase(p.no, p.name, p.level, p.nature, p.type, p.bases, p.efbases, ms, p.IVs));
      }
        state.eParty = party.concat();
    },
    updatePP(state,payload){
      state.pParty = payload;
    },
    updateEP(state,payload){
      state.eParty = payload;
    },
    updateBCO(state,payload){
      state.bco = payload;
    },
    addMsg(state, payload){
      state.msg.concat(payload);
    }
  },
  actions: {
    updatePartyBase({commit}, payload){
      commit('updatePartyBase', payload);
    },
    updateEPartyBase({commit}, payload){
      commit('updateEPartyBase', payload);
    },
    setPFromJ({commit}, payload){
      commit('setPFromJ', payload);
    },
    setEFromJ({commit}, payload){
      commit('setEFromJ', payload);
    },
    updatePP({commit}, payload){
      commit('updatePP', payload);
    },
    updateEP({commit}, payload){
      commit('updateEP', payload);
    },
    updateBCO({commit}, payload){
      commit('updateBCO', payload);
    },
    addMsg({commit}, payload){
      commit('addMsg', payload);
    }
  },
  modules: {
  },
  plugins:[
    cps({
      key: 'pokemonjs',
      storage: localStorage
    })
  ]
})
