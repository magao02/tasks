import React, { useState, useEffect} from "react"
import { getFirestore,query , collection, getDocs, deleteDoc, doc,where } from 'firebase/firestore/lite';
import {SafeareaView, View, Text, TouchableOpacity, FlatList } from "react-native"
import db from "../../config/firebaseconfig"
import { FontAwesome } from "@expo/vector-icons";
import styles from "./style";
export default function Task({ navigation }){
    const [task, setTask] = useState([])
    
     function  deleteTask(id, db){
        deleteDoc(doc(db, "Tasks", id))

    }
    let cityList =[]
    useEffect(()=>{
        
        
        async  function getTasks(db) {
            
            const tasksCol = collection(db, 'Tasks');
            const tasksSnapshot = await getDocs(tasksCol);
            const taskList = tasksSnapshot.docs.map(doc => doc.data());
              
            setTask(taskList)
            return taskList
          }
          
        const cityLis = getTasks(db, false)
        cityList = cityLis
        
    }, [cityList])
    
    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={task}
                renderItem={( { item } )=>{
                    return(
                        
                        <View style={styles.Tasks}>
                            <TouchableOpacity
                                style={styles.deleteTask}
                                onPress={()=>{
                                    deleteTask(item.id, db)
                                }}  >
                            <FontAwesome 
                            name="trash"
                            size={23}
                            color = "#F92e6A"
                            >
                            </FontAwesome>  
                            </TouchableOpacity>
                            <Text
                                style={styles.DescriptionTask}
                                onPress={()=>
                                    navigation.navigate("Details",{
                                        id: item.id,
                                        descriptions: item.descriptions,
                                    })
                                    
                                }
                            >
                                {item.descriptions}
                                
                            </Text>  

                        </View>
                    )
                }}
            ></FlatList>
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("NewTask")}
            >
            <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
           
           
        </View>
    )
}