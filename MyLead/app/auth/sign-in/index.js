import { useRouter } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Color';

export default function SignIn() {

  const router=useRouter();

  return (
    <ImageBackground
      source={require('../../../assets/images/Landing_Background.jpg')}
      style={style.background}
      resizeMode="cover"
    >
      <View style={style.container}>

        {/* Overlay to dim the background only */}
        <View style={style.dim} />

        {/* Logo */}
        <Image 
          source={require('../../../assets/images/MyLead_Logo.png')} // replace with your logo path
          style={style.logo}
          resizeMode="contain"
        />

        {/* Username */}
        <View style={style.inputGroup}>
          <Text>Username</Text>
          <TextInput style={style.input} placeholder='Username' />
        </View>

        {/* Password */}
        <View style={style.inputGroup}>
          <Text>Password</Text>
          <TextInput secureTextEntry={true} style={style.input} placeholder='Password' />
        </View>

        {/* Login Button */}
       <TouchableOpacity 
          onPress={()=>router.push('/chat/chatscreen')}
          style={style.loginBtn}>
          <Text style={style.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Create Account Button */}
        <TouchableOpacity 
          onPress={()=>router.push('/auth/sign-up')}
          style={style.createBtn}
          >
          <Text style={style.createText}>Create Account</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 35,
    jus0ifyContent: 'center',
    alignItems: 'center',
  },
  dim: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(255, 255, 255, 0.5)', // 30% white overlay
  },
   logo: {
    width: 350,
    height: 150, // space below logo
    marginTop:20 },
  inputGroup: {
    width:'100%',
    marginTop: 20,
  },
  input: {
  padding: 15,
  borderWidth: 1,
  borderRadius: 15,
  borderColor: '#353634',
  backgroundColor: 'white',
  marginTop: 10,
},
  loginBtn: {
  width: '75%',
  padding: 20,
  backgroundColor: Colors.primary,
  borderRadius: 15,
  marginTop: 30,
  alignItems: 'center', // centers the text horizontally
},
loginText: {
  color: Colors.font2,
  fontWeight: 'bold',
},

createBtn: {
  width: '75%',
  padding: 20,
  backgroundColor: Colors.font2,
  borderRadius: 15,
  marginTop: 20,
  alignItems: 'center',
},
createText: {
  color: Colors.font1,
  fontWeight: 'bold',
},
});
 