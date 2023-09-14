import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

const pokemonData = [
    {
        name: 'Pikachu',
        type: 'Elétrico',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    },
    {
        name: 'Charmander',
        type: 'Fogo',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    },
    {
        name: 'Psyduck',
        type: 'Psíquico',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png',
    },
]

const styles = StyleSheet.create({
    pokemonCard: {
        padding: 16,
        backgroundColor: '#fc8b3a',
        margin: 8,
        borderRadius: 20,
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    text: {
        color: '#ffffff',
        fontSize: 24,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
})

const PokemonItem = ({ pokemon }) => {
    const { name, type, imageUrl } = pokemon

    return (
        <View style={styles.pokemonCard}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View>
                <Text style={styles.text}>Pokemon: {name}</Text>
                <Text style={styles.text}>Tipo: {type}</Text>
            </View>
        </View>
    )
}

const ListPage = () => {
    return (
        <SafeAreaView style={{ marginTop: 20 }}>
            <FlatList
                data={pokemonData}
                renderItem={({ item }) => <PokemonItem pokemon={item} />}
                keyExtractor={(item) => item.name}
            />
        </SafeAreaView>
    );
}

export default ListPage;
