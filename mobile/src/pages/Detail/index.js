import React from 'react';
import {Feather} from '@expo/vector-icons';
import {View, Image, Text,TouchableOpacity,Linking} from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png'
import {useNavigation,useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const mensagem = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajuda no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}.`;
    
    function RetornToIncident(){
        navigation.navigate('Incidents');
    }

    function sendemail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: mensagem,

        })
    }
    function sendwhats(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${mensagem}`);

    }
    return(
        <View styles= {styles.container}>
             <View style = { styles.header}>
              <Image source = {logoImg}/>
              <TouchableOpacity onPress= {RetornToIncident}>
                  <Feather name="arrow-left" size={28} color= '#E82041'/>
              </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style= {[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style= {styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style= {styles.incidentProperty}>Caso:</Text>
                <Text style= {styles.incidentValue}>{incident.title}</Text>

                <Text style= {styles.incidentProperty}>Valor:</Text>
                <Text style= {styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
            </View>

            <View style= {styles.contactbox}>
                <Text style={styles.herotitle}>
                    Salve o dia!
                </Text>
                <Text style={styles.herotitle}>
                    Seja o herói desse caso!
                </Text>
                
                <Text style={styles.herodescription}>
                    Entre em contato:
                </Text>
                
                <View style = {styles.actions}>
                    <TouchableOpacity style = {styles.action} onPress = {sendwhats} >
                        <Text style={styles.text}>
                            Whatsapp
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style = {styles.action} onPress = {sendemail}>
                        <Text style ={styles.text}>
                            E-mail
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );    
}