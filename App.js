import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';

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


const words = ["Tap me", "Don't at me", "Laiwip", "YOOOOOOOOOOOOOOO", "Is this text really random", "No",
    "The next color might be blue", "That sort of hurts", "Seen", "I got really bored one day and started writing these out",
    "Need Blog ideas", "Why u wanna blog", "yo could you guys pm me random words ?", "Z",
    "The Second Law of Thermodynamics states that the state of entropy of the entire universe, as an isolated system, will always increase over time",
    "This will repeat too", "Cat 🐱", "Dog 🐶", "The great part of randomness is.. Oh look the number changed", "I sometimes flex infront of the mirror", "There might be a story in all of this",
    "its 10:14 pm when I am writing this", "Can WE be friends?", "might be", "Ok", "a little bit", "Radical", "Cool", "Neato", "I am trying so hard to not use brand names",
    "Some of these might be lyrics", "You stress me out", "Let me tell you the story of the 🐢 and the 🐍", "The 🐢 is the 🐍", "This is really cool", "I am going to give this five starts at the store",
    "🐍🐍🐍🐍🐍🐍🐍🐍🐍🐍🐍🐍🐍🐍", "🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢", "Your text could be here", "some active users", "Translate this", "je ne sais pas", "এই অ্যাপ্লিকেশন সত্যিই শীতল", "I really hope unicode is supported",
    "我一直想学习普通话", "حسنا", "מיטאַרבעט", "මාළු සැරසිලි", "Estoy aburrido", "เปิดตา", "яйця", "send me more random words and phrases"];

class ZButton extends React.Component {


    constructor() {
        super();

        this.state = {
            count: 0,
            foreColor: '#000',
            backgroundColor: '#faf',
            word: words[0]

        }
    }

    componentWillMount() {

        AsyncStorage.getItem('@BOREDAPP:count').then(val => {
            if (val !== null) {
                this.setState({ count: parseInt(val) });
            }
        });
    }

    increaseNum() {
        const num = this.state.count + 1;
        AsyncStorage.setItem('@BOREDAPP:count', "" + num);
        this.setState({ count: num });
        this.nextColor();

    }

    nextColor() {
        const redInt = parseInt(Math.random() * 16);
        const greenInt = parseInt(Math.random() * 16);
        const blueInt = parseInt(Math.random() * 16);
        const wordInt = parseInt(Math.random() * words.length);
        const color = `#${letters[redInt]}${letters[greenInt]}${letters[blueInt]}`

        this.setState({
            backgroundColor: `#${letters[redInt]}${letters[greenInt]}${letters[blueInt]}`,
            foreColor: `#${letters[(redInt + 8) % 16]}${letters[(greenInt + 8) % 16]}${letters[(blueInt + 8) % 16]}`,
            word: words[wordInt]
        })
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: this.state.backgroundColor
            }} onPress={this.increaseNum.bind(this)}>
                <Text style={{ color: this.state.foreColor }}>{this.state.count}</Text>
                <Text style={{ color: this.state.foreColor }}>{this.state.word}</Text> 
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        justifyContent: 'center',
    }
});
