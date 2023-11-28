import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import color from '@styles/colors';
import ToolBar from '../components/ToolBar';
import {doc, setDoc, getDoc} from 'firebase/firestore';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {firestore} from '../../firebase-config';

const roleOptions = ['Admin', 'Business', 'User'];

const UsersScreen = props => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Cargar usuarios desde Firestore al iniciar la pantalla
  const loadUsers = async () => {
    try {
      const usersCollection = collection(firestore, 'Users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Users data:', usersData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleToggle = async (userId, role) => {
    try {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId
            ? {
                ...user,
                roles: user.roles.includes(role)
                  ? user.roles.filter(existingRole => existingRole !== role)
                  : [...user.roles, role],
              }
            : user,
        ),
      );

      // Obtén los datos existentes del usuario antes de la actualización
      const existingUserData = users.find(user => user.id === userId);

      // Actualizar roles y otros datos en Firestore
      const userDocRef = doc(firestore, 'Users', userId);
      await setDoc(userDocRef, {
        ...existingUserData, // Mantener los datos existentes
        roles: existingUserData.roles.includes(role)
          ? existingUserData.roles.filter(existingRole => existingRole !== role)
          : [...existingUserData.roles, role], // Actualizar solo los roles
      });

      // Recargar datos del usuario después de la actualización en Firestore
      await loadUsers();
    } catch (error) {
      console.error('Error updating roles:', error);
    }
  };

  const isRoleSelected = (userId, role) => {
    const user = users.find(user => user.id === userId);
    return user ? user.roles.includes(role) : false;
  };

  const handleSearch = text => {
    setSearchText(text);
  };

  const handleRoleFilter = role => {
    setSelectedRole(role === selectedRole ? '' : role);
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredUsersWithRole = selectedRole
    ? filteredUsers.filter(user => user.roles.includes(selectedRole))
    : filteredUsers;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.GREEN} translucent={true} />
      <ToolBar
        titulo="Plage Tracker"
        onPressLeft={() => props.navigation.navigate('Main')}
        iconLeft={require('@resources/images/back.png')}
        onPressRight={() => props.navigation.navigate('Settings')}
        iconRight={require('@resources/images/usuario_icon.png')}
      />
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o email"
            value={searchText}
            onChangeText={handleSearch}
            placeholderTextColor={color.BLACK}
          />
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Filtrar por Rol:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {roleOptions.map(role => (
              <TouchableOpacity
                key={role}
                onPress={() => handleRoleFilter(role)}
                style={[
                  styles.filterOption,
                  {
                    backgroundColor:
                      role === selectedRole
                        ? color.GREEN_LIGHT
                        : color.WHITE_GRAY,
                  },
                ]}>
                <Text
                  style={[
                    styles.filterOptionText,
                    {color: role === selectedRole ? color.BLACK : color.BLACK},
                  ]}>
                  {role}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Nombre/Correo</Text>
            <Text style={styles.headerText}>Roles</Text>
          </View>

          {filteredUsersWithRole.map(user => (
            <View key={user.id} style={styles.tableRow}>
              <View style={styles.userInfo}>
                <Text style={styles.rowText}>{user.name}</Text>
                <Text style={styles.rowText}>{user.email}</Text>
              </View>
              <View style={styles.rolesContainer}>
                {roleOptions.map(role => (
                  <TouchableOpacity
                    key={role}
                    onPress={() => handleRoleToggle(user.id, role)}>
                    <View
                      style={[
                        styles.checkboxContainer,
                        isRoleSelected(user.id, role) &&
                          styles.checkboxSelected,
                      ]}>
                      {isRoleSelected(user.id, role) && (
                        <Text style={{fontSize: 20, color: color.WHITE}}>
                          ✓
                        </Text>
                      )}
                      <Text style={styles.checkboxLabel}>{role}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE_GRAY,
  },
  searchFilterContainer: {
    padding: 10,
    backgroundColor: color.GREEN,
    borderBottomWidth: 1,
    borderBottomColor: color.GRAY_HARD,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.WHITE,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: color.WHITE,
    fontSize: 16,
    marginRight: 10,
  },
  filterOption: {
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  filterOptionText: {
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: color.GRAY_HARD,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.BLACK,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: color.GRAY_HARD,
    paddingVertical: 10,
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  rowText: {
    fontSize: 16,
    color: color.BLACK,
  },
  rolesContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 8,
    alignItems: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    borderColor: color.GRAY,
    marginBottom: 4,
  },
  checkboxSelected: {
    backgroundColor: color.GREEN,
    borderColor: color.GREEN,
  },
  checkboxLabel: {
    marginLeft: 5,
    color: color.BLACK,
  },
});

export default UsersScreen;
