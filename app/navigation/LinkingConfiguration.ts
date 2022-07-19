/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import {LinkingOptions} from '@react-navigation/native';

import {RootStackParamList} from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['mychat://'],
  config: {
    screens: {
      KhuVucDoScreen: 'KhuVucDoScreen',
      ChiTietSoDoScreen: 'ChiTietSoDoScreen',
      DoChiSo: 'DoChiSo',
      DoNuoc: 'DoNuoc',
      WelCome: 'WelCome',
      Login: 'Login',
      Register: 'Register',
      Main: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },

          TabThree: {
            screens: {
              TabTwoScreen: 'three',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
      ActiveDevice: 'activeDevice',
      CallWebRtc: 'CallWebRtc',
    },
  },
};

export default linking;
