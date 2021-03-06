import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Layout,
  ButtonGroup,
  Button,
  TextContainer,
  DisplayText,
  TextStyle,
  Image,
} from '@shopify/polaris';

import ConnectedImage from '../../../dist/images/connected.svg';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.handleConnectButtonClick = this.handleConnectButtonClick.bind(this);
  }

  handleConnectButtonClick() {
    this.props.dispatch(push('/app/connect-to-doppler'));
  }

  render() {
    return (
      <Layout>
        <Layout.Section>
          <div style={{ marginTop: '2rem' }}>
            <TextContainer spacing="loose">
              <DisplayText size="large">
                Connect your Shopify store to your Doppler account
              </DisplayText>
              <br />
              <TextStyle variation="subdued">
                <DisplayText size="small">
                  Follow a few steps to set up your account and add customers and their purchase data automatically to Doppler. 
                  Reach the right people with the right message at the right time and generate more revenue!
                </DisplayText>
              </TextStyle>
            </TextContainer>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <ButtonGroup>
              <Button primary onClick={this.handleConnectButtonClick}>
                Connect existing account
              </Button>
              <Button
                external
                url="https://app2.fromdoppler.com/Registration/Register/StartRegistration?origin=shopify"
              >
                Sign up for free
              </Button>
            </ButtonGroup>
          </div>
        </Layout.Section>
        <Layout.Section secondary>
          <Image style={{maxWidth:"30rem"}} source={ConnectedImage} />
        </Layout.Section>
      </Layout>
    );
  }
}

export default connect()(Welcome);
