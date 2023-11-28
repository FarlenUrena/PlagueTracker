import React, { useState, useEffect, useContext } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { UserContext } from '@context/UserContext';
import { ActivityIndicator } from 'react-native';
import { firestore } from '../../firebase-config';

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
    cultivos: '',
    condiciones_reproduccion: '',
    ciclo_vida: '',
    descripcion: '',
    productos: '',
    signos_infestacion: '',
    como_enfrentarlas:'',
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
          como_enfrentarlas:doc.data().como_enfrentarlas,
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
      nombre: '',
    cultivos: '',
    condiciones_reproduccion: '',
    ciclo_vida: '',
    descripcion: '',
    productos: '',
    signos_infestacion: '',
    como_enfrentarlas:'',
    });
  };

  const handleSubmit = async () => {
    try {
      const newPlague = {
        nombre: newPlagueData.nombre,
        cultivos: newPlagueData.cultivos,
        condiciones_reproduccion: newPlagueData.condiciones_reproduccion,
        ciclo_vida: newPlagueData.ciclo_vida,
        descripcion: newPlagueData.descripcion,
        productos: newPlagueData.productos,
        signos_infestacion: newPlagueData.signos_infestacion,
        como_enfrentarlas: newPlagueData.como_enfrentarlas,
        
      };

      // Agrega el nuevo foro a la colección 'Plague' en Firebase
      const docRef = await addDoc(collection(firestore, 'plagues'), newPlague);

      // Actualiza el estado local si es necesario (opcional)
      setPlagueData(prevPlagueData => [
        ...prevPlagueData,
        { ...newPlague, id: docRef.id },
      ]);
    } catch (error) {
      console.error('Error al agregar el foro:', error);
    }

    closeForm();
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          size="large"
          color={color.GREEN}
        />
      ) : (
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          style={{ backgroundColor: color.GREEN_SLOW }}>
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
              placeholder="Nombre"
              value={newPlagueData.nombre}
              onChangeText={text =>
                setNewPlagueData({ ...newPlagueData, nombre: text })
              }
              placeholderTextColor={color.BLACK}
            />
            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Descripción"
              value={newPlagueData.descripcion}
              onChangeText={text =>
                setNewPlagueData({ ...newPlagueData, descripcion: text })
              }
              multiline={true} // Habilita el campo de texto multilínea
              placeholderTextColor={color.BLACK}
            />
           
            <Text style={styles.label}>Cultivos:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Cultivos afectados"
              value={newPlagueData.cultivos}
              onChangeText={text =>
                setNewPlagueData({ ...newPlagueData, cultivos: text })
              }
              multiline={true} // Habilita el campo de texto multilínea
              placeholderTextColor={color.BLACK} />
            <Text style={styles.label}>Productos recomendados:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="productos recomendados"
              value={newPlagueData.productos}
              onChangeText={text =>
                setNewPlagueData({ ...newPlagueData, productos: text })
              }
              multiline={true} // Habilita el campo de texto multilínea
              
              placeholderTextColor={color.BLACK} />
            <Text style={styles.label}>Condiciones de reprodución:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Condiciones de reprodución"
              value={newPlagueData.condiciones_reproduccion}
              onChangeText={text =>
                setNewPlagueData({ ...newPlagueData, condiciones_reproduccion: text })
              }
              multiline={true} // Habilita el campo de texto multilínea
              placeholderTextColor={color.BLACK} />
               {/*   
          
          ciclo_vida: '' ,
          
          
          signos_infestacion: '',*/}
          <Text style={styles.label}>Ciclo de vida:</Text>
              <TextInput
              style={styles.formInput}
              placeholder="Ciclo de vida"
              value={newPlagueData.ciclo_vida}
              onChangeText={text =>
                setNewPlagueData({ ...newPlagueData, ciclo_vida: text })
              }
              multiline={true} // Habilita el campo de texto multilínea
              placeholderTextColor={color.BLACK} />
              <Text style={styles.label}>Signos de infestación:</Text>
              <TextInput
              style={styles.formInput}
              placeholder="Signos de infestación"
              value={newPlagueData.signos_infestacion}
              onChangeText={text =>
                setNewPlagueData({ ...newPlagueData, signos_infestacion: text })
              }
              multiline={true} // Habilita el campo de texto multilínea
              placeholderTextColor={color.BLACK} />

            {/* Agrega más campos de formulario según tus necesidades */}
            <View style={styles.buttonRow}>
              <Button
                title="Cancelar"
                onPress={closeForm}
                style={styles.button}
                color={color.RED} // Cambia el color a verde
              />
              <Button
                title="Agregar plaga"
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
    shadowOffset: { width: 0, height: 2 },
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
