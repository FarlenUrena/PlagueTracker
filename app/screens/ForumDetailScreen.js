import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import ToolBar from '../components/ToolBar';
import color from '@styles/colors';

export default function ForumDetailScreen(props) {
  const {navigation} = props;
  const forumId = JSON.stringify(navigation.getParam('forumId', 'NO-ID'));

  const [forumEntry, setForumEntry] = useState({
    user: 'Nombre de Usuario',
    text: 'Contenido del Foro Contenido del Foro Contenido del Foro Contenido del Foro',
    timestamp: 'Hoy 9:45 AM',
    likes: 15,
    isLiked: false, // Puedes establecer esto según el estado del usuario
    group: 'Nombre del Grupo',
  });

  const comments = [
    {
      id: 1,
      user: 'Usuario1',
      text: 'Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1Comentario 1 Comentario 1 Comentario 1',
      timestamp: 'Hoy 10:30 AM',
      isMine: true,
    },
    {
      id: 2,
      user: 'Usuario2',
      text: 'Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2',
      timestamp: 'Hoy 11:15 AM',
      isMine: false,
    },
    {
      id: 1,
      user: 'Usuario1',
      text: 'Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1Comentario 1 Comentario 1 Comentario 1',
      timestamp: 'Hoy 10:30 AM',
      isMine: true,
    },
    {
      id: 2,
      user: 'Usuario2',
      text: 'Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2',
      timestamp: 'Hoy 11:15 AM',
      isMine: false,
    },
    {
      id: 1,
      user: 'Usuario1',
      text: 'Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1Comentario 1 Comentario 1 Comentario 1',
      timestamp: 'Hoy 10:30 AM',
      isMine: true,
    },
    {
      id: 2,
      user: 'Usuario2',
      text: 'Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2',
      timestamp: 'Hoy 11:15 AM',
      isMine: false,
    },
    {
      id: 1,
      user: 'Usuario1',
      text: 'Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1 Comentario 1Comentario 1 Comentario 1 Comentario 1',
      timestamp: 'Hoy 10:30 AM',
      isMine: true,
    },
    {
      id: 2,
      user: 'Usuario2',
      text: 'Comentario',
      timestamp: 'Hoy 11:15 AM',
      isMine: false,
    },
    {
      id: 1,
      user: 'Usuario1',
      text: 'Comentario 1 ',
      timestamp: 'Hoy 10:30 AM',
      isMine: true,
    },
    {
      id: 2,
      user: 'Usuario2',
      text: 'Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2 Comentario 2',
      timestamp: 'Hoy 11:15 AM',
      isMine: false,
    },
    // Agrega más comentarios según sea necesario
  ];

  const [newComment, setNewComment] = useState('');

  const handleSendComment = () => {
    // Agrega lógica para enviar el comentario
    // Actualiza el estado o realiza la acción correspondiente
  };

  const handleLikeToggle = () => {
    setForumEntry({
      ...forumEntry,
      isLiked: !forumEntry.isLiked,
      likes: forumEntry.isLiked ? forumEntry.likes - 1 : forumEntry.likes + 1,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: color.GREEN_SLOW}}>
      <StatusBar backgroundColor={color.GREEN} translucent={true} />
      <ToolBar
        titulo={`Detalle del foro ${forumId}`}
        onPressLeft={() => props.navigation.navigate('Settings')}
        iconLeft={require('@resources/images/configuraciones_icon.png')}
        onPressRight={() => props.navigation.navigate('Settings')}
        iconRight={require('@resources/images/usuario_icon.png')}
      />

      {/* Entrada del Foro */}
      <View style={styles.forumEntryContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('@resources/images/usuario_icon.png')}
            style={styles.avatar}
          />
        </View>
        <View style={styles.forumEntryContent}>
          <View style={styles.userInfoContainer}>
            <Text style={[styles.commentUserName, {color: 'white'}]}>
              {forumEntry.user}
            </Text>
            <Text
              style={[
                styles.commentTimestamp,
                {
                  color: color.WHITE_GRAY,
                },
              ]}>
              {forumEntry.timestamp}
            </Text>
          </View>
          <Text style={[styles.forumText, {color: 'white'}]}>
            {forumEntry.text}
          </Text>
          <View style={styles.likesContainer}>
            <View style={styles.likesTextContainer}>
              <Text style={styles.likesText}>💚 {forumEntry.likes}</Text>
            </View>
            <TouchableOpacity
              style={styles.likesButton}
              onPress={handleLikeToggle}>
              <Text
                style={[
                  styles.likesButtonText,
                  {
                    color: forumEntry.isLiked
                      ? color.GREEN_LIME
                      : color.WHITE_GRAY,
                  },
                ]}>
                {forumEntry.isLiked ? 'Me gustó' : 'Me gusta'}
              </Text>
            </TouchableOpacity>
            {/* Puedes agregar más elementos aquí, como el grupo al que pertenece */}
          </View>
        </View>
      </View>

      {/* ScrollView de Comentarios */}
      <ScrollView style={{flex: 1}}>
        {comments.map(comment => (
          <View
            key={comment.id}
            style={[
              styles.commentContainer,
              {
                justifyContent: comment.isMine ? 'flex-end' : 'flex-start',
              },
            ]}>
            <View style={styles.commentContent}>
              <View
                style={[
                  styles.commentBubble,
                  {
                    alignSelf: comment.isMine ? 'flex-end' : 'flex-start',
                    borderBottomLeftRadius: comment.isMine ? 16 : 0,
                    borderBottomRightRadius: comment.isMine ? 0 : 16,
                    backgroundColor: comment.isMine
                      ? color.GREEN_SKY
                      : color.SECONDARY,
                  },
                ]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* Avatar a la derecha */}
                  <View style={styles.avatarContainer}>
                    <Image
                      source={require('@resources/images/usuario_icon.png')}
                      style={styles.avatar}
                    />
                  </View>
                  {/* Nombre a la izquierda */}
                  <View style={{marginLeft: 8}}>
                    <Text style={[styles.commentUserName, {color: 'black'}]}>
                      {comment.user}
                    </Text>
                  </View>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
                <Text
                  style={[
                    styles.commentTimestamp,
                    {
                      color: color.GRAY,
                    },
                  ]}>
                  {comment.timestamp}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Entrada de Comentario */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Escribe un comentario..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE_GRAY,
  },
  forumEntryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 8,
    backgroundColor: color.GRAY_HARD,
    borderRadius: 6,
    padding: 4,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    marginLeft: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 16,
  },
  forumEntryContent: {
    flex: 1,
    marginLeft: 8,
    padding: 5,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 8,
  },
  commentUserName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentContent: {
    flex: 1,
  },
  commentBubble: {
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  commentText: {
    fontSize: 16,
  },
  commentTimestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end', // Alinea la hora en la parte inferior dentro de la burbuja
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    backgroundColor: 'white',
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: color.GREEN,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  forumText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  likesTextContainer: {
    marginRight: 8,
  },
  likesText: {
    color: color.WHITE,
  },
  likesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  likesButtonText: {
    marginLeft: 8,
    color: color.BLACK,
  },
});
