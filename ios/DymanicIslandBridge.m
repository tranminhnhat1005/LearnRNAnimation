//
//  DymanicIslandBridge.m
//  TicTokClone
//
//  Created by Nhật Trần on 16/02/2023.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DynamicIslandModule, NSObject)

RCT_EXTERN_METHOD(testFunc: (NSString)title withMessage:(NSString)message withResolve:(RCTPromiseResolveBlock)resolve withReject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(startNotificationActivity)
RCT_EXTERN_METHOD(updateNotificationActivity)
RCT_EXTERN_METHOD(endNotificationActivity)

@end
