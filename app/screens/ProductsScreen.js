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
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {UserContext} from '@context/UserContext';
import {ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

function ProductScreen(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editedProductId, setEditedProductId] = useState(null);
  const [newProductData, setNewProductData] = useState({
    name: '',
    description: '',
    price: 0,
    createdAt: serverTimestamp(),
    likes: 0,
    creator: '',
    emoji: '',
  });
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [login, loginAction, auth] = useContext(UserContext);

  const filteredProductData = productData.filter(product =>
    Object.values(product).some(
      field =>
        field !== undefined &&
        field !== null &&
        field.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const formatTimestamp = timestamp => {
    if (!timestamp || !timestamp.toDate) return '';

    const date = timestamp.toDate();
    if (!date) return '';

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return `${formattedDate}, ${formattedTime}`;
  };

  const fetchData = async () => {
    try {
      const data = await getDocs(collection(getFirestore(), 'Products'));
      const products = data.docs.map(doc => ({
        name: doc.data().name,
        description: doc.data().description,
        price: doc.data().price,
        createdAt: doc.data().createdAt,
        likes: doc.data().likes,
        creator: doc.data().creator,
        emoji: doc.data().emoji,
        id: doc.id,
      }));
      setProductData(products);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener datos de productos:', error);
    }
  };

  useEffect(() => {
    const focusListener = props.navigation.addListener('didFocus', () => {
      fetchData();
    });

    return () => {
      // Remove the event listener when the component is unmounted
      focusListener.remove();
    };
  }, []); // Empty dependency array means it runs once on mount

  const handleAddProductEntry = () => {
    setIsAddingProduct(true);
    setNewProductData({
      name: '',
      description: '',
      price: 0,
      createdAt: serverTimestamp(),
      likes: 0,
      creator: '',
      emoji: '',
    });
  };

  const handleEditProduct = (id, product) => {
    setIsEditingProduct(true);
    setEditedProductId(id);
    setNewProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
      likes: product.likes,
      creator: product.creator,
      emoji: product.emoji,
    });
  };

  const closeForm = () => {
    setIsAddingProduct(false);
    setIsEditingProduct(false);
    setEditedProductId(null);
    setNewProductData({
      name: '',
      description: '',
      price: 0,
      createdAt: serverTimestamp(),
      likes: 0,
      creator: '',
      emoji: '❓',
    });
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        name: newProductData.name,
        description: newProductData.description,
        price: newProductData.price,
        createdAt: newProductData.createdAt,
        likes: newProductData.likes,
        creator: newProductData.creator,
        emoji: newProductData.emoji,
      };

      if (isEditingProduct) {
        // Actualizar el producto existente en la colección 'Products' en Firebase
        const productRef = doc(getFirestore(), 'Products', editedProductId);
        await updateDoc(productRef, productData);

        // Actualizar el estado local si es necesario (opcional)
        setProductData(prevProductData =>
          prevProductData.map(product =>
            product.id === editedProductId
              ? {...product, ...productData}
              : product,
          ),
        );
      } else {
        // Agregar el nuevo producto a la colección 'Products' en Firebase
        const docRef = await addDoc(
          collection(getFirestore(), 'Products'),
          productData,
        );

        // Actualizar el estado local si es necesario (opcional)
        setProductData(prevProductData => [
          ...prevProductData,
          {...productData, id: docRef.id},
        ]);
      }
    } catch (error) {
      console.error('Error al agregar/editar el producto:', error);
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
            titulo="Productos"
            onPressLeft={() => props.navigation.navigate('Main')}
            iconLeft={require('@resources/images/back.png')}
            onPressRight={() => props.navigation.navigate('Settings')}
            iconRight={require('@resources/images/usuario_icon.png')}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar producto"
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
            placeholderTextColor={color.BLACK}
          />
          {filteredProductData.map((product, index) => (
            <TouchableOpacity
              // style={styles.card}
              key={index}
              onPress={() => handleEditProduct(product.id, product)}>
              {/* <View style={styles.cardContent}> */}

              <View style={styles.card}>
                <View style={styles.infoContainer}>
                  <View style={styles.emojiContainer}>
                    <Text style={styles.emoji}>{product.emoji ?? '❓'}</Text>

                    <Text style={styles.likesCount}>₡ {product.price}</Text>
                  </View>
                  <View style={styles.likesContainer}>
                    <View>
                      <Text style={styles.title}>{product.name}</Text>
                    </View>
                    <View>
                      <Text style={[styles.description, styles.centeredText]}>
                        {product.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* </View> */}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.fab} onPress={handleAddProductEntry}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={isAddingProduct || isEditingProduct}
        animationType="slide"
        transparent={true}
        onRequestClose={closeForm}>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.formHeader}>
              {isEditingProduct ? 'Editar producto' : 'Agregar nuevo producto'}
            </Text>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Nombre"
              value={newProductData.name}
              onChangeText={text =>
                setNewProductData({
                  ...newProductData,
                  name: text,
                })
              }
              placeholderTextColor={color.BLACK}
            />
            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={styles.formInputArea}
              placeholder="Descripción"
              value={newProductData.description}
              onChangeText={text =>
                setNewProductData({
                  ...newProductData,
                  description: text,
                })
              }
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={color.BLACK}
            />
            <Text style={styles.label}>Precio:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Precio"
              value={newProductData.price.toString()}
              onChangeText={text =>
                setNewProductData({
                  ...newProductData,
                  price: parseFloat(text) || 0,
                })
              }
              keyboardType="numeric"
              placeholderTextColor={color.BLACK}
            />
            {/* Sección para seleccionar el emoji */}
            <Text style={styles.label}>Emoji:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Emoji"
              value={newProductData.emoji}
              onChangeText={text =>
                setNewProductData({
                  ...newProductData,
                  emoji: text,
                })
              }
              placeholderTextColor={color.BLACK}
            />
            {/* Vista previa del emoji */}
            {newProductData.emoji && (
              <Text style={styles.emoji}>{newProductData.emoji}</Text>
            )}
            <View style={styles.buttonRow}>
              <Button
                title="Cancelar"
                onPress={closeForm}
                style={styles.button}
                color={color.RED}
              />
              <Button
                title={
                  isEditingProduct ? 'Guardar cambios' : 'Agregar Producto'
                }
                onPress={handleSubmit}
                style={styles.button}
                color={color.GREEN}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: 'black',
    textAlign: 'justify',
    maxWidth: '70%', // Ajusta según tus preferencias
  },

  centeredText: {
    textAlign: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: color.GREEN_SKY,
    borderRadius: 8,
    margin: 5,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '80%', // Ancho de la pantalla
    alignSelf: 'center', // Para centrar la tarjeta
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    width: '80%',
    backgroundColor: color.GREEN_SKY,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
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
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    color: color.BLACK,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  emojiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60,
  },
  creator: {
    fontSize: 13,
    color: 'darkgray',
  },
  info: {
    fontSize: 13,
    color: 'black',
    marginRight: 10,
  },
  description: {
    fontSize: 14,
    color: 'black',
    maxWidth: 100,
  },
  likesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  firstContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 100,
    maxWidth: 100,
  },
  likesCount: {
    marginLeft: 5,
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  previewEmoji: {
    fontSize: 20,
  },
});

export default ProductScreen;
