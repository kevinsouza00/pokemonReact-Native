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

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
      const data = await response.json();

      
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

  const handlePokemonPress = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <View>
      <FlatList
        data={pokemonData}
        renderItem={({ item }) => <PokemonItem pokemon={item} onPress={handlePokemonPress} />}
        keyExtractor={(item) => item.name}
      />
      {selectedPokemon && (
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
      )}
    </View>
  );
};

export default PokemonList;
