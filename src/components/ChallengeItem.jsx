import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  VStack,
  Input,
  NativeBaseProvider,
  Button,
  Link,
  Box,
} from 'native-base';

export default function ChallengeItem({
  item,
  key,
  title,
  userTime,
  userKm,
  otherTime,
  otherKm,
  showButtons,
  navigation,
}) {
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    if (isClicked) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [isClicked]);

  return (
    <View>
      {/* Header */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleClick}
        style={styles.header}>
        <Text style={styles.headerText}>
          {title} {item.challenged} on{' '}
          {item.challenger_date?.toDate().toLocaleDateString('en-US')}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {/*Details*/}
        {userTime && (
          <TouchableOpacity key={key} style={styles.content}>
            <Text style={styles.text}>your Stats</Text>
            <Text style={styles.text}>time: {userTime} min</Text>
            <Text style={styles.text}>distance: {userKm} km</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        )}
        {otherTime && (
          <TouchableOpacity key={key} style={styles.content}>
            <Text style={styles.text}>their Stats</Text>
            <Text style={styles.text}>time: {otherTime} min</Text>
            <Text style={styles.text}>distance: {otherKm} km</Text>
          </TouchableOpacity>
        )}
        {showButtons && (
          <Link>
            <Button onPress={() => navigation.navigate('Map')}>Accept</Button>

            <Button>Reject</Button>
          </Link>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});
