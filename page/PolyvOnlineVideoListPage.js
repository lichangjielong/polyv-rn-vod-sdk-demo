import React, { Component } from "react";

import {
  View,
  Dimensions,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import PolyvVodConfigRnModule from "./PolyvVodConfigRnModule";
import PolyvHttpManager from '../common/PolyvHttpManager'

import PolyvVideoListView from "../view/PolyvVideoList";
import { setAxios } from "../common/PolyvNet";


const { width, height } = Dimensions.get("window");
type Props = {};

export default class PolyvOnlineVideoList extends Component<Props> {

  static navigationOptions = {
    tabBarLabel: '在线列表',
  };
  constructor(props) {
    super(props);
    this.state = {
      // 初始化所需的数据
      vodKey:
        "yQRmgnzPyCUYDx6weXRATIN8gkp7BYGAl3ATjE/jHZunrULx8CoKa1WGMjfHftVChhIQlCA9bFeDDX+ThiuBHLjsNRjotqxhiz97ZjYaCQH/MhUrbEURv58317PwPuGEf3rbLVPOa4c9jliBcO+22A==",
      decodeKey: "VXtlHmwfS2oYm0CZ",
      decodeIv: "2u9gDPKdX6GyQJKU",
      viewerId: "rn_viewerId",
      nickName: "rn_nickName",

      // 输入框默认vid
      inputVid: "e97dbe3e649c56a1e58535bd8c5d3924_e",
      canDownload: false
    };
  }

  componentWillMount() {
    console.log("componentWillMount");
    /**
     * <Polyv Live init/>
     */
    console.log("Polyv vod init");
    setAxios();

    PolyvVodConfigRnModule.init(
      this.state.vodKey,
      this.state.decodeKey,
      this.state.decodeIv,
      this.state.viewerId,
      this.state.nickName
    ).then(ret => {
      if (ret.code != 0) {
        // 初始化失败
        var str = "初始化失败  errCode=" + ret.code + "  errMsg=" + ret.message;
        console.log(str);
        alert(str);
      } else {
        // 初始化成功
        console.log("初始化成功");
      }
    });
  }

  updateVid() {
    console.log("updateVid");
    this.refs["playerA"].updateVid(this.state.inputVid);
  }

  startOrPause() {
    console.log("startOrPause");
    this.refs["playerA"].startOrPause();
  }

  showDownloadOptions() {
    console.log("showDownloadOptions");
    
    PolyvHttpManager.getVideoList(1,20,(success,error) =>{
      if(success){
        this.refs.videoList.update(success.data)
      }
    })
  }

  componentDidMount(){
    setTimeout(() => {
      this.showDownloadOptions()
    }, 50);
  }

  render() {
    console.log('app render')
    return (
      <View style={styles.container}>
      <PolyvVideoListView  navigation={this.props.navigation} ref='videoList' style={styles.video} />
    </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:width,
    height:height,
    backgroundColor: "gray"
  },
  video: {
    position: "relative",
    height: (width * 9) / 16,
    width: width
  },
  input: {
    height: 50,
    backgroundColor: "#C0C0C0",
    fontSize: 20,
    margin: 10,
    padding: 10
  },
  horizon: {
    display: "flex",
    flexDirection: "row",
    width: width
  },
  text: {
    textAlign: "center",
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    height: 50,
    backgroundColor: "#63B8FF",
    margin: 10,
    padding: 10
  }
});