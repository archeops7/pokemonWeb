import { PokemonBase } from "/pokemon/pokemonBase.js";

export class Salamence extends PokemonBase{

    constructor(level, nature, efbases, moves){
        super(373, "ボーマンダ" , level, nature, ["Flying", "Dragon"], [95,135,80,110,80,100], efbases, moves, [31,31,31,31,31,31]);
    }
}