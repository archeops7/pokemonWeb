import { PokemonBase } from "/pokemon/pokemonBase.js";

export class Archeops extends PokemonBase{

    constructor(level, nature, efbases, moves){
        super(567, "アーケオス" , level, nature, ["Flying", "Rock"], [75,140,65,112,65,110], efbases, moves, [31,31,31,31,31,31]);
    }
}