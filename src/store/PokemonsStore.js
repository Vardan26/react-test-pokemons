import { types } from 'mobx-state-tree';
import { requestService } from '../hoc/RequestService';


const PokemonsStore = types
    .model('Pokemon', {
        pokemonData: types.frozen(),
        pokemonDataCopy: types.frozen(),
        perPage: 20,
        pokemonTypes: types.frozen()
    })

    .actions(self => ({
        async getPokemonData() {
            const url = `https://pokeapi.co/api/v2/`;
            const options = {
                method: 'GET'
            };

            const pokemon = await requestService.getRequest(url + "pokemon/", options);

            if (pokemon) {
                for (let key in pokemon.results) {
                    const data = await requestService.getRequest(`${url}pokemon/${pokemon.results[key].name}`, options);
                    self.setPokemonData(data);
                }
            }
        },

        async getPokemonDataTypes (){
            const url = `https://pokeapi.co/api/v2`;
            const options = {
                method: 'GET'
            };
            const pokemonTypes = await requestService.getRequest(url + "/type", options);

            self.setPokemonDataTypes(pokemonTypes.results);
        },

        setPokemonData(pokemon) {
            const types = pokemon.types.map(item => item.type.name);
            const abilities = pokemon.abilities.map(item => item.ability.name);
            const pokemonItem = {
                name: pokemon.name,
                avatar: pokemon.sprites.front_default,
                types,
                height: pokemon.height,
                weight: pokemon.weight,
                abilities
            };

            self.pokemonData = [...self.pokemonData, pokemonItem];
            self.makePokemonDataCopy(self.pokemonData);
        },

        setPokemonDataTypes(types) {
            self.pokemonTypes = types;
        },

        makePokemonDataCopy(pokemons) {
            self.pokemonDataCopy = pokemons;
        },

        getFilteredList(event) {
            let updatedList = self.pokemonData;
            const val = event.target.value;

            updatedList = updatedList.filter(item => {
                return item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1;
            });
            self.makePokemonDataCopy(updatedList);
        },

        handlePageClick( data ) {
            let selected = data.selected;
            let offset = Math.ceil(selected * self.perPage);
            console.log(selected, offset);
            },

    }));

const _pokemons_ = PokemonsStore.create({ pokemonData: [], pokemonDataCopy: [], pokemonTypes: [] });

export { _pokemons_ };

