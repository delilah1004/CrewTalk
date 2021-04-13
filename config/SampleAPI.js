// import { Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const host = 'url';

// // 완료
// export async function signIn(id, password, navigation) {
//   try {
//     const response = await axios({
//       method: 'post',
//       url: host + '/login',
//       data: {
//         id: id,a
//         password: password,
//       },
//     });

//     const token = response.data.result.user.token;
//     await AsyncStorage.setItem('session', token);

//     Alert.alert('로그인 성공!');
//     navigation.push('TabNavigator');
//   } catch (err) {
//     const error = err.response.data.err || err.message;

//     Alert.alert(error);
//   }
// }

// // 완료
// export async function signOut(navigation) {
//   try {
//     await AsyncStorage.clear();

//     Alert.alert('로그아웃!');
//     navigation.push('Start');
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }

// // 완료
// export async function register(name, email, password, role, navigation) {
//   try {
//     const response = await axios({
//       method: 'post',
//       url: host + '/register',
//       data: {
//         name: name,
//         email: email,
//         password: password,
//         role: role,
//       },
//     });

//     if (response.data.success) {
//       Alert.alert('회원가입 성공!');
//       navigation.push('SignIn');
//     } else {
//       Alert.alert('회원가입 실패');
//     }
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }

// // 완료
// export async function checkEmail(name, email, password, navigation) {
//   try {
//     const response = await axios({
//       method: 'post',
//       url: host + '/checkEmail',
//       data: {
//         email: email,
//       },
//     });

//     let currentUser = {
//       name: name,
//       email: email,
//       password: password,
//     };

//     if (response.data.success) {
//       navigation.push('RolePick', { currentUser });
//     } else {
//       Alert.alert('이미 존재하는 이메일입니다!');
//     }
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }

// // 완료
// export async function getMemberListByName(name, pageNum) {
//   try {
//     const token = await AsyncStorage.getItem('session');
//     const response = await axios({
//       method: 'get',
//       url: host + '/member',
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//       params: {
//         search: name,
//         page: pageNum,
//       },
//     });

//     // console.log(response.data.result);
//     return response.data.result;
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }

// // 하나씩 밀리는 오류
// export async function getMemberListByCategory(category, pageNum) {
//   try {
//     const token = await AsyncStorage.getItem('session');
//     const response = await axios({
//       method: 'get',
//       url: host + '/member',
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//       params: {
//         category: category,
//         page: pageNum,
//       },
//     });

//     return response.data.result;
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }

// // 완료
// export async function getMemberInfo(userId) {
//   try {
//     const token = await AsyncStorage.getItem('session');
//     const response = await axios({
//       method: 'get',
//       url: host + '/member/' + userId,
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });

//     console.log(response.data.result);
//     return response.data.result;
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }

// // 완료
// export async function getUserInfo() {
//   try {
//     const token = await AsyncStorage.getItem('session');
//     const response = await axios({
//       method: 'get',
//       url: host + '/user',
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//     });

//     return response.data.result.user;
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }

// export async function updateProfile(
//   name,
//   role,
//   introduce,
//   careercompany,
//   careerrole,
//   school,
//   major,
//   imageUri,
//   navigation
// ) {
//   try {
//     const token = await AsyncStorage.getItem('session');
//     const response = await axios({
//       method: 'put',
//       url: host + '/user',
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//       data: {
//         name: name,
//         role: role,

//         introduce: introduce,
//         career: [
//           {
//             careercompany: careercompany,
//             careerrole: careerrole,
//           },
//         ],
//         education: [
//           {
//             school: school,
//             major: major,
//           },
//         ],
//         imageUri,
//         navigation,
//       },
//     });

//     console.log(response.data);
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }

// export async function updateUserInfo(email, phone, navigation) {
//   try {
//     const token = await AsyncStorage.getItem('session');
//     const response = await axios({
//       method: 'patch',
//       url: host + '/user',
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//       data: {
//         email: email,
//         phone: phone,
//       },
//     });

//     if (response.data.success) {
//       navigation.push('Setting');
//     } else {
//       Alert.alert('계정 정보 변경 실패');
//     }
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }

// export async function findPassword(email) {
//   try {
//     const token = await AsyncStorage.getItem('session');
//     const response = await axios({
//       method: 'post',
//       url: host + '/password',
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//       data: {
//         email: email,
//       },
//     });

//     console.log(response.data);
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }

// export async function updatePassword(
//   currentpassword,
//   password,
//   passwordConfirm
// ) {
//   try {
//     const token = await AsyncStorage.getItem('session');
//     const response = await axios({
//       method: 'put',
//       url: host + '/password',
//       headers: {
//         Authorization: 'Bearer ' + token,
//       },
//       data: {
//         currentpassword: currentpassword,
//         password: password,
//         passwordConfirm: passwordConfirm,
//       },
//     });

//     console.log(response.data);
//   } catch (err) {
//     const error = err.response.data.error || err.message;

//     Alert.alert(error);
//   }
// }