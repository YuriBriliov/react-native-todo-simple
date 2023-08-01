import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { styles } from './App.style'

const Data = [
  {
    id: '1',
    title: 'coding1',
    completed: false,
    color: '#EBC58C'
  },
  {
    id: '2',
    title: 'sleeping',
    completed: false,
    color: '#EBC58C'
  },
  {
    id: '3',
    title: 'working',
    completed: false,
    color: '#EBC58C'
  },
]

export default function App() {

  const [items, setItems] = useState(Data);
  const [text, setText] = useState('')
  const [isModalVisible, setIsModalVeisble] = useState(false)

  const addNewTodo = () => {
    let newTodo = {
      id: items.length + 1,
      title: text,
      completed: false,
      color: '#DF5E5E'
    }
    setItems([...items, newTodo])
    setText('')
    setIsModalVeisble(false)
  }

  const markItemCompleted = (item) => {
    const indexItem = items.findIndex(currItem => currItem.id === item.id);

    if (indexItem !== -1) {
      const updatedList = [...items]
      updatedList[indexItem] = {...items[indexItem], completed: true}
      setItems(updatedList)
    }
  }

  const TodoItes = (props) => {
    return (
      <TouchableOpacity style={[styles.item, {backgroundColor: props.item.color}]} onPress={() => markItemCompleted(props.item)}>
        <Text style={props.item.completed ? styles.itemTextCompleted : styles.itemText}>
          {props.item.title}
        </Text>
      </TouchableOpacity>
    )
  }


  const renderAddButton = () => {
    return(
      <TouchableOpacity onPress={()=>{setIsModalVeisble(!isModalVisible)}}>
        <View style={styles.icon}>
          <Ionicons name='add' size={34} color='black' />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Modal visible={isModalVisible} transparent={true} onRequestClose={()=>{setIsModalVeisble(!isModalVisible)}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setText(text)}
              value={text}
            />
            <Button title="Add todo" onPress={addNewTodo} />
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
      <FlatList
        style={styles.list}
        data={items}
        renderItem={({ item }) => <TodoItes item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderAddButton}
      />
    </SafeAreaView>
  );
}