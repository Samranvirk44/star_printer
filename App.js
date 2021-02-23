//import liraries
import React, { Component, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StarPRNT } from 'react-native-star-prnt';

// create a component
const MyComponent = () => {
  async function portDiscovery() {
    console.log('port finding')
   
//console[{modelName: "TSP700II", macAddress: "00:00:00:00", portName: "TCP:192.168.1.1"}]
 try {
      let printers = await StarPRNT.portDiscovery('All');  //used for discover printers
      console.log('printers--->',printers);
       let prineter=[{modelName: "TSP700II", macAddress: "00:00:00:00", portName: "TCP:192.168.1.1"}]
      // console.log(prineter[0].modelName)
      // console.log(prineter[0].macAddress)
      // console.log(prineter[0].portName)

      let   printObj = {
        text:"Star Clothing Boutique\n123 Star Road\nCity, State 12345\n\n",
        cutReceipt:"true",
        openCashDrawer: "true"
    }
    if(printers.length!=0){
    StarPRNT.printRawText(printers[0].portName,printers[0].modelName, printObj, function(result){
            console.log(result);
        },
        function(error) {
            console.log(error);
        });
      }
      else{
        alert('Printer is not connected')
      }
    } catch (e) {
      console.error(e);
    }
  
 
   
  }
    const [check, setcheck] = useState(false);
    return (
       <View>
         <TouchableOpacity onPress={()=>portDiscovery()} style={{height:50,width:'70%',borderRadius:10,marginTop:'20%',alignSelf:'center',backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>
         <Text>Clinck on this for print</Text>
         </TouchableOpacity>
       </View>

    );
};



//make this component available to the app
export default MyComponent;
