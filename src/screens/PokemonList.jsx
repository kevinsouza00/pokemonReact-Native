import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button } from 'react-native';

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: 16,
    margin: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});

const PokemonItem = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(pokemon)}>
      <View style={styles.card}>
        <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
        <View>
          <Text>Nome: {pokemon.name}</Text>
          {pokemon.types.length > 0 && (
            <Text>Tipo: {pokemon.types.join(', ')}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PokemonList = ({ navigation }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [totalPokemons, setTotalPokemons] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchPokemonData = async () => {
    try {
      setTotalPokemons(0)
      setLoading(true);
      setPokemonData([])
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
      const data = await response.json();
      setTotalPokemons(data.count);
      setLoading(false)

      const pokemonsWithImages = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          const detailsData = await detailsResponse.json();
          const imageUrl = detailsData.sprites.front_default;
          const types = detailsData.types.map((type) => type.type.name);
          return { ...pokemon, imageUrl, types };
        })
      );

      setPokemonData(pokemonsWithImages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  useEffect(() => {
    fetchPokemonData();
  }, [page]);

  const handlePokemonPress = (pokemon) => {
    // setSelectedPokemon(pokemon);
    navigation.navigate("DetalhePokemon", {
      pokemon
    });
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <View>

      <TouchableOpacity onPress={() => navigation.navigate("Mostre seu talento no desenho")} style={{ height: 50, minWidth: 50, borderRadius: 10, marginRight: 20, padding: 10, borderTopColor: "green", borderLeftColor: "yellow", borderBottomColor: "red", borderRightColor: "blue", borderWidth: 5, margin: 40 }} >
        <Text style={{ color: "#444444", fontWeight: "bold", fontSize: 20 }} >Quadro de desenhos</Text>
      </TouchableOpacity>

      <FlatList
        horizontal
        style={{ padding: 10, height: 110 }}
        data={Array(Math.round(totalPokemons / 10))}
        renderItem={({ item: rowData, index },) => {
          return (
            <TouchableOpacity style={{ height: 50, minWidth: 50, borderRadius: 10, marginRight: 20, padding: 10, backgroundColor: (index + 1) == page ? "silver" : "white", borderWidth: 2, borderColor: (index + 1) == page ? "#444444" : "gray" }} onPress={() => setPage(index + 1)} >
              <Text style={{ color: "#444444", fontWeight: "bold", fontSize: 20 }} >{index + 1}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {loading && <Text>Carregando...</Text>}

      <FlatList
        data={pokemonData}
        renderItem={({ item }) => <PokemonItem pokemon={item} onPress={handlePokemonPress} />}
        keyExtractor={(item) => item.name}
      />

      {/* {selectedPokemon && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedPokemon !== null}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Detalhes do Pokémon:</Text>
              <Text>Nome: {selectedPokemon.name}</Text>
              {selectedPokemon.types.length > 0 && (
                <Text>Tipo: {selectedPokemon.types.join(', ')}</Text>
              )}
              <Image source={{ uri: selectedPokemon.imageUrl }} style={styles.image} />
              <Button title="Fechar" onPress={handleCloseModal} style={styles.closeButton} />
            </View>
          </View>
        </Modal>
      )} */}




    </View>
  );
};

export default PokemonList;
