import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { use, useEffect, useState } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SearchApi } from '../../utils/spotifyApi';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Text from '../components/ui/Text';

const SearchBar = ({ navigation }) => {
    const [search, onChangeSearch] = useState('');
    const [result, setResult] = useState([]);
    const [loading , setLoading] =useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search.length > 2) {
                handleSearch(search);
            }
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [search]);

    const handleSearch = async (query) => {
        try {
            const data = await SearchApi(query, 'track,artist,album');
            setResult([
                ...(data.tracks?.items || []),
                ...(data.artists?.items || []),
                ...(data.albums?.items || []),
            ]);
            setLoading(ture);
        } catch (err) {
            console.log('search failed', err.message);
        }
        finally{
            setLoading(false);
        }
    };
    if (loading) {
        return <LoadingOverlay message='searching....' />
    }
    const handleItemPress = (item) => {
        switch (item.type) {
            case 'artist':
                navigation.navigate('albumlist', { artist: item });
                break;
            case 'album':
                navigation.navigate('Playlist', { type: 'album',
                albumId: item.id,
                albumName: item.name });
                break;
            case 'track':
                navigation.navigate('playView', { track: item });
                break;
            default:
                console.warn('Unknown item type:', item.type);
        }
    };

    const getImage = (item) => {
        if (item.images?.length) return item.images[0].url;
        if (item.album?.images?.length) return item.album.images[0].url;
        return null;
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}>

            <View style={styles.resultItem}>
                {getImage(item) && (
                    <Image source={{ uri: getImage(item) }} style={styles.image} />
                )}
                <View style={styles.textContainer}>
                    <Text alignment='left' weight='bold'>{item.name}</Text>
                    <Text color='#494848' alignment='left'>{item.name} — {item.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <Ionicons style={styles.icon} name="search" color="#ffffff" size={20} />
                    <TextInput
                        style={styles.input}
                        maxLength={100}
                        placeholder="Search....."
                        placeholderTextColor="#faf9f9"
                        value={search}
                        keyboardType='default'
                        onChangeText={onChangeSearch}
                    />
                </View>
            </View>
            <FlatList
                data={result}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 70,
        backgroundColor: '#121212',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    backButton: {
        marginRight: 12,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#282828',
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 45,
    },
    icon: {
        marginRight: 6,
    },
    resultItem: {
        padding: 12,
        borderBottomWidth: 0.5,
        borderColor: '#333',
        marginHorizontal: 16,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginHorizontal: 16,
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    textContainer: {
        flexDirection: 'column',
    },
 
});
