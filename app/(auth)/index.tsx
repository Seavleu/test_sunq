import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Modal, SafeAreaView, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import {Button, FormField, AlertBox, CustomCheckBox} from '@/components'; 

import { images } from '@/constants';
import { LOGIN_API } from '@/service/api/apis';
import userStore from '@/utils/storage';

const LoginScreen = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ id: '', pw: '' });
  const [saveId, setSaveId] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedId = await SecureStore.getItemAsync('savedId');
        const autoLoginFlag = await SecureStore.getItemAsync('autoLoginFlag');
        const token = await SecureStore.getItemAsync('authToken');

        if (savedId) {
          setForm(prev => ({ ...prev, id: savedId }));
          setSaveId(true);
          console.log('Saved ID retrieved:', savedId);
        } else {
          console.log('No saved ID found');
        }

        if (autoLoginFlag === 'true' && token) {
          setAutoLogin(true);
          userStore.setToken(token);
          await handleAutoLogin();
        } else if (token) {
          userStore.setToken(token);
        } else {
          console.log('No token found in SecureStore.');
        }
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };

    loadSettings();
  }, []);

  const submit = async () => {
    if (form.id === '' || form.pw === '') {
      Alert.alert('오류', '모든 입력란을 작성해 주세요.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await LOGIN_API.login({
        user_id: form.id,
        user_pw: form.pw,
        sun_q_a_t: '',
      });

      if (response.data.result === 0) {
        const { token } = response.data.data;

        if (saveId || autoLogin) {
          await SecureStore.setItemAsync('savedId', form.id);
        } else {
          await SecureStore.deleteItemAsync('savedId');
        }

        if (autoLogin) {
          await SecureStore.setItemAsync('authToken', token);
          await SecureStore.setItemAsync('savedPassword', form.pw);
          await SecureStore.setItemAsync('autoLoginFlag', 'true');
        } else {
          await SecureStore.deleteItemAsync('autoLoginFlag');
          await SecureStore.deleteItemAsync('authToken');
          await SecureStore.deleteItemAsync('savedPassword');
        }

        userStore.setToken(token);
        router.replace('/_sitemap');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const savedId = await SecureStore.getItemAsync('savedId');
      const savedPassword = await SecureStore.getItemAsync('savedPassword');
      const token = await SecureStore.getItemAsync('authToken');

      if (savedId && savedPassword && token) {
        const response = await LOGIN_API.autoLogin({
          user_id: savedId,
          user_pw: savedPassword,
          sun_q_a_t: token,
        });

        if (response.data.result === 0) {
          userStore.setToken(token);
          router.replace('/(device-management)/error-fix/history/list');
        } else {
          console.error('Auto login failed:', response.data.message);
          setError('Auto login failed. Please log in manually.');
        }
      } else {
        console.warn('Auto login failed: Missing token, user_id, or user_pw');
        setError('Auto login failed. Please log in manually.');
      }
    } catch (error) {
      console.error('Auto login error:', error);
      setError('Auto login failed. Please log in manually.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={images.bg_main} resizeMode="cover" style={styles.backgroundImage} />
        <View style={styles.overlay} />
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={styles.logo}
            />
          </TouchableOpacity>

          {error && (
            <Modal
              transparent={true}
              visible={!!error}
              onRequestClose={() => setError('')}
            >
              <View style={styles.modalBackground}>
                <AlertBox
                  handlePress={() => setError('')}
                  message={error}
                />
              </View>
            </Modal>
          )}

          <Text style={styles.title}>
            신재생에너지 EMS 플랫폼 {'\n'} Sun-Q에 오신 것을 환영합니다.
          </Text>

          <FormField
            title="ID"
            placeholder="아이디 입력"
            value={form.id}
            handleChangeText={(id) => setForm(prev => ({ ...prev, id }))}
            otherStyles={styles.formField}
            keyboardType="default"
          />

          <FormField
            title="PW"
            placeholder="비밀번호 입력"
            value={form.pw}
            handleChangeText={(pw) => setForm(prev => ({ ...prev, pw }))}
            otherStyles={styles.formField}
            secureTextEntry
          />

          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxWrapper}>
              <CustomCheckBox
                value={saveId}
                onValueChange={() => setSaveId(!saveId)}
                label="아이디 저장"
              />
            </View>

            <View style={styles.checkBoxWrapper}>
              <CustomCheckBox
                value={autoLogin}
                onValueChange={() => {
                  setAutoLogin(!autoLogin);
                  if (!autoLogin) setSaveId(true);
                }}
                label="자동 로그인"
              />
            </View>
          </View>

          <Button
            title="로그인"
            handlePress={submit}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />

          <View style={styles.footer}>
            <Image source={images.logo01} resizeMode="contain" />
            <Text style={styles.footerText}>
              대표자 : 임정민 사업자등록번호 :142-81-86179 TEL : 061-820-7533
              FAX : 070-8230-7533 주소 : 전남 나주시 교육길 13
              스마트파크지식산업센터 G동 208호(본점), 202호(기업부설연구소),
              201호(공장) 물류창고 : 경기도 파주시 파평면 파평산로 498-170
              Copyright ⓒ 2023 렉스이노베이션 All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.50,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 16,
    minHeight: Dimensions.get('window').height - 250,
  },
  logo: {
    width: 115,
    height: 34,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 40,
  },
  formField: {
    marginTop: 28,
  },
  checkBoxContainer: {
    flexDirection: 'row', 
    gap: 8,
    marginTop: 18,
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FFF',
  },
  button: {
    marginTop: 28,
  },
  footer: {
    marginTop: 150,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.50)',
    marginTop: 12,
  },
});

export default LoginScreen;
