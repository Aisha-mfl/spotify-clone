import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../../utils/spotifyApi';
import LoadingOverlay from '../ui/LoadingOverlay';
import Text from '../ui/Text';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/responsive';
import { getRandomColor } from '../../../utils/helpers';

const CardGrid = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    if (loading) {
        return <LoadingOverlay message='Loading categories...' />;
    }

    const Card = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: getRandomColor() }]}
        // onPress={() => navigation.navigate('CategoryPlaylists', { categoryId: item.id })}
        >
            <Text weight='bold' size={13} marginV={15} marginH={15}>{item.name}</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.icons[0]?.url }}
                    style={styles.categoryImage}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={Card}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
        paddingHorizontal: horizontalScale(8),
        //paddingVertical:verticalScale(10),
        marginVertical:30
    },
    listContent: {
        paddingBottom: verticalScale(10),
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
    },
    card: {
        flex: 1,
        marginHorizontal: horizontalScale(6),
        width: horizontalScale(19),
        height: verticalScale(102),
        borderRadius: moderateScale(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        marginVertical: verticalScale(10),
        
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryImage: {
        width: moderateScale(60),
        height: moderateScale(60),
        position: 'absolute',
        bottom:-0,
        right: -10,
        transform: [{ rotate: '20deg' }],
        borderRadius: 4,
        elevation:20
    },
 
});

export default CardGrid;

{/* <SectionList
      sections={DATA.map(section => ({
        ...section,
        data: chunkArray(section.data, 2),
      }))}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.row}>
          {item.map((entry, index) => (
            <View
              key={index}
              style={[styles.item, {backgroundColor: entry.color}]}>
              <TextCmp size={16} weight='bold' marginV={8} marginH={10} width={80}>{entry.title}</TextCmp>
              <View>
                <Image style={styles.image} source={entry.image} />
                </View>
            </View>
          ))}
        </View>
      )}
      renderSectionHeader={({section: {title}}) => (
        <TextCmp size={16} marginV={20} marginH={14} weight='Demi' style={styles.header}>{title}</TextCmp>
      )}
    />
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(12),
    marginBottom: verticalScale(12),
  },
  item: {
    flex: 1,
    marginHorizontal: horizontalScale(6),
    width: horizontalScale(192),
    height: verticalScale(109),
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow:'hidden',
    marginVertical:verticalScale(10)
  },


  image:{
    marginVertical:verticalScale(28)
  }
}); */}