import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  StyleSheet,
} from 'react-native';
import color from '@styles/colors';
import ToolBar from '../components/ToolBar';

export default function SettingsScreen(props) {
  const [name, setName] = useState('Usuario Ejemplo');
  const [email, setEmail] = useState('usuario@example.com');

  const [feature1, setFeature1] = useState(false);
  const [feature2, setFeature2] = useState(false);
  const [feature3, setFeature3] = useState(false);
  const [feature4, setFeature4] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert('Borrar cuenta', '¿Está seguro que desea borrar su cuenta?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Borrar',
        style: 'destructive',
        onPress: () => {
          // Perform account deletion logic here
        },
      },
    ]);
  };

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={styles.container}>
      <ToolBar
        titulo="Configuraciones"
        onPressLeft={() => props.navigation.navigate('Main')}
        iconLeft={require('@resources/images/back.png')}
        onPressRight={() => props.navigation.navigate('Settings')}
        iconRight={require('@resources/images/usuario_icon.png')}
      />
      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          <Image
            source={require('@resources/images/usuario_icon.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.changeImageText}>Cambiar imagen</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Características</Text>
          <View style={styles.feature}>
            <Text style={styles.text}>Característica 1</Text>
            <Switch value={feature1} onValueChange={setFeature1} />
          </View>
          <View style={styles.feature}>
            <Text style={styles.text}>Característica 2</Text>
            <Switch value={feature2} onValueChange={setFeature2} />
          </View>
          <View style={styles.feature}>
            <Text style={styles.text}>Característica 3</Text>
            <Switch value={feature3} onValueChange={setFeature3} />
          </View>
          <View style={styles.feature}>
            <Text style={styles.text}>Característica 4</Text>
            <Switch value={feature4} onValueChange={setFeature4} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acerca de</Text>
          <Text style={{fontSize: 16, color: color.GREEN}}>
            Versión de la app: 1.0.0
          </Text>
          <Text style={{fontSize: 16, color: color.GREEN}}>
            Redes sociales: @plage_tracker_app
          </Text>
          <Text style={{fontSize: 16, color: color.GREEN}}>Ayuda</Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>Borrar cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.GREEN_PALE,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    gap: 30,
  },
  section: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changeImageText: {
    color: color.GREEN,
    marginBottom: 10,
  },
  sectionTitle: {
    color: color.GREEN,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feature: {
    fontSize: 22,
    color: color.GREEN,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    gap: 20,
  },
  text: {
    fontSize: 22,
    color: color.GREEN,
    marginBottom: 5,
  },
  aboutSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: color.RED,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: color.WHITE,
    fontWeight: 'bold',
  },
});
