//import liraries
import React, { Component, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, Platform, NativeAppEventEmitter } from 'react-native';
import { StarPRNT } from 'react-native-star-prnt';
import BleManager from 'react-native-ble-manager';
import img from './assents/img.jpg'
// create a component
const MyComponent = () => {
  const [printerss, setprinters] = useState([{ modelName: "" }]);
  const [portt, setportt] = useState("");
  const [connectt, setconn] = useState("");
  const [printt, setprintt] = useState("");

  async function checkstatus() {
    try {
      let status = await StarPRNT.checkStatus("TCP:00.11.62.18:30:7C", "EscPosMobile")
      alert(status)
      console.log(status)
    }
    catch (err) {
      alert(err)
      console.log(err)
    }
  }
  async function checkbluetooth() {
    console.log('-------------->')
    NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral', (data) => {
      console.log(data) // Name of peripheral device
    });

    let data = BleManager.start({ showAlert: false });
    console.log(data)

    // BleManager.scan([], 30)
  }
  async function portDiscovery() {
    console.log('port finding')

    //console[{modelName: "TSP700II", macAddress: "00:00:00:00", portName: "TCP:192.168.1.1"}]
    try {
      let printers = await StarPRNT.portDiscovery('All');  //used for discover printers
      console.log('printers--->', printers);
      console.log(printers[0].macAddress)
      console.log(printers[0].modelName)
      console.log(printers[0].portName)

      setprinters(printers);
      //let prineter = [{ modelName: "TSP700II", macAddress: "00:00:00:00", portName: "TCP:192.168.1.1" }]
      // console.log(prineter[0].modelName)
      // console.log(prineter[0].macAddress)
      // console.log(prineter[0].portName)

      // let printObj = {
      //   text: "Star Clothing Boutique\n123 Star Road\nCity, State 12345\n\n",
      //   cutReceipt: "true",
      //   openCashDrawer: "true"
      // }
      if (printers.length != 0) {

        StarPRNT.connect(printers[0].portName, "StarPRNT", false)
          .then(res => {
            console.log("connected ---=>", res);

            let commands = [];
            commands.push({
              appendBitmap:img});
            commands.push({ appendCutPaper: StarPRNT.CutPaperAction.PartialCutWithFeed });
          console.log(commands)
            StarPRNT.print("StarPRNT", commands,printers[0].portName)
              .then(result => {
                console.log(result)
              })
              .catch(err => console.log("err=>", err))


            // setconn(res);
            // StarPRNT.print("StarPRNT", [{ append: "text" }, { "openCashDrawer": 1 }], printers[0].portName)
            //   .then(print => { console.log("print=>", print)
            // setprintt(print) })
            //   .catch(err => console.log("print err=>", err))
          })
          .catch(err => console.log("err=>", err))



        //     StarPRNT.printRawText(printers[0].portName,printers[0].modelName, printObj, function(result){

        // StarPRNT.printRawText("BT:00:11:62:18:30:7C", "BT:TSP100-H1140", printObj, function (result) {
        //   console.log("result=>", result);
        //   setoutput(result)
        // },
        //   function (error) {
        //     console.log("error=>", error);
        //     setoutput(error)
        //   });
        StarPRNT.disconnect(printers[0].portName, "StarPRNT", false)

      }
      else {
        alert('Printer is not connected')
      }
    } catch (e) {
      console.error("e=>", e);
    }



  }
  return (
    <View>
      <TouchableOpacity onPress={() => portDiscovery()} style={{ height: 50, width: '70%', borderRadius: 10, marginTop: '20%', alignSelf: 'center', backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Clinck on this for print</Text>
      </TouchableOpacity>
      {/* <Text>Modal Name   {printerss[0].modelName}</Text>
      <Text>Connected    {connectt}</Text>
      <Text>Print        {printt}</Text> */}
      <TouchableOpacity onPress={() => checkstatus()} style={{ height: 50, width: '70%', borderRadius: 10, marginTop: '20%', alignSelf: 'center', backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
        <Text>check status of printer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => checkbluetooth()} style={{ height: 50, width: '70%', borderRadius: 10, marginTop: '20%', alignSelf: 'center', backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
        <Text>check bluetooth</Text>
      </TouchableOpacity>
    </View>

  );
};



//make this component available to the app
export default MyComponent;
