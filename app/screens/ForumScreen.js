import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import color from '@styles/colors';
import ToolBar from '../components/ToolBar';

export default function ForumScreen(props) {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const forumData = [
    {
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
    // Agrega aquí la lógica para abrir una pantalla de creación de una nueva entrada en el foro
    // Por ejemplo, puedes navegar a una pantalla de creación de entrada.
    // Todo Create new forum
    console.log('Todo// Create new forum');
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
          placeholder="Buscar en el foro"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
        {filteredForumData.map((forum, index) => (
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
            {/* <Image
      source={require('./forum-image.jpg')}
      style={styles.image}
    /> */}
          </View>
        ))}
      </ScrollView>
      {/* Botón flotante para agregar una nueva entrada */}
      <TouchableOpacity style={styles.fab} onPress={handleAddForumEntry}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
  info: {
    fontSize: 13,
    color: 'darkgray',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 5,
    fontSize: 14,
  },
  creator: {
    marginLeft: 10 /* Establece el margen izquierdo para separar el nombre del creador de la fecha */,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilos para la barra de búsqueda
  searchBar: {
    height: 40,
    margin: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  // Estilos para el botón flotante
  fab: {
    width: 60,
    height: 60,
    backgroundColor: color.GREEN, // Color de fondo del botón
    borderRadius: 30, // Hace que el botón sea circular
    position: 'absolute',
    bottom: 20, // Ajusta la posición vertical según sea necesario
    right: 20, // Ajusta la posición horizontal según sea necesario
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: '#fff', // Color del texto del botón
  },
});
