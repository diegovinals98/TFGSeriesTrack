import React, { useState } from 'react';
import logoFST from '../assets/logoFST.jpg';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../userContext.js'; // Importa el hook useUser
import { Alert } from 'react-native';


import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const LogInScreen = () => {
  
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { setUser } = useUser();


  async function handleLogin() {
    
    try {
      let response = await fetch('http://10.0.0.36:3000/login', { // Asegúrate de que la IP y el puerto sean correctos
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: username,
          contraseña: password
        })
      });
  
      let json = await response.json();
    if (json.success === 1) {
      console.log('Inicio de sesión exitoso:', json);
      // Aquí puedes agregar la navegación a otra pantalla si es necesario
      //Alert.alert("Éxito", "Inicio de sesión exitoso.");
      setUser({
        id: json.user.Id, // Asegúrate de que estos campos coincidan con los nombres en tu base de datos
        nombre: json.user.Nombre,
        apellidos: json.user.Apellidos,
        usuario: json.user.Usuario,
        contraseña: json.user.Contraseña,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      // Aquí manejas el caso de éxito 0 o cualquier otro caso
      console.log('Error en el inicio de sesión');
      setLoginError('Usuario o contraseña incorrectos');
      Alert.alert("Error", "Usuario o contraseña incorrectos.");
    }
  } catch (error) {
    console.error('Error en la solicitud de inicio de sesión:', error);
    setLoginError('Error al conectarse al servidor');
    Alert.alert("Error de Conexión", "Error al conectarse al servidor.");
  }
}
  



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
    <Image source={logoFST} style={styles.logo} />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />


  
    
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin()}
          >
            <Text style={styles.text}>Iniciar Sesión</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.text, styles.buttonOutlineText]}>Volver</Text>
          </TouchableOpacity>
    
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7', // Un fondo claro para la accesibilidad
    //backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#222', // Un color oscuro para el título para contraste
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd', // Un color más suave para el borde
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff', // Fondo blanco para los campos de entrada
  },
  button:{
    display: 'flex', // 'display: flex' es el valor predeterminado en React Native, así que no es necesario.
    width: '80%', // En React Native usamos unidades sin 'px'.
    height: '5%',
    justifyContent: 'center', // En React Native usamos camelCase en lugar de guiones.
    alignItems: 'center',
    flexShrink: 0, // Esta propiedad funciona igual que en CSS.
    backgroundColor: '#005f99', // Ejemplo de color azul, ya que no especificaste un color.
    borderRadius: 10, // Si quieres mantener los bordes redondeados como en tu estilo original.
    margin: 10, // Para dar un poco de padding vertical si es necesario.
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#005f99',
    display: 'flex', // 'display: flex' es el valor predeterminado en React Native, así que no es necesario.
    width: '80%', // En React Native usamos unidades sin 'px'.
    height: '5%',
    justifyContent: 'center', // En React Native usamos camelCase en lugar de guiones.
    alignItems: 'center',
    flexShrink: 0, // Esta propiedad funciona igual que en CSS.
    borderRadius: 10, // Si quieres mantener los bordes redondeados como en tu estilo original.
    margin: 10, // Para dar un poco de padding vertical si es necesario.
  },
  buttonOutlineText: {
    color: '#005f99',
  },
  text:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black'
  },
  logo: {
    marginTop: '-20%',
    width: windowWidth * 0.6,
    height: windowWidth * 0.6 * (windowWidth  / windowWidth),
  },
});

export default LogInScreen;
