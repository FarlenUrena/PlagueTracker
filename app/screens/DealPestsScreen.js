import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  Button,
} from 'react-native';
import MyTextInput from '@components/MyTextInput';
import MyButton from '@components/MyButton';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {firestore} from '../../firebase-config';
import {Picker} from '@react-native-picker/picker';
import color from '@styles/colors';
import ToolBar from '../components/ToolBar';

export default function DealPestsScreen(props) {
  const [pestName, setPestName] = useState('');
  const [cropName, setCropName] = useState('');
  const [pestsList, setPestsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pestsData, setForumData] = useState([]);

  const [loading, setLoading] = useState(true);
  // const PestsData = [
  //   {
  //     nombre: 'Pulgón verde del melocotonero',
  //     cultivos: 'Melocotonero',
  //     descripcion: 'Se reproduce rápidamente en climas cálidos y secos, atacando brotes tiernos y hojas nuevas.',
  //     ciclo_vida: 'El pulgón pasa por etapas de huevo, ninfa y adulto. Las ninfas se desarrollan rápidamente hasta convertirse en adultos.',
  //     signosDeInfestacion: 'Hoja enrollada, secreción de melaza, debilitamiento de la planta.',
  //     condiciones_reproduccion: 'Altas temperaturas y baja humedad.',
  //     productosParaEnfrentar: ['Insecticidas a base de aceites vegetales', 'Neem oil']
  //   },
  //   {
  //     nombre: 'Gusano cogollero',
  //     cultivos: 'Maíz',
  //     descripcion: 'Se multiplica en épocas cálidas y húmedas, causando daños en hojas y mazorcas de maíz.',
  //     ciclo_vida: 'Huevo, larva, pupa y adulto. Las larvas se alimentan de hojas y tallos antes de convertirse en polillas.',
  //     signosDeInfestacion: 'Tallo perforado, presencia de excrementos (excrementos negros)',
  //     condiciones_reproduccion: 'Temperaturas superiores a 15°C y humedad adecuada.',
  //     productosParaEnfrentar: ['Bacillus thuringiensis', 'Insecticidas a base de piriproxifen']
  //   },
  //   {
  //     nombre: 'Mosca blanca',
  //     cultivos: 'Tomate',
  //     descripcion: 'Se reproduce en condiciones cálidas y húmedas, causando daños al succionar savia de las plantas.',
  //     ciclo_vida: 'Huevo, larva, pupa y adulto. Las larvas y adultos se alimentan de la savia de las plantas.',
  //     signosDeInfestacion: 'Presencia de moscas blancas en el envés de las hojas, hojas amarillentas.',
  //     condiciones_reproduccion: 'Temperaturas superiores a 20°C y alta humedad.',
  //     productosParaEnfrentar: ['Insecticidas a base de aceite de nim', 'Aceite de neem']
  //   },
  //   // ... (información adicional para las otras plagas)
  //   {
  //     nombre: 'Chinche de la alfalfa',
  //     cultivos: 'Alfalfa',
  //     descripcion: 'Se reproduce en condiciones cálidas, dañando hojas y brotes de la alfalfa.',
  //     ciclo_vida: 'Huevo, ninfas y adulto. Las ninfas se desarrollan alimentándose de la savia de la planta.',
  //     signosDeInfestacion: 'Manchas en las hojas, presencia de chinches en la planta.',
  //     condiciones_reproduccion: 'Temperaturas superiores a 25°C y sequedad.',
  //     productosParaEnfrentar: ['Insecticidas a base de deltametrina', 'Uso de depredadores naturales como avispas parásitas']
  //   },
  //   {
  //     nombre: 'Pulgón del pepino',
  //     cultivos: 'Pepino',
  //     descripcion: 'Se desarrolla en climas cálidos, afectando brotes y hojas jóvenes de los pepinos.',
  //     ciclo_vida: 'El pulgón pasa por etapas de huevo, ninfa y adulto. Las ninfas se reproducen rápidamente.',
  //     signosDeInfestacion: 'Hojas enrolladas, secreción pegajosa en las plantas, presencia de pulgones.',
  //     condiciones_reproduccion: 'Temperaturas entre 20°C y 25°C, alta humedad.',
  //     productosParaEnfrentar: ['Insecticidas a base de aceite de neem', 'Soluciones de jabón potásico']
  //   },
  //   {
  //     nombre: 'Mosca de la fruta',
  //     cultivos: 'Manzana',
  //     descripcion: 'Se multiplica en climas cálidos, causando daños en frutos y hojas de los manzanos.',
  //     ciclo_vida: 'Huevo, larva, pupa y adulto. Las larvas se alimentan de la fruta madura.',
  //     signosDeInfestacion: 'Presencia de larvas en la fruta, frutos con áreas blandas o podridas.',
  //     condiciones_reproduccion: 'Temperaturas superiores a 20°C y frutos maduros.',
  //     productosParaEnfrentar: ['Trampas de feromonas', 'Insecticidas a base de spinosad']
  //   },
  //   {
  //     nombre: 'Gusano del espárrago',
  //     cultivos: 'Espárrago',
  //     descripcion: 'Se reproduce en climas cálidos, afectando brotes y tallos de los espárragos.',
  //     ciclo_vida: 'Huevo, larva, pupa y adulto. Las larvas se alimentan de brotes jóvenes.',
  //     signosDeInfestacion: 'Tallos perforados, daño en yemas y puntas de los brotes.',
  //     condiciones_reproduccion: 'Temperaturas entre 20°C y 30°C, sequedad.',
  //     productosParaEnfrentar: ['Insecticidas a base de espinosad', 'Rotación de cultivoss']
  //   },

  //   {
  //     nombre: 'Áfido del repollo',
  //     cultivos: 'Repollo',
  //     descripcion: 'Se desarrolla en climas frescos y húmedos, causando daños en las hojas de col y brócoli.',
  //     ciclo_vida: 'El áfido del repollo pasa por etapas de huevo, ninfa y adulto. Las ninfas se alimentan de los tejidos de las plantas.',
  //     signosDeInfestacion: 'Hoja enrollada, amarillamiento de hojas, presencia de áfidos en las hojas.',
  //     condiciones_reproduccion: 'Temperaturas moderadas entre 10°C y 20°C, alta humedad.',
  //     productosParaEnfrentar: ['Insecticidas a base de piretrinas', 'Uso de mariquitas y crisopas como depredadores naturales']
  //   },
  //   {
  //     nombre: 'Pulgón negro de la ciruela',
  //     cultivos: 'Ciruelo',
  //     descripcion: 'Se multiplica en climas cálidos, afectando brotes y hojas jóvenes de los ciruelos.',
  //     ciclo_vida: 'El pulgón pasa por etapas de huevo, ninfa y adulto. Las ninfas se reproducen rápidamente en condiciones favorables.',
  //     signosDeInfestacion: 'Presencia de pulgones en brotes jóvenes, deformación de hojas y brotes.',
  //     condiciones_reproduccion: 'Temperaturas entre 20°C y 30°C, alta humedad.',
  //     productosParaEnfrentar: ['Insecticidas sistémicos', 'Trampas adhesivas amarillas']
  //   },
  //   {
  //     nombre: 'Mosca de la zanahoria',
  //     cultivos: 'Zanahoria',
  //     descripcion: 'Se reproduce en climas cálidos, dañando raíces y follaje de las zanahorias.',
  //     ciclo_vida: 'Huevo, larva, pupa y adulto. Las larvas se alimentan de raíces y follaje.',
  //     signosDeInfestacion: 'Daño en raíces, galerías en la zanahoria, hojas amarillentas.',
  //     condiciones_reproduccion: 'Temperaturas entre 15°C y 25°C, suelos húmedos.',
  //     productosParaEnfrentar: ['Rotación de cultivoss', 'Uso de nematodos beneficiosos']
  //   },
  //   {
  //     nombre: 'Gorgojo de la remolacha',
  //     cultivos: 'Remolacha',
  //     descripcion: 'Se reproduce en climas cálidos y húmedos, causando daños en las raíces de la remolacha.',
  //     ciclo_vida: 'Huevo, larva, pupa y adulto. Las larvas se alimentan de las raíces.',
  //     signosDeInfestacion: 'Daño en las raíces, marchitamiento de las plantas, presencia de gorgojos.',
  //     condiciones_reproduccion: 'Temperaturas superiores a 20°C, suelos húmedos.',
  //     productosParaEnfrentar: ['Insecticidas a base de clorpirifos', 'Uso de nematodos entomopatógenos']
  //   },
  //   {
  //     nombre: 'Ácaro del aguacate',
  //     cultivos: 'Aguacate',
  //     descripcion: 'Se multiplica en climas cálidos y secos, afectando hojas y frutos del aguacate.',
  //     ciclo_vida: 'Huevo, larva, protoninfa, deutoninfa y adulto. Las ninfas y adultos se alimentan de las hojas y frutos.',
  //     signosDeInfestacion: 'Manchas en las hojas, frutos con áreas necróticas, presencia de ácaros.',
  //     condiciones_reproduccion: 'Temperaturas superiores a 25°C, baja humedad.',
  //     productosParaEnfrentar: ['Acaricidas a base de azufre', 'Aceite hortícola de verano']
  //   },
  //   {
  //     nombre: 'Chinche verde',
  //     cultivos: 'Soja',
  //     descripcion: 'Se multiplica en condiciones cálidas, afectando vainas y semillas de soja.',
  //     ciclo_vida: 'Huevo, ninfa y adulto. Las ninfas y adultos se alimentan de semillas y vainas.',
  //     signosDeInfestacion: 'Vainas dañadas, semillas arrugadas o manchadas, presencia de chinches.',
  //     condiciones_reproduccion: 'Temperaturas entre 20°C y 30°C, sequedad.',
  //     productosParaEnfrentar: ['Insecticidas a base de imidacloprid', 'Uso de depredadores como avispas parasitoides']
  //   }
  // ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(collection(firestore, 'plagues'));
        const pests = data.docs.map(doc => ({
          nombre: doc.data().nombre,
          cultivos: doc.data().cultivo,
          como_enfrentarlas: doc.data().como_enfrentarlas,
        }));
        setForumData(pests);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos de las plagas:', error);
      }
    };

    fetchData();
  }, []);
  const filteredPestsData = pestsData.filter(pests =>
    Object.values(pests).some(
      field =>
        field !== undefined &&
        field !== null && // Asegura que el campo no sea null
        field.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );
  const searchPests = () => {
    // Simulando la búsqueda de plagas
    const filteredPests = pestsData.filter(
      pest =>
        pest.nombre.toLowerCase().includes(pestName.toLowerCase()) &&
        pest.cultivos.toLowerCase().includes(cropName.toLowerCase()),
    );
    setPestsList(filteredPests);
  };

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={styles.container}>
      <ToolBar
        titulo="Combatir plagas"
        onPressLeft={() => props.navigation.navigate('Main')}
        iconLeft={require('@resources/images/back.png')}
        onPressRight={() => props.navigation.navigate('Settings')}
        iconRight={require('@resources/images/usuario_icon.png')}
      />
      {/* <View style={styles.contentContainer}> */}
      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar plaga o cultivos"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        placeholderTextColor={color.BLACK}
      />
      {/* <MyButton title="Buscar Plagas" onPress={searchPests} /> */}
      {/* aqui va el codigo */}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        filteredPestsData.map((pest, i) => (
          <View style={styles.card} key={i}>
            <View style={styles.cardContent}>
              <View style={styles.header}>
                <Text style={styles.title}>{pest.nombre}</Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.creator}>{pest.cultivos}</Text>
                </View>
              </View>
              <Text style={styles.info}>¿Cómo enfrentar las plagas?</Text>
              <Text style={styles.infoText}>{pest.como_enfrentarlas}</Text>
            </View>
          </View>
        ))
      )}
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
  searchBar: {
    height: 40,
    margin: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    color: color.BLACK,
    backgroundColor: color.GREEN_SKY,
  },
  deleteButtonText: {
    color: color.WHITE,
    fontWeight: 'bold',
  },
  // Estilos para los detalles del foro
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  description: {
    fontSize: 16,
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  info: {
    fontSize: 15,
    color: color.GREEN,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'black',
    marginRight: 10,
  },
  creator: {
    fontSize: 14,
    color: 'gray',
  },
  // Estilos para tus tarjetas de foro
  card: {
    width: '80%',
    flexDirection: 'row',
    backgroundColor: color.GREEN_SKY,
    borderRadius: 8,
    margin: 5,
    elevation: 2,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 10,
  },
  // Estilos para el botón flotante
  fab: {
    width: 60,
    height: 60,
    backgroundColor: color.GREEN,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: '#fff',
  },
  // Estilos para el modal y el formulario
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    width: '80%', // Ancho máximo del 80% de la pantalla
    backgroundColor: color.GREEN_SKY,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center', // Centra el contenido horizontalmente en el formulario
  },
  formInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    color: color.BLACK,
  },
  formInputArea: {
    width: '100%',
    height: 100, // Ajusta la altura según tus preferencias
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    color: color.BLACK,
  },
  groupPicker: {
    width: '100%',
    height: 40,
    borderColor: 'black', // Color del borde
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    color: color.BLACK,
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  formHeader: {
    fontSize: 25,
    color: color.GREEN,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 20,
  },
  button: {
    flex: 1,
    margin: 5,
  },
});
