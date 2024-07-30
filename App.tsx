import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {onEditData, onSaveData} from './src/utils/utils';
import {database} from './src/model/database';
import {styles} from './styles';

function App() {
  const [isVisible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [skills, setSkills] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [id, setId] = useState();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    getData();
  }, [refresh]);
  const getData = async () => {
    const allEmp = await database.get('employees').query().fetch();
    const tempEmp:any = [];
    allEmp.forEach(item => {
      tempEmp.push(item._raw);
    });
    setData(tempEmp);
  };

  const onAdd = () => {
    setIsAdd(true);
    setVisible(true);
  };
  const onRecordUpdate = () => {
    if (!validate()) return;

    const postData = {
      first_name: firstName,
      last_name: lastName,
      skills: skills,
    };
    onEditData(postData, id);
    clear();
    setVisible(!isVisible);
    setRefresh(!refresh);
  };
  const validate = () => {
    if (!firstName || !lastName || !skills) {
      setShowError(true);
      return false;
    }
    setShowError(false);
    return true;
  };
  const onRecordAdd = () => {
    if (!validate()) return;
    const postData = {
      first_name: firstName,
      last_name: lastName,
      skills: skills,
    };
    onSaveData(postData);
    clear();
    setVisible(!isVisible);
    setRefresh(!refresh);
  };
  const clear = () => {
    setFirstName('');
    setLastName('');
    setSkills('');
  };
  const onEdit = (item:any) => {
    setId(item.id);
    setIsAdd(false);
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setSkills(item.skills);
    setVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Employees</Text>
        <TouchableOpacity onPress={() => onAdd()} style={styles.btnAdd}>
          <Text style={styles.addEmpBtn}>Add Employee</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flex}>
        <FlatList
          data={data}
          renderItem={item => (
            <View style={styles.itemView}>
              <Text
                style={
                  styles.itemText
                }>{`${item.item.first_name} ${item.item.last_name}`}</Text>
              <TouchableOpacity onPress={() => onEdit(item.item)}>
                <Text style={styles.editBtn}>{'Edit'}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => `${item}-${Math.random()}`}
        />
      </View>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={isVisible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        {/*All views of Modal*/}
        <View style={styles.modalContainer}>
          <View style={styles.rowConatiner}>
            <Text style={styles.optionBtn}>
              {isAdd ? 'Add Empoyee' : 'Update'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                clear();
                setIsAdd(true);
                setVisible(false);
              }}
              style={styles.canelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewBg} />

          <TextInput
            value={firstName}
            onChangeText={text => setFirstName(text)}
            placeholder="First Name"
            style={styles.input}
          />
          <TextInput
            value={lastName}
            onChangeText={text => setLastName(text)}
            placeholder="Last Name"
            style={styles.input}
          />
          <TextInput
            value={skills}
            onChangeText={text => setSkills(text)}
            placeholder="Skil"
            style={styles.input}
          />
          {showError ? (
            <Text style={styles.error}>All fields are mandatory!</Text>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              isAdd ? onRecordAdd() : onRecordUpdate();
            }}
            style={styles.bottomBtnContainer}>
            <Text style={styles.bottomBtnText}>{isAdd ? 'Add' : 'Update'}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default App;
