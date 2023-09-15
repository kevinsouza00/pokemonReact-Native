import React from 'react';
import Form from './src/screens/Form';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonList from './src/screens/PokemonList';
import NewAPIScreen from './src/screens/PaginaDetalhesPokemon';
import { Text } from 'react-native';
import PaginaDetalhesPokemon from './src/screens/PaginaDetalhesPokemon';
import Desenhador from './src/screens/desenhador';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Pokemons" component={PokemonList} />
        <Stack.Screen name="DetalhePokemon" component={PaginaDetalhesPokemon} />
        <Stack.Screen name="Mostre seu talento no desenho" component={Desenhador} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
