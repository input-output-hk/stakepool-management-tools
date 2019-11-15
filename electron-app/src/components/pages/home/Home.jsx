import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Checkbox, Input, Icon } from 'antd';
import ButtonPrimary from '../../atoms/ButtonPrimary/ButtonPrimary';
import ModalData from '../../molecules/ModalData/ModalData';
import './_style.scss';
import '../../../css/app.scss';

const Home = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <div className="ContainerApp">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Wellcome" key="1">
          <div className="containerTab">
            <div className="rightColumn">
              <img src="img/logo.png" alt="" />
              <h4>Stake Pool Manager</h4>
              <p>Wellcome Stake Pool Operators, to begin please visit:</p>
              <ul>
                <li>Understand Incentives</li>
                <li>Get Started Guide</li>
                <li>Help Forums</li>
                <li>Check a Transaction</li>
              </ul>
              <Checkbox className="checkbox" onChange={onChange}>
                Show Wellcome Guide when opening app
              </Checkbox>
            </div>
            <div className="leftColumn">
              <h2>Get Started</h2>
              <div className="box">
                <ModalData />
              </div>
              <div className="box">
                <ModalData />
              </div>
              <div className="box">
                <ModalData />
              </div>
              <div className="box">
                <ModalData />
              </div>
              <div className="box">
                <ModalData />
              </div>
              <div className="box">
                <ModalData />
              </div>
              <div className="box">
                <ModalData />
              </div>
              <div className="dataContainer">
                <p>To use Report Tool, enter node REST address and Port Number.</p>
                <Input placeholder="For example http://localhost:8080" />
              </div>
              <ButtonPrimary text="Connect" theme="ThemePrimary" />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Report Tool" key="2">
          <div className="containerTab">
            <div className="rightColumn">
              <div className="card">
                <div className="titleCard">
                  <h4>Blockchain</h4>
                </div>
                <div className="data">
                  <div className="col1">
                    <p>Block0</p>
                    <p>Started On</p>
                    <p>Consensus</p>
                  </div>
                  <div className="col2">
                    <p>000000000000000000000000000</p>
                    <p>18:12:59 on 18:12:59</p>
                    <p>Genesis</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="titleCard">
                  <h4>Node Info</h4>
                </div>
                <div className="data">
                  <div className="col1">
                    <p>Up Since</p>
                    <p>Block Received</p>
                    <p>Last Block</p>
                    <p>Date / Lenght</p>
                  </div>
                  <div className="col2">
                    <p>18:12:59 on 18:12:59</p>
                    <p>1</p>
                    <p>000000000000000000000000000</p>
                  </div>
                </div>
                <div className="titleCard2">
                  <h4>Transactions</h4>
                  <ButtonPrimary text="UPDATE" />
                </div>
                <div className="data">
                  <div className="col1">
                    <p>Tx Received</p>
                    <p>Txs</p>
                    <p>Outputs</p>
                    <p>Fees</p>
                  </div>
                  <div className="col2">
                    <p>0</p>
                    <p>1</p>
                    <p>1</p>
                    <p>0</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="titleCard3">
                  <h4>Transactions</h4>
                  <ButtonPrimary text="UPDATE" />
                </div>
                <div className="data2">
                  <h2>
                    Total Value <br /> 2000 <br />
                    Total Value <br /> 2000
                  </h2>
                  <div className="circle"></div>
                  <h2>
                    Rewards Pending <br /> 2000 <br />
                    Rewards Pending <br /> 2000
                  </h2>
                  <div className="circle"></div>
                </div>
              </div>
            </div>
            <div className="rightColumn">
              <div className="card">
                <div className="titleCard3">
                  <h4>Transactions</h4>
                  <ButtonPrimary text="UPDATE" />
                </div>
                <div className="data3">
                  <div className="col">
                    <h4>Schedule</h4>
                    <p>10/29/2019, 18:10:17</p>
                    <p>10/29/2019, 18:10:17</p>
                    <p>10/29/2019, 18:10:17</p>
                    <p>10/29/2019, 18:10:17</p>
                    <p>10/29/2019, 18:10:17</p>
                    <p>10/29/2019, 18:10:17</p>
                    <p>10/29/2019, 18:10:17</p>
                  </div>
                  <div className="col">
                    <h4>Started At</h4>
                    <p>Pending...</p>
                    <p>Pending...</p>
                    <p>Pending...</p>
                    <p>Pending...</p>
                    <p>Pending...</p>
                    <p>Pending...</p>
                    <p>Pending...</p>
                  </div>
                  <div className="col">
                    <h4>Finished At</h4>
                    <p>18:06:17</p>
                    <p>18:06:17</p>
                    <p>18:06:17</p>
                    <p>18:06:17</p>
                    <p>18:06:17</p>
                    <p>18:06:17</p>
                    <p>18:06:17</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="titleCard4">
                  <h4>Fragment Logs</h4>
                  <Input placeholder="For example http://localhost:8080" />
                  <ButtonPrimary text="UPDATE" />
                </div>
                <div className="data4">
                  <div className="col">
                    <h4>Fragment</h4>
                  </div>
                  <div className="col">
                    <h4>Received</h4>
                  </div>
                  <div className="col">
                    <h4>Updated</h4>
                  </div>
                  <div className="col">
                    <h4>Status</h4>
                  </div>
                </div>
                <div className="data5">
                  <Icon type="exclamation-circle" />
                  <p>Please enter a Fragment ID</p>
                </div>
                <div className="bottomBar">
                  <ButtonPrimary text=">>" />
                  <p>Page 1 of 1</p>
                  <ButtonPrimary text="<<" />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
