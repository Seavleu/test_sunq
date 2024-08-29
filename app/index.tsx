import { View, Text } from 'react-native'
import React from 'react'
import ErrorFixRegistScreen from './(screens)/(device-management)/error-fix/regist'
import ErrorFixDetailScreen from './(screens)/(device-management)/error-fix/history/detail/[id]'
import ErrorFixListScreen from './(screens)/(device-management)/error-fix/history/list'
import ErrorFixScreen from './(screens)/(device-management)/error-fix'

const HomeScreen = () => {
  return (
    <View>
      
      <ErrorFixRegistScreen />
      {/* <ErrorFixDetailScreen /> */}
      {/* <ErrorFixListScreen />  */}
    </View>
  )
}

export default HomeScreen