import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, Button, View, TextInput, ScrollView, TouchableOpacity,TouchableHighlight,Modal,modalVisible, Keyboard } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';

function HomeScreen({ navigation, route }) {
  // Defining state object
  
  const [getoriginal, setoriginal] = useState('');
  const [getdiscount, setdiscount] = useState('');
  const [getdiscountprice, setdiscountprice] = useState('');
  const [getchecker, setchecker] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [getList, setList] = useState([]);
   var noo="yes";
  const check = () =>{
    if( (getoriginal != '') && (getdiscount != '')){
      
      var d=Number(getdiscount);
        d = d.toFixed(2);
      var o=Number(getoriginal);
      var dp= o- (o * d / 100) ;
      dp = dp.toFixed(2);
      o = o.toFixed(2);


      
      
     
      setoriginal(o);
     setdiscountprice(dp);
      
      
     
    }

  }
  const clear =() =>{
    setdiscount('');
    setoriginal('');
  }
  const addItem = () => {
   
    setList([
      ...getList,
      { key: Math.random().toString(), data: {"original" : getoriginal,"discounted":getdiscountprice,"discount":getdiscount} }
    ]);
    
    Keyboard.dismiss();
  }
  const logic =()=>{
    if(getoriginal != '' && getdiscount != '' && noo == "yes"){
      alert(noo);
      check();
      noo == "no";


    }
  }


  useEffect(() => {
    check()
    // When returning from History Screen Update state
   
      // Reste Parameters
      
    },[getdiscount]
  );

  navigation.setOptions({
    headerRight: () => (
      <View style={{ paddingRight: 10 }}>
        <FontAwesome
          name="history"
          size={24}
          color="blue"
          onPress={() => navigation.navigate('History', { randNum: getList })}
        />
      </View>
    ),
  });

  return (
    
    <View style={styles.container}>
  
  
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter original price"
        onChangeText={text => setoriginal(text)}
        value={getoriginal }
        keyboardType='numeric'
         placeholderTextColor='white'
     
      
      
  
      
  
    
   
        
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter discount"
        onChangeText={text => setdiscount(text) }
        value={getdiscount  < 100 || getdiscount == '' ? getdiscount : "cant be high than 100"}
        keyboardType='numeric'
         placeholderTextColor='white'
      
      />
      <TouchableHighlight
              style={styles.appButtonContainer}
              onPress={() => {
                clear();
              }}
            >
              <Text style={styles.appButtonText}>clear</Text>
            </TouchableHighlight>
     
            <TouchableHighlight
              style={styles.appButtonContainer}
              onPress={() => {
                addItem();
              }}
            >
              <Text style={styles.appButtonText}>Save</Text>
            </TouchableHighlight>
            
            <TouchableHighlight
              style={styles.appButtonContainer1}
           
            >
              <Text style={styles.appButtonText}>Discounted price is {getdiscountprice} </Text>
            </TouchableHighlight>
            
            <TouchableHighlight
              style={styles.appButtonContainer1}
              
            >
              <Text style={styles.appButtonText}> YOU SAVED {getoriginal - getdiscountprice}</Text>
            </TouchableHighlight>
         
   
     
        
        </View>
        </View>
  );
}

function HistoryScreen({ navigation, route }) {
  // Get the data from route and store in local variable
  const getList = route.params.randNum;
  // set the state for the received route data
  const [getNumFromScreen1, setNumForScreen1] = useState(getList);

  // Apply navigation option of the screen here so that we can access component props and members
  navigation.setOptions({
    headerLeft: () => (
      <View style={{ paddingLeft: 10 }}>
        <Ionicons
          name="arrow-back"
          size={32}
          color="black"
          onPress={() =>
            navigation.navigate('DISCOUNT CALCULATOR', { returnNum: getNumFromScreen1 })
          }
        />
      </View>
    ),
  });

  return (
    <View >
        <ScrollView style={styles.scrollview}>
      {getList.map((item, index) =>
     
         <DataTable>
    <DataTable.Header>
      <DataTable.Title>Original</DataTable.Title>
      <DataTable.Title numeric>Discount</DataTable.Title>
      <DataTable.Title numeric>Final Price</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>{item.data.original}</DataTable.Cell>
      <DataTable.Cell numeric>{item.data.discount}</DataTable.Cell>
      <DataTable.Cell numeric>{item.data.discounted}</DataTable.Cell>
    </DataTable.Row>

  
  </DataTable>
      )}
    </ScrollView>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen name="DISCOUNT CALCULATOR" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    marginBottom:10,
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    alignSelf:'flex-start',
    textTransform: 'uppercase',
    
  },

  red:{
    color: 'blue',
    fontSize: 20,
    
 backgroundColor:'lightgrey',
    
    marginTop:10
  },

  scrollviewText: {
    fontSize: 15,
    color: 'white'
  },
  scrollview: {
    backgroundColor:"lightblue",
    
    width: '100%',
  
  
  },
  scrollviewItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: 'black',
    alignSelf: "center",
    padding: 10,
    margin: 5,
    width: '80%',
    borderRadius: 10
  },
  title: {
    fontSize: 20,
    color: 'blue'
  },
  container: {
    flex: 1,
    backgroundColor: '#008080',
    alignItems: 'center',
    paddingTop: 40
  },
  inputContainer: {
    paddingTop:20,
    flexDirection: "column",
    width: '90%',
    justifyContent: "space-between",
    alignItems: "center"
  },
  textInput: {
    
    borderColor: 'black',
    borderWidth: 2,
    borderBottomWidth: 2,
    width: '70%',
    borderRadius: 50,
    fontSize: 16,
    padding: 20,
    marginBottom:10
  }
});

