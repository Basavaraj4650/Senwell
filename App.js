import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Modal, Alert, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-paper';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

const App = () => {

  const employees = [
    {
      name: "Employee1",
      equipmentName: "UTV",
      dueDate: "21/2/23",
      WOnumber: 2589,
      EquipmentNumber: 258963,
      JobNumber: 2258
    },
    {
      name: "Employee2",
      equipmentName: "YUI",
      dueDate: "18/1/25",
      WOnumber: 2589,
      EquipmentNumber: 258963,
      JobNumber: 2258
    },
    {
      name: "Employee3",
      equipmentName: "UPO",
      dueDate: "01/8/20",
      WOnumber: 2589,
      EquipmentNumber: 258963,
      JobNumber: 2258
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Daily');
  const [isEmployeeListVisible, setIsEmployeeListVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [cardOpen, setCardOpen] = useState(false);


  function openCalendar() {
    setIsOpen(!isOpen);
  }

  function cardOpenClose() {
    setCardOpen(true);
  }

  const handleToggle = (option) => {
    setSelectedOption(option);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setIsEmployeeListVisible(false);
  };

  const submit = () => {
    Alert.alert(
      'Success',
      'Submitted Successfully',
      [
        {
          text: 'OK', onPress: () => setCardOpen(false)
        }
      ],
      { cancelable: false }
    );
  };

  const renderEmployeeList = () => {
    return (
      <Modal
        transparent={true}
        visible={isEmployeeListVisible}
        onRequestClose={() => setIsEmployeeListVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Card style={styles.modalContent}>
            {employees.map((employee, index) => (
              <TouchableOpacity key={index} onPress={() => handleEmployeeSelect(employee)}>
                <Text style={styles.modalItem}>{employee.name}</Text>
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>

      {
        cardOpen ?
          <View style={styles.container
          } >
            <StatusBar backgroundColor="#ff6700" />
            <Card style={styles.card}>
              <View style={styles.header}>
                <FontAwesome name="align-justify" size={25} color="black" />
                <Text style={styles.headerText}>Content</Text>
                <TouchableOpacity onPress={openCalendar}>
                  <FontAwesome name="calendar" size={25} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.menu}>
                <TouchableOpacity
                  style={[styles.menuItem, selectedOption === 'Daily' ? styles.selectedMenuItem : styles.unselectedMenuItem]}
                  onPress={() => handleToggle('Daily')}
                >
                  <Text style={styles.menuText}>Daily</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.menuItem, selectedOption === 'Weekly' ? styles.selectedMenuItem : styles.unselectedMenuItem]}
                  onPress={() => handleToggle('Weekly')}
                >
                  <Text style={styles.menuText}>Weekly</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.employee}>
                <Text style={styles.employeeText}>Select employee</Text>
              </View>
              <View style={{
                width: '100%', height: 50,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'grey',
                marginBottom: 10,
                padding: 10,
                marginTop: 10
              }}>
                {
                  selectedEmployee === '' ?
                    <Text style={{ top: 4 }}>Select a Employee</Text>
                    :
                    <Text style={{ top: 4 }}>{selectedEmployee.name}</Text>
                }
                <TouchableOpacity
                  style={{
                    left: 270,
                    bottom: 20
                  }}
                  onPress={() => setIsEmployeeListVisible(!isEmployeeListVisible)}
                >
                  <FontAwesome name="chevron-down" size={25} color="grey" />
                </TouchableOpacity>
              </View>
              {isEmployeeListVisible && renderEmployeeList()}
              {isOpen &&
                <View style={styles.calendar}>
                  <Calendar
                    initialDate="2022-12-01"
                    style={styles.calendarStyle}
                    theme={{
                      'stylesheet.calendar.header': {
                        headerContainer: {
                          flexDirection: 'row',
                          backgroundColor: '#eee',
                          borderRadius: 12
                        }
                      }
                    }}
                  />
                </View>
              }
              <FontAwesome name="search" size={22} color="grey" style={{
                top: 17,
                left: 285
              }}
              />
              <TextInput
                style={[styles.searchInput, { textAlign: 'left', paddingLeft: 10 }]}
                placeholder='Search By Job #, JSO#/truck/Experiment'
              />
              <View style={styles.assignTo}>
                <Text style={styles.assignToText}>Work Orders Assign To :</Text>
                <Text style={{ bottom: 15, left: 12 }}>{selectedEmployee.name}</Text>
              </View>
              <Card style={{
                backgroundColor: '#ccedd7',
                borderRadius: 10,
                height: 100,
                bottom: 10
              }}>
                <View style={{}}>
                  <View style={{ width: '70%', height: 25 }}>
                    <Text style={{
                      fontWeight: 'bold',
                      left: 10,
                      top: 5
                    }}>New Equipment Setup :</Text>
                    <Text style={{
                      bottom: 13,
                      left: 168
                    }}>{selectedEmployee.equipmentName}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={submit}
                    >
                      <FontAwesome name="telegram" size={18} color="#556b2f" style={{
                        left: 280,
                        width: '12%',
                        height: 18,
                        bottom: 12
                      }} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text style={{
                    fontWeight: 'bold',
                    left: 10,
                    bottom: 10
                  }}>Due Date :</Text>
                  <Text style={{
                    bottom: 28,
                    left: 90
                  }}>{selectedEmployee.dueDate}</Text>
                </View>
                <View>
                  <Text style={{
                    fontWeight: 'bold',
                    left: 10,
                    bottom: 25
                  }}>WO # :</Text>
                  <Text style={{
                    bottom: 45,
                    left: 90
                  }}>{selectedEmployee.WOnumber}</Text>
                </View>
                <View>
                  <Text style={{
                    fontWeight: 'bold',
                    left: 10,
                    bottom: 43
                  }}>Equipment :</Text>
                  <Text style={{
                    bottom: 63,
                    left: 90
                  }}>{selectedEmployee.EquipmentNumber}</Text>
                </View>
              </Card>
            </Card>
          </View > :
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontWeight: "bold",
              fontSize: 15,
              marginBottom: 20
            }}>
              Click The Below Button To Show Employee Card
            </Text>
            <Button
              title='Click Here'
              onPress={cardOpenClose}
            />
          </View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    width: '90%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 18
  },
  menu: {
    flexDirection: "row",
    width: '100%',
    top: 30
  },
  menuItem: {
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 37,
    borderRadius: 5
  },
  menuText: {
    fontWeight: 'bold'
  },
  employee: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50
  },
  employeeText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  },
  employeeIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 5
  },
  calendar: {
    marginBottom: 5
  },
  calendarStyle: {
    borderRadius: 5,
    elevation: 5,
    borderWidth: 4,
    borderColor: 'rgba(100, 100, 100, 0.2)'
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    marginBottom: 5,
    padding: 10,
    bottom: 20
  },
  assignTo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  assignToText: {
    fontWeight: 'bold',
    fontSize: 20,
    bottom: 15,
    left: 5,
    color: 'black'
  },
  selectedMenuItem: {
    backgroundColor: '#f94d00'
  },
  unselectedMenuItem: {
    backgroundColor: '#eab785'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },
  modalItem: {
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 10
  }
});

export default App;
