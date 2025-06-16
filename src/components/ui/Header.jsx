import { StyleSheet, View } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons';
import Entypo from '@react-native-vector-icons/entypo';

const Header = () => {
    return (
        <View style={styles.container}>
            <Entypo name="bell" color="white" size={24} />
            <Ionicons name='timer-outline' size={24} color="white" />
            <Ionicons name='settings-outline' size={24} color="white" />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        gap:7,
      

    }
})