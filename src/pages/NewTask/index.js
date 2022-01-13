import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Picker } from "react-native";
import db from '../../config/firebaseconfig';
import style from "./style";
import { getFirestore, collection, getDocs, setDoc,doc } from 'firebase/firestore/lite';
export default function NewTask({ navigation }, props){
    const [description, setDescription] = useState(null);
    const [selectedValue, setSelectedValue] = useState(false);
    
    async function  addTask(db, description,selectedValue){
            const id = generate(30)
            console.log(selectedValue)

          try{
              const docRef = await setDoc(doc(db, 'Tasks', id), {
                descriptions: description,
                status: selectedValue,
                id: id
              });
              navigation.navigate("Task")
              //console.log("Document written with ID: ");
          } catch (e){
            console.error("Error adding document: ", e);
          }
    }
    function generate(count) {
      var founded = false,
          ym = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          str = '';
        for (let index = 0; index < count; index++) {
            const numInt =getRandomInt(0,61);
            const value = ym[numInt];
            str+= value
          
        }
      
      return str;
    }
    function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    }
  
    return(
        <View style={style.container}>
            <Text style={style.label}>Description</Text>
            <TextInput
            style={style.input}
            placeholder="Ex: estudar javascript"
            onChangeText={setDescription}
            value={description}
            />
            <Text style={style.label}>Status</Text>
            <Picker 
              selectedValue={selectedValue}
              style={style.picker}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Feito" value={true} />
              <Picker.Item label="Para fazer" value={false} />
            </Picker>
            
            
            <TouchableOpacity 
            style={style.buttonNewTask}
            onPress={()=>{
                addTask(db, description, selectedValue)
            }}
            >
            <Text style={style.iconButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={style.buttonNewTask2}
            onPress={()=>{
                navigation.navigate("Task")
            }}
            >
            <Text style={style.iconButton}>voltar</Text>
            </TouchableOpacity>
      </View>
    )
}