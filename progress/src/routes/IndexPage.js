/**
 * 主页
 * author : gyy
 * createTime : 2019-11-15 
 */
import React from 'react';
import { connect } from 'dva';
import { Progress, Button, Select } from 'antd';
import styles from './IndexPage.css';
const { Option } = Select;
const ButtonGroup = Button.Group;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  handleChange = (value) => {
    this.props.dispatch({
      type:'index/updateState',
      payload:{
        currentBar: value
      }
    })
  }
  
  render() {
    const {barNumlists, buttonLists, currentBar, limit} =this.props.index;
    const dispatch = this.props.dispatch;

    const changeBar = (item) => {
      let percent = barNumlists[currentBar] + Number(item);
      percent = percent < 0 ? 0 : percent > 230 ? 230 : percent;
      barNumlists.splice(currentBar,1,percent);
      dispatch({
        type:'index/updateState',
        payload:{
          barNumlists: barNumlists
        }
      });
    }

    return(
      <div className={styles.normal}>
        {
          !!barNumlists && barNumlists.map((item,index) => {
            return (
              <Progress className={styles.bar} percent={parseFloat((item/(limit/100)).toFixed(2))} key={index}/>
            )
          })
        }
        <div className={styles.operateBtn}>
          <Select value={currentBar} style={{ width: 120 }} onChange={this.handleChange}>
            {
              !!barNumlists && barNumlists.map((item,index) => {
                return (
                  <Option value={index} key={index}>{`#progress${index+1}`}</Option>
                )
              })
            }
          </Select>
          <ButtonGroup>
            {
              !!buttonLists && buttonLists.map((item,index) => {
                return (
                  <Button key={index} onClick={() => changeBar(item)}>{item > 0 ? `+${item}` : `${item}`}</Button>
                )
              })
            }
          </ButtonGroup>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    index: state.index
  }),
)(IndexPage);