
import React, { useEffect, useState } from 'react';
import Colors from "../Constants/Colors";
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform, Dimensions, Image, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const ExpandableComponent = ({ item, onClickFunction }) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [btnText, setbtnText] = useState("+");
  useEffect(() => {


    if (item.isExpanded) {
      setLayoutHeight(null);
      setbtnText("-");
    } else {
      setbtnText("+");
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      {/*Header of the Expandable List Item*/}

      <TouchableOpacity
        style={styles.paybtn}
        onPress={onClickFunction}
      >
        <LinearGradient
          style={styles.gradient}
          colors={["#46aeff", "#5884ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.headerText}>{item.title}</Text>
          <Image
            source={{
              uri: (item.image),
            }}
            resizeMode={"cover"}
            style={styles.countryImg}
          ></Image>
          <View style={styles.butnView}>
            <Text style={{ color: Colors.WHITE, fontFamily: "Muli-ExtraBold", fontSize: 3 * vh }}>{btnText}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {/*Content under the header of the Expandable List Item*/}
        {item.data.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={styles.content}
            onPress={() => alert('Id: ' + item.id + ' val: ' + item.title)}>
            <Text style={styles.text}>
              {key}. {item.title}
            </Text>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const App = () => {

  const [listDataSource, setListDataSource] = useState([]);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [data, setData] = useState(null);

  const [indata, setindata] = useState(null);



  const loadData = () => {
    let url = `https://api.jsonbin.io/b/60e7f4ebf72d2b70bbac2970`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {

        console.log(data.data);
        setData(data);
        setindata(data.data);
        AsyncStorage.setItem('arrayData', JSON.stringify(data.data));
      })
      .catch((error) => {

      });
  };

  useEffect(() => {

    displayData();


  }, []);


  const displayData = async () => {
    try {

      let data = await AsyncStorage.getItem('arrayData');
      let parsed1 = JSON.parse(data);

      if (parsed1 == null) {
        loadData();
      } else {
        setindata(parsed1);
      }
    }
    catch (error) {
      loadData();
    }
  }
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const onChangeSearch = (text) => {
    // Check if searched text is not blank

    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = indata.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        console.log(itemData.indexOf(textData));
        return itemData.indexOf(textData) > -1;
      });
      setindata(newData);
      setSearch(text);
    } else {
      setindata(indata)
      setSearch(text);
    }
   
  };

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...indata];

    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false)
    );

    setListDataSource(array);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text style={styles.titleText}>Expandable List View</Text>
        </View>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => onChangeSearch(text)}
          value={search}
          style={{ marginVertical: 2 * vh }}
          onTouchCancel={() => setindata(indata)}

        />
        <ScrollView>
          {indata != null ? indata.map((item, key) => (
            <ExpandableComponent
              key={item.id}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          )) : <ActivityIndicator
            size="large"
            animating={true}
            color={Colors.BLACK}
          />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;
const styles = StyleSheet.create({
  butnView: { borderWidth: 0.2 * vh, borderColor: Colors.WHITE, borderRadius: 2 * vh, width: 4 * vh, height: 4 * vh, justifyContent: "center", alignItems: "center" },
  paybtn: {

    margin: 2 * vh,


  },
  gradient: {

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 2 * vh,
    paddingVertical: 2 * vh
  },
  countryImg: {
    height: 8 * vh,
    width: 8 * vh,
    borderRadius: 4 * vh,
    borderWidth: 0.05 * vh,
    borderColor: Colors.grey,
  },
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: Colors.SKYBLUE,
    padding: 20,
    margin: 2 * vh,
    borderRadius: 2 * vh,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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

