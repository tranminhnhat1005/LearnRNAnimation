//
//  ActivityAttributes.swift
//  TicTokClone
//
//  Created by Nhật Trần on 16/02/2023.
//

import Foundation
import ActivityKit

struct NotificationAttributes: ActivityAttributes {
  public typealias NotificationStatus = ContentState
  
  public struct ContentState: Codable, Hashable {
    var message: String
  }
  
  var title: String
}
