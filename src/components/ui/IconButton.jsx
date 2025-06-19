import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from './Text'



const IconButton = ({ onPress, children, isActive }) => {
    return (
        <View style={[styles.buttonContainer, isActive && styles.activeButtonContainer]}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text size={11} weight='bold' color={isActive ? 'black' : 'white'}>{children}</Text>

            </TouchableOpacity>
        </View>
    )
}

export default IconButton

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 12,
        backgroundColor: '#111111',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#7F7F7F',
        width: 90,
        height: 35,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
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