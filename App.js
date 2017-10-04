import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Animated } from 'react-native';
import words from './strings';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ZButton />
            </View>
        );
    }
}
const letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

class ZButton extends React.Component {
    constructor() {
        super();

        this.state = {
            count: 0,
            foreColor: '#000',
            backgroundColor: '#faf',
            word: words[0],
            textSize: new Animated.Value(100),
        };
        Animated.delay(0);
    }
    componentWillMount() {

        AsyncStorage.getItem('@BOREDAPP:count').then(val => {
            if (val !== null) {
                this.setState({ count: parseInt(val) });
            }
        });
    }

    increaseNum() {
        this.animate();
        let num = this.state.count + 1;
        AsyncStorage.setItem('@BOREDAPP:count', "" + num);
        this.setState({ count: num });
        this.nextColor();
    }

    animate(){
        this.state.textSize.setValue(100);
        Animated.spring(this.state.textSize, { toValue: 150}).start();        
    }
    nextColor() {
        const redInt = parseInt(Math.random() * 16);
        const greenInt = parseInt(Math.random() * 16);
        const blueInt = parseInt(Math.random() * 16);
        const wordInt = parseInt(Math.random() * words.length);
        const color = `#${letters[redInt]}${letters[greenInt]}${letters[blueInt]}`

        this.setState({
            backgroundColor: `#${letters[redInt]}${letters[greenInt]}${letters[blueInt]}`,
            foreColor: `#${letters[(redInt + 7) % 16]}${letters[(greenInt + 7) % 16]}${letters[(blueInt + 7) % 16]}`,
            word: words[wordInt]
        });
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: this.state.backgroundColor
            }} onPress={this.increaseNum.bind(this)}>
                <Animated.Text style={{
                    color: this.state.foreColor,
                    fontSize: this.state.textSize
                }}>{this.state.count}</Animated.Text>
                <Text style={{ color: this.state.foreColor }}>{this.state.word}</Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});
