import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { images } from '../assets/images'
import Fonts from '../assets/fonts'
import { getAccessToken, loginToSpotify } from '../../utils/spotifyAuth'
import { useDispatch } from 'react-redux'
import { authenticate } from '../../store/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import Text from '../components/ui/Text'

const Login = () => {
    const [isAuthenticating, setAuthenticating] = useState(false);
    const dispatch = useDispatch();

    const loginHandler = async () => {
    setAuthenticating(true);
    try {
      const result = await getAccessToken();
      console.log('token',result);
      dispatch(authenticate(result));
    }
    catch (error) {
      Alert.alert('Authentication failed!', 'Could not logged You in.', 'please check credenatials');
    }
    finally {
      setAuthenticating(false);

    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message='Loggin You in' />
  }
    return (
        <View style={styles.container}>
            <Image source={images.login} style={styles.image} />
            <Text style={styles.text} size={30} weight='bold' alignment='center'>Millions of Songs.</Text>
            <Text style={styles.text} size={30} weight='bold' alignment='center'>Free on Spotify.</Text>
            <View>
                <TouchableOpacity style={styles.button} onPress={loginHandler}>
                    <Text style={styles.buttontext} size={16} color='black' weight='bold' >Login to Spotify</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttontext} size={16} color='black' weight='bold' >Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttontext} size={16} color='black' weight='bold' >Continue with Apple</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '50%'
    },
    button: {
        backgroundColor: '#1ED760',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        width: '80%',
        height: 50,
        alignSelf: 'center',
        marginVertical: 0,
        marginTop: 20,

    },
    buttontext: {
        fontSize: 18
    }
}) 