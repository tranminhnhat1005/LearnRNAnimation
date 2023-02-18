//
//  DynamicIslandModule.swift
//  TicTokClone
//
//  Created by Nhật Trần on 16/02/2023.
//
import ActivityKit

@objc(DynamicIslandModule)
class DynamicIslandModule: NSObject{
  
  @objc(testFunc: withMessage: withResolve: withReject:)
  func testFunc(title: NSString, message: NSString, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock){
    resolve("\(title) - \(message)")
  }
  
  @objc
  func startNotificationActivity() {
    let initialContentState = NotificationAttributes.ContentState(message: "Hello world!")
    let activityAttributes = NotificationAttributes(title: "Title")
    
    do {
      if #available(iOS 16.1, *) {
        _ = try Activity.request(attributes: activityAttributes, contentState: initialContentState)
          
      } else {
        // Fallback on earlier
      }
      print("Requested a Live Activity")
      
    } catch (let error) {
      print("Error requesting Live Activity \(error.localizedDescription).")
    }
  }
  
  @objc
  func updateNotificationActivity() {
    let initialContentState = NotificationAttributes.ContentState(message: "Hello world updated!")
    if #available(iOS 16.1, *) {
      let alertConfiguration = AlertConfiguration(title: "LocalizedStringResource", body: "LocalizedStringResource", sound: .default)
      Task {
        for activity in Activity<NotificationAttributes>.activities {
          await activity.update(using: initialContentState, alertConfiguration: alertConfiguration)
        }
      }
    } else {
      // Fallback on earlier versions
    }
  }
  
  @objc
  func endNotificationActivity() {
    let notificationStatus = NotificationAttributes.NotificationStatus(message: "Closed")
    
    if #available(iOS 16.1, *) {
      Task {
        for activity in Activity<NotificationAttributes>.activities {
          await activity.end(using: notificationStatus, dismissalPolicy: .default)
        }
      }
    } else {
      // Fallback on earlier versions
    }
  }
}
