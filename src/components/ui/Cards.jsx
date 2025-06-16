import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { images } from '../../assets/images';
import Text from './Text';
import { horizontalScale, verticalScale } from '../../../utils/responsive';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


export default function Cards({ image, text, dec, favoriteCount, extraText }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('likedscreen')}>
            <View style={styles.container}>
                <Image source={image} style={styles.rec} />
                <View style={styles.titleContainer}>
                    <Text weight='bold' size={15}>{text}</Text>
                    <View style={styles.textContainer}>
                        <Image source={images.pin} style={styles.icon} />
                        <Text color='#B3B3B3'>
                            {dec}{favoriteCount !== undefined ? ` • ${favoriteCount}` : ''}
                        </Text>
                    </View>
                    {extraText && (
                        <Text size={12}>{extraText}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 8,
        gap: 15
    },
    titleContainer: {
        justifyContent: 'center'
    },
    rec: {
        width: horizontalScale(67),
        height: verticalScale(67),
    },
    textContainer: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    icon: {
        marginRight: 5,
        marginTop: 5
    },
    scrollContent: {
        paddingHorizontal: 5,
    }


})