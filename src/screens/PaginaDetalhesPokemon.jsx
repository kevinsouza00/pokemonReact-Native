// NewAPIScreen.js

import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

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
    height: 350,
    marginRight: 16,
  },
  modalContainer: {
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    height: 550
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});

const PaginaDetalhesPokemon = ({ route }) => {

  const pokemon = route.params.pokemon

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]);

  const fetchNewAPIData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${pokemon.url}`);
      const data = await response.json();

      // const response = await fetch('' + pokemon.name);
      // const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchNewAPIData();
  }, []);

  return (
    <View>


      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={{ color: "black", fontSize: 60, fontWeight: "bold", color: "orange" }} >{pokemon.name}</Text>

          <View style={{ backgroundColor: "#cccc", padding: 5, borderRadius: 4, width: "60%" }} >
            {pokemon.types.length > 0 && (
              <Text style={{ color: "#444444", fontSize: 16 }} >type: {pokemon.types.join(', ')}</Text>
            )}
          </View>

          <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />

          <Text style={{ color: "green", fontWeight: "bold", fontSize: 18 }} >Heey developers, look this</Text>
          {loading && <Text style={{ color: "#5555de" }} >processing informations. please wait</Text>}
          {data && <View style={{ height: 150, backgroundColor: "#cccc", padding: 5, borderRadius: 4, width: "60%" }} >
            <Text >{JSON.stringify(data)}</Text>
          </View>}

        </View>
      </View>


    </View>
  );
};

export default PaginaDetalhesPokemon;
