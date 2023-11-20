import React, {useState} from 'react';
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

function goToScreen(props, routeName, forumId) {
  props.navigation.navigate(routeName, {
    forumId: forumId,
  });
}

export default function ForumScreen(props) {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const [isAddingForum, setIsAddingForum] = useState(false); // Estado para controlar la visualización del formulario
  const [newForumData, setNewForumData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    replyCount: 0,
    group: '',
    likes: 0,
    creator: '',
  });

  const forumData = [
    {
      id: 1,
      title: 'Foro 1',
      description: 'Descripción del foro 1...',
      date: '08/11/2023',
      time: '14:30',
      replyCount: 5,
      group: 'Plagas',
      likes: 10, // Cantidad de likes
      creator: 'John Doe', // Creador
    },
    {
      id: 2,
      title: 'Foro 2',
      description: 'Descripción del foro 2...',
      date: '09/11/2023',
      time: '15:30',
      replyCount: 3,
      group: 'Peces',
      likes: 8, // Cantidad de likes
      creator: 'John Doe', // Creador
    },
    {
      id: 3,
      title: 'Foro 3',
      description: 'Descripción del foro 3...',
      date: '09/11/2023',
      time: '15:30',
      replyCount: 3,
      group: 'Plantas',
      likes: 0, // Cantidad de likes
      creator: 'John Doe', // Creador
    },
    {
      id: 4,
      title: 'Foro 4',
      description: 'Descripción del foro 4...',
      date: '09/11/2023',
      time: '16:30',
      replyCount: 3,
      group: 'Plantas',
      likes: 6, // Cantidad de likes
      creator: 'John Doe', // Creador
    },
    {
      id: 5,
      title: 'Foro 5',
      description: 'Descripción del foro 5...',
      date: '09/11/2023',
      time: '17:30',
      replyCount: 3,
      group: 'Peces',
      likes: 2, // Cantidad de likes
      creator: 'John Doe', // Creador
    },
    {
      id: 6,
      title: 'Foro 6',
      description: 'Descripción del foro 6...',
      date: '09/11/2023',
      time: '15:30',
      replyCount: 3,
      group: 'Peces',
      likes: 4, // Cantidad de likes
      creator: 'John Doe', // Creador
    },
    {
      id: 7,
      title: 'Foro 7',
      description: 'Descripción del foro 7...',
      date: '09/11/2023',
      time: '15:30',
      replyCount: 3,
      group: 'Peces',
      likes: 4, // Cantidad de likes
      creator: 'John Doe', // Creador
    },
    {
      id: 8,
      title: 'Foro 8',
      description: 'Descripción del foro 8...',
      date: '09/11/2023',
      time: '15:30',
      replyCount: 3,
      group: 'Peces',
      likes: 4, // Cantidad de likes
      creator: 'John Doe', // Creador
    },
    // Agrega más elementos de foro si es necesario
  ];

  const filteredForumData = forumData.filter(forum =>
    // Convierte todos los valores de los campos a minúsculas para hacer una búsqueda sin distinción entre mayúsculas y minúsculas
    Object.values(forum).some(field =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const handleAddForumEntry = () => {
    setIsAddingForum(true); // Abre el formulario al presionar el botón
  };

  const closeForm = () => {
    setIsAddingForum(false); // Cierra el formulario
  };

  const handleSubmit = () => {
    const newForum = {...newForumData};
    // Agrega aquí la lógica para agregar el nuevo foro a la lista de foros
    forumData.push(newForum);
    closeForm(); // Cierra el formulario después de agregar un nuevo foro
  };

  return (
    <View style={{flex: 1}}>
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
          placeholder="Buscar foro"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          placeholderTextColor={color.BLACK}
        />
        {filteredForumData.map((forum, index) => (
          <TouchableOpacity
            style={styles.card}
            key={index}
            onPress={() => goToScreen(props, 'ForumDetail', forum.id)} // Llama a una función con el ID del foro
          >
            <View style={styles.card} key={index}>
              <View style={styles.cardContent}>
                <View style={styles.header}>
                  <Text style={styles.title}>{forum.title}</Text>
                  <View style={styles.infoContainer}>
                    <Text style={styles.info}>
                      {forum.date}, {forum.time}
                    </Text>
                    <Text style={styles.creator}>{forum.creator}</Text>
                  </View>
                </View>
                <Text style={styles.info}>Respuestas: {forum.replyCount}</Text>
                <Text style={styles.info}>Grupo: {forum.group}</Text>
                <Text style={styles.description}>{forum.description}</Text>
                <View style={styles.likesContainer}>
                  <Text style={styles.likesCount}>{forum.likes} 💚</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Botón flotante para agregar una nueva entrada */}
      <TouchableOpacity style={styles.fab} onPress={handleAddForumEntry}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal para el formulario de nuevo foro */}
      <Modal
        visible={isAddingForum}
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
              value={newForumData.title}
              onChangeText={text =>
                setNewForumData({...newForumData, title: text})
              }
              placeholderTextColor={color.BLACK}
            />
            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={styles.formInputArea}
              placeholder="Descripción"
              value={newForumData.description}
              onChangeText={text =>
                setNewForumData({...newForumData, description: text})
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
              selectedValue={newForumData.group}
              onValueChange={(itemValue, itemIndex) =>
                setNewForumData({...newForumData, group: itemValue})
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
