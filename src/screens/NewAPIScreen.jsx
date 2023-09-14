// NewAPIScreen.js

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

const NewAPIScreen = () => {
  const [newAPIData, setNewAPIData] = useState([]);

  const fetchNewAPIData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
      const data = await response.json();
      setNewAPIData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewAPIData();
  }, []);

  return (
    <View>
      <FlatList
        data={newAPIData}
        renderItem={({ item }) => (
          <View>
            <Text>{item.field1}</Text>
            <Text>{item.field2}</Text>
            {/* Renderize os campos da nova API aqui */}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default NewAPIScreen;
