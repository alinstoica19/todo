import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';

// Componenta principală App.
const App = () => {
  // Starea 'tasks' stochează lista de sarcini.
  // Fiecare sarcină este un obiect cu un 'id' și o 'value'.
  const [tasks, setTasks] = useState([]);


  const [currentTask, setCurrentTask] = useState('');

  // 'selectedTaskIds' este un set care stochează ID-urile sarcinilor selectate.
  const [selectedTaskIds, setSelectedTaskIds] = useState(new Set());

  // Funcția pentru adăugarea unei noi sarcini.
  const addTaskHandler = () => {
    // Previne adăugarea unei sarcini goale.
    if (currentTask.trim().length === 0) {
      return;
    }
    // Adaugă noua sarcină la lista existentă de sarcini.
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Math.random().toString(), value: currentTask }
    ]);
 
    setCurrentTask('');
    Keyboard.dismiss();
  };

  // Funcția pentru ștergerea unei sarcini.
  const deleteTaskHandler = (taskId) => {
    // Elimină sarcina cu ID-ul specificat din lista de sarcini.
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
    // Elimină ID-ul sarcinii din setul de sarcini selectate.
    setSelectedTaskIds((currentSelectedIds) => {
      const updatedSelectedIds = new Set(currentSelectedIds);
      updatedSelectedIds.delete(taskId);
      return updatedSelectedIds;
    });
  };

  // Funcția pentru selectarea sau deselectarea unei sarcini.
  const selectTaskHandler = (taskId) => {
 
    const newSelectedTaskIds = new Set(selectedTaskIds);
    
    if (newSelectedTaskIds.has(taskId)) {
      newSelectedTaskIds.delete(taskId);
    } else {
      newSelectedTaskIds.add(taskId);
    }
    // Actualizează starea cu noul set de sarcini selectate.
    setSelectedTaskIds(newSelectedTaskIds);
  };

  // Funcția pentru redarea fiecărui element din lista de sarcini.
  const renderItem = ({ item }) => {
    // Verifică dacă sarcina curentă este selectată.
    const itemSelected = selectedTaskIds.has(item.id);

    return (
      <View style={styles.taskItem}>
        {/* Checkbox pentru selectarea/deselectarea unei sarcini */}
        <TouchableOpacity onPress={() => selectTaskHandler(item.id)} style={styles.taskCheckbox}>
          {itemSelected && <View style={styles.taskCheckboxSelected} />}
        </TouchableOpacity>
        {/* Textul sarcinii, cu stil diferit dacă este selectată */}
        <Text style={[styles.taskItemText, itemSelected ? styles.taskItemTextSelected : null]}>
          {item.value}
        </Text>
        {/* Butonul pentru ștergerea sarcinii */}
        <TouchableOpacity onPress={() => deleteTaskHandler(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={styles.screen}>
      {/* Antetul aplicației */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hello, Student</Text>
        <Text style={styles.dateText}>12 Dec 23</Text>
      </View>
      {/* Titlul secțiunii de sarcini */}
      <Text style={styles.tasksTitle}>Tasks</Text>
      {/* Lista de sarcini */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* Câmpul de text și butonul pentru adăugarea unei noi sarcini */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your next task here..."
          style={styles.input}
          onChangeText={setCurrentTask}
          value={currentTask}
          onSubmitEditing={addTaskHandler}
        />
        <TouchableOpacity onPress={addTaskHandler} style={styles.addButton}>
          <Text style={styles.addButtonText}>ADD TASK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


// Stilurile pentru componenta.
const styles = StyleSheet.create({
  screen: {
    padding: 30,
    backgroundColor: '#f4f4f8',
    height: '100%',
  },
  header: {
    backgroundColor: '#5e0acc',
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'white',
    fontSize: 16,
  },
  tasksTitle: {
    fontSize: 22,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  taskCheckbox: {
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 5,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5e0acc',
  },
  taskCheckboxSelected: {
    width: 12,
    height: 12,
    backgroundColor: '#5e0acc',
  },
  taskItemText: {
    flex: 1,
    marginHorizontal: 8,
  },
  taskItemTextSelected: {
    textDecorationLine: 'line-through',
    color: '#d3d3d3',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#5e0acc',
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;


