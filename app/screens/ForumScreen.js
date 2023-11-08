import React from 'react';
import {Text, View, StatusBar, ScrollView, StyleSheet} from 'react-native';
import color from '@styles/colors';
import ToolBar from '../components/ToolBar';



export default function ForumScreen(props) {
  const forumData = [
    {
      title: 'Foro 1',
      description: 'Descripción del foro 1...',
      date: '08/11/2023',
      time: '14:30',
      replyCount: 5,
      group: 'Plagas',
      likes: 10, // Cantidad de likes
    },
    {
      title: 'Foro 2',
      description: 'Descripción del foro 2...',
      date: '09/11/2023',
      time: '15:30',
      replyCount: 3,
      group: 'Peces',
      likes: 8, // Cantidad de likes
    },
    {
      title: 'Foro 3',
      description: 'Descripción del foro 3...',
      date: '09/11/2023',
      time: '15:30',
      replyCount: 3,
      group: 'Peces',
      likes: 0, // Cantidad de likes
    },
    {
      title: 'Foro 4',
      description: 'Descripción del foro 4...',
      date: '09/11/2023',
      time: '16:30',
      replyCount: 3,
      group: 'Peces',
      likes: 6, // Cantidad de likes
    },
    {
      title: 'Foro 5',
      description: 'Descripción del foro 5...',
      date: '09/11/2023',
      time: '17:30',
      replyCount: 3,
      group: 'Peces',
      likes: 2, // Cantidad de likes
    },
    {
      title: 'Foro 2',
      description: 'Descripción del foro 6...',
      date: '09/11/2023',
      time: '15:30',
      replyCount: 3,
      group: 'Peces',
      likes: 4, // Cantidad de likes
    },
    // Agrega más elementos de foro si es necesario
  ];

  return (
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

      {forumData.map((forum, index) => (
        <View style={styles.card} key={index}>
          <View style={styles.cardContent}>
            <View style={styles.header}>
              <Text style={styles.title}>{forum.title}</Text>
              <Text style={styles.info}>
                {forum.date}, {forum.time}
              </Text>
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
});
