import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import color from '@styles/colors';
import ToolBar from '../components/ToolBar';
import {Picker} from '@react-native-picker/picker';
import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {UserContext} from '@context/UserContext';
import {ActivityIndicator} from 'react-native';
import {firestore} from '../../firebase-config';

function goToScreen(props, routeName, plagueId) {
  props.navigation.navigate(routeName, {
    plagueId: plagueId,
  });
}

export default function PlaguesScreen(props) {
  // const app = initializeApp(firebaseConfig);
  // const firestore = getFirestore(app);

  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const [isAddingPlague, setIsAddingPlague] = useState(false); // Estado para controlar la visualización del formulario
  const [newPlagueData, setNewPlagueData] = useState({
    nombre: '',
          cultivos:'',
          condiciones_reproduccion: '',
          ciclo_vida: '' ,
          descripcion: '',
          productos: '',
          signos_infestacion: '',
  });
  const [loading, setLoading] = useState(true);
  const [plagueData, setPlagueData] = useState([]);
  const [login, loginAction, auth] = useContext(UserContext);

  const filteredPlagueData = plagueData.filter(plague =>
    Object.values(plague).some(
      field =>
        field !== undefined &&
        field !== null && // Asegura que el campo no sea null
        field.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(collection(firestore, 'plagues'));
        const pests = data.docs.map(doc => ({
          nombre: doc.data().nombre,
          cultivos: doc.data().cultivo,
          condiciones_reproduccion: doc.data().condiciones_reproduccion,
          ciclo_vida: doc.data().ciclo_vida,
          descripcion: doc.data().descripcion,
          productos: doc.data().productos,
          signos_infestacion: doc.data().signos_infestacion,
        }));
        setPlagueData(pests);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos de las plagas:', error);
      }
    };

    fetchData();
  }, []);


  const handleAddPlagueEntry = () => {
    setIsAddingPlague(true);
  };

  const closeForm = () => {
    setIsAddingPlague(false);
    setNewPlagueData({
      title: '',
      description: '',
      createdAt: serverTimestamp(),
      replyCount: 0,
      group: '',
      likes: 0,
      creator: '',
    });
  };

  const handleSubmit = async () => {
    try {
      const newPlague = {
        title: newPlagueData.title,
        description: newPlagueData.description,
        createdAt: serverTimestamp(),
        replyCount: newPlagueData.replyCount,
        group: newPlagueData.group,
        likes: newPlagueData.likes,
        creator: newPlagueData.creator,
      };

      // Agrega el nuevo foro a la colección 'Plague' en Firebase
      const docRef = await addDoc(collection(firestore, 'plagues'), newPlague);

      // Actualiza el estado local si es necesario (opcional)
      setPlagueData(prevPlagueData => [
        ...prevPlagueData,
        {...newPlague, id: docRef.id},
      ]);
    } catch (error) {
      console.error('Error al agregar el foro:', error);
    }

    closeForm();
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          size="large"
          color={color.GREEN}
        />
      ) : (
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          style={{backgroundColor: color.GREEN_SLOW}}>
          <StatusBar backgroundColor={color.GREEN} translucent={true} />
          <ToolBar
            titulo="Plage Tracker"
            onPressLeft={() => props.navigation.navigate('Settings')}
            iconLeft={require('@resources/images/configuraciones_icon.png')}
            onPressRight={() => props.navigation.navigate('Settings')}
            iconRight={require('@resources/images/usuario_icon.png')}
          />
          {/* Barra de búsqueda */}
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar plagas"
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
            placeholderTextColor={color.BLACK}
          />
          {filteredPlagueData.map((plague, index) => (
            <TouchableOpacity
              style={styles.card}
              key={index}
              onPress={() => goToScreen(props, 'PlagueDetail', plague.id)} // Llama a una función con el ID del foro
            >
              <View style={styles.card} key={index}>
                <View style={styles.cardContent}>
                  <View style={styles.header}>
                    <Text style={styles.title}>{plague.nombre}</Text>
                    <View style={styles.infoContainer}>
                      <Text style={styles.info}>
                        {plague.cultivos}
                      </Text>
                      <Text style={styles.creator}>{plague.creator}</Text>
                    </View>
                  </View>
                  <Text style={styles.info}>
                    Descripción: {plague.descripcion}
                  </Text>
                  <Text style={styles.info}>Ver más</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {/* Botón flotante para agregar una nueva entrada */}
      <TouchableOpacity style={styles.fab} onPress={handleAddPlagueEntry}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal para el formulario de nuevo foro */}
      <Modal
        visible={isAddingPlague}
        animationType="slide"
        transparent={true}
        onRequestClose={closeForm}>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.formHeader}>
              Crear nueva entrada para el foro
            </Text>
            <Text style={styles.label}>Título:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Título"
              value={newPlagueData.title}
              onChangeText={text =>
                setNewPlagueData({...newPlagueData, title: text})
              }
              placeholderTextColor={color.BLACK}
            />
            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={styles.formInputArea}
              placeholder="Descripción"
              value={newPlagueData.description}
              onChangeText={text =>
                setNewPlagueData({...newPlagueData, description: text})
              }
              multiline={true} // Habilita el campo de texto multilínea
              numberOfLines={4} // Especifica el número de líneas que se mostrarán inicialmente
              placeholderTextColor={color.BLACK}
            />
            {/* Selector de grupo */}
            <Text style={styles.label}>Grupo a asociar:</Text>
            <Picker
              color="black"
              selectionColor="black"
              mode="dropdown"
              selectedValue={newPlagueData.group}
              onValueChange={(itemValue, itemIndex) =>
                setNewPlagueData({...newPlagueData, group: itemValue})
              }
              dropdownIconColor="black"
              style={styles.groupPicker}>
              <Picker.Item label="Plagas" value="Plagas" />
              <Picker.Item label="Peces" value="Peces" />
              <Picker.Item label="Plantas" value="Plantas" />
            </Picker>
            {/* Agrega más campos de formulario según tus necesidades */}
            <View style={styles.buttonRow}>
              <Button
                title="Cancelar"
                onPress={closeForm}
                style={styles.button}
                color={color.RED} // Cambia el color a verde
              />
              <Button
                title="Agregar Foro"
                onPress={handleSubmit}
                style={styles.button}
                color={color.GREEN} // Cambia el color a verde
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos para tus tarjetas de foro
  card: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: color.GREEN_SKY,
    borderRadius: 8,
    margin: 5,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  // Estilos para la barra de búsqueda
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
  // Estilos para los detalles del foro
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  info: {
    fontSize: 13,
    color: 'black',
    marginRight: 10,
  },
  creator: {
    fontSize: 13,
    color: 'darkgray',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
