import React from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
    return (
        <React.Fragment>
            <LinearGradient colors={['#e94057', '#ff1493', '#b000af', '#3f0081']} style={{flex: 1, width: '100%'}}>
                <View style={styles.headerView}>
                    <TouchableOpacity style={styles.addButton} onPress={this.onPress}>
                        <Text style={styles.titleText}>+</Text>
                    </TouchableOpacity>

                    <Text style={styles.titleText}>Your Spellistas</Text>
                </View>

                <View style={styles.bodyView}>
                    <Text style={styles.bodyText}>You have no Spellistas... yet</Text>
                </View>
            </LinearGradient>
        </React.Fragment>
    );
  }
  
  const styles = StyleSheet.create({
    headerView: {
        height: '20%',
        width: '100%',
    },

    bodyView: {
        height: '80%',
        width: '100%',
    },

    addButton: {
        paddingLeft: 350,
        paddingTop: 20
    },

    titleText: {
        fontSize: 30,
        color: '#fff',
        fontFamily: 'Helvetica',
        alignSelf: 'center',
        paddingTop: 20
    },

    bodyText: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Helvetica',
        alignSelf: 'center',
        paddingTop: 30
    }
  });