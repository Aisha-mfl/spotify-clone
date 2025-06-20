import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from './Text'
import { horizontalScale, verticalScale } from '../../../utils/responsive'



const IconButton = ({ onPress, children, isActive }) => {
    return (
        <View style={[styles.buttonContainer, isActive && styles.activeButtonContainer]}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text size={10} weight='bold' color={isActive ? 'black' : 'white'}>{children}</Text>

            </TouchableOpacity>
        </View>
    )
}

export default IconButton

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#111111',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#7F7F7F',
        width: horizontalScale(100),
        height: verticalScale(35),
        marginHorizontal: horizontalScale(2),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:30
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeButtonContainer: {
        backgroundColor: '#1DB954',
        borderColor: '#1DB954',
    },



})