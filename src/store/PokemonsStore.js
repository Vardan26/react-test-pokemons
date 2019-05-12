import { types } from 'mobx-state-tree';
import { requestService } from '../hoc/RequestService';
import { _app_ } from './AppStore';

const PokemonsStore = types
    .model('Pokemon', {
        pokemonApi: types.frozen(),
        pokemonData: types.frozen(),
        pokemonDataCopy: types.frozen(),
        limit: 20,
        pageCount: types.number,
        pokemonTypes: types.frozen(),
        filteredTypes: types.frozen()
    })

    .actions(self => ({
        async getPokemonData(limit, offset) {
            const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
            let url;
            if (limit && offset) {
                url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
            } else {
                url = `https://pokeapi.co/api/v2/pokemon/`;
            }
            const options = {
                method: 'GET'
            };
            const pokemon = await requestService.getRequest(url, options);
            self.getPageCount(pokemon.count);

            if (pokemon) {
                for (let key in pokemon.results) {
                    const data = await requestService.getRequest(`${baseUrl}${pokemon.results[key].name}`, options);
                    self.setPokemonDataApi(data);
                }
                _app_.setLoadingState();
            }
        },

        setPokemonData(pokemon) {
            if (pokemon) {
                const types = pokemon.types.map(item => item.type.name);
                let abilities = pokemon.abilities.map(item => item.ability.name);

                let pokemonItem = {
                    name: pokemon.name,
                    avatar: pokemon.sprites.front_default,
                    types,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    abilities
                };

                self.pokemonData = [...self.pokemonData, pokemonItem];
                self.pokemonDataCopy = self.pokemonData;
            }
        },

        async getPokemonDataTypes() {
            const url = `https://pokeapi.co/api/v2`;
            const options = {
                method: 'GET'
            };
            const pokemonTypes = await requestService.getRequest(url + '/type', options);

            self.setPokemonDataTypes(pokemonTypes.results);
        },

        setPokemonDataApi(data) {
            self.pokemonApi = data;
            self.setPokemonData(data);
        },

        getPageCount(count) {
            self.pageCount = (count / self.limit);
        },

        setPokemonDataTypes(types) {
            self.pokemonTypes = types;
        },

        makePokemonDataCopy(pokemons) {
            self.pokemonDataCopy = pokemons;
        },

        getFilteredList(event) {
            let newData = self.pokemonData;
            const val = event.target.value;

            newData = newData.filter(item => item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1);
            self.makePokemonDataCopy(newData);
        },

        getSelectedTypes(currentType) {
            let data = self.pokemonData,
                filteredData = [];

            //Getting all filtered types
            let newFilteredTypes = self.filteredTypes;
            self.filteredTypes = [...newFilteredTypes, currentType];
            if (newFilteredTypes.includes(currentType)) {
                self.filteredTypes = newFilteredTypes.filter(item => item.indexOf(currentType) === -1);
            }

            data.map(item => {
                self.filteredTypes.map(selectedType => {
                    if (item.types.includes(selectedType) && !filteredData.includes(item)) {
                        filteredData = [...filteredData, item];
                    }
                });
            });
            self.makePokemonDataCopy(filteredData);
            if (!filteredData.length) {
                self.makePokemonDataCopy(data);
            }
        },

        handlePageClick(data) {
            let selected = data.selected;
            let offset = Math.ceil(selected * self.limit);
            self.pokemonData = [];
            self.getPokemonData(self.limit, offset);
        }

    }));

const _pokemons_ = PokemonsStore.create({
    pokemonData: [],
    pokemonDataCopy: [],
    pokemonTypes: [],
    pageCount: 0,
    filteredTypes: []
});

export { _pokemons_ };

