import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons';
import Entypo from '@react-native-vector-icons/entypo';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/auth';

const Header = () => {
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Entypo name="bell" color="white" size={24} />
            <Ionicons name='settings-outline' size={24} color="white" />
            <TouchableOpacity  onPress={() => dispatch(logout())}>
                <Entypo name='log-out' size={24} color='#ffffff' />
            </TouchableOpacity>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 9,


    }
})