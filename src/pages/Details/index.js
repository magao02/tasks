import React, { useState } from "react"
import {View, Text, TextInput, TouchableOpacity}  from "react-native"
import { getFirestore,collection, doc, updateDoc } from "firebase/firestore/lite";

import db from "../../config/firebaseconfig"
import styles from "./style"

export default function Details({navigation, route}){
    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
    const idTask = route.params.id;
    
     function editTask(db, description, id) {
        const col =  collection(db, 'Tasks');
         const refs = doc(db, 'Tasks', id);
        updateDoc(refs,{
            descriptions: description
        })
    }

    return(
        <View style={styles.container}>
        <Text style={styles.label}>Description</Text>
        <TextInput
        style={styles.input}
        placeholder="Ex: estudar javascript"
        onChangeText={setDescriptionEdit}
        value={descriptionEdit}
        />
        <TouchableOpacity 
          style={styles.buttonNewTask}
          onPress={()=>{
            editTask(db, descriptionEdit, idTask)
          }}
        >
          <Text style={styles.iconButton}>Save</Text>
        </TouchableOpacity>
      </View>
  
    )
}