import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// import Icon from 'react-native-vector-icons/FontAwesome'; // Ajusta la importación según el conjunto de iconos que estés utilizando
import color from '@styles/colors';
import ToolBar from '../components/ToolBar';

const mockUserData = [
  {id: 1, name: 'Usuario 1', email: 'usuario1@example.com', roles: ['Usuario']},
  {id: 2, name: 'Usuario 2', email: 'usuario2@example.com', roles: ['Empresa']},
  // Agrega más usuarios según sea necesario
];

const roleOptions = ['Administrador', 'Usuario', 'Empresa'];

const UsersScreen = props => {
  const [users, setUsers] = useState(mockUserData);
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleToggle = (userId, role) => {
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
        onPressLeft={() => props.navigation.navigate('Settings')}
        iconLeft={require('@resources/images/configuraciones_icon.png')}
        onPressRight={() => props.navigation.navigate('Settings')}
        iconRight={require('@resources/images/usuario_icon.png')}
      />
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchInputContainer}>
          {/* Ajusta la importación y el nombre del ícono según la librería que estés utilizando */}
          {/* <Icon name="search" size={20} color={color.GRAY} /> */}
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
                      role === selectedRole ? color.GREEN : color.WHITE_GRAY,
                  },
                ]}>
                <Text
                  style={[
                    styles.filterOptionText,
                    {color: role === selectedRole ? color.WHITE : color.BLACK},
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
            {/* <Text style={styles.headerText}>Correo Electrónico</Text> */}
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
