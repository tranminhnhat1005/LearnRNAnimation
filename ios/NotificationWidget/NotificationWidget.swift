//
//  NotificationWidget.swift
//  NotificationWidget
//
//  Created by Nhật Trần on 19/09/2023.
//

import WidgetKit
import SwiftUI
import ActivityKit

@main
struct NotificationWidgets: WidgetBundle {
  var body: some Widget {
    
    if #available(iOS 16.1, *) {
      NotificationActivityWidget()
    }
  }
}

struct ContentView: View {
  var body: some View{
    VStack(alignment: .center) {
      Text("Tik Tok Cloned by Nak")
      Text("Welcome")
    }
    
  }
}

struct ContentLeftView: View {
  var body: some View{
    Image(systemName: "heart.circle").foregroundColor(.red)
  }
}

struct ContentRightView: View {
  var body: some View{
    Image(systemName: "star.circle").foregroundColor(.yellow)
    
  }
}

struct ContentCloseView: View {
  var body: some View{
    Button(action: {}) {
      Image(systemName: "xmark.circle").foregroundColor(.red)
    }
  }
}

struct ActionButtonView: View {
  var body: some View{
    HStack() {
      Link(destination: URL(string: "dynamic-island://Inbox")!, label: {
        HStack{
          Image(systemName: "play.circle").foregroundColor(.white)
          Text("Accept")
          .font(.caption)
          .bold()
        }
        .padding(EdgeInsets(top: 5, leading: 7, bottom: 5, trailing: 12))
        .background(.green)
        .clipShape(Capsule())
        .foregroundColor(.white)
      })
      
      Link(destination: URL(string: "dynamic-island://MomoHeader")!, label: {
        HStack{
          Image(systemName: "stop.circle").foregroundColor(.white)
          Text("Reject")
            .font(.caption)
            .bold()
        }
        .padding(EdgeInsets(top: 5, leading: 7, bottom: 5, trailing: 12))
        .background(.red)
        .clipShape(Capsule())
        .foregroundColor(.white)
      })
    }
  }
}

struct LockScreenView: View {
  var body: some View {
    VStack(alignment: .center){
      ContentView()
      ActionButtonView()
    }
  }
}


struct NotificationActivityWidget: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: NotificationAttributes.self) { context in
      LockScreenView()
    } dynamicIsland: { context in
      DynamicIsland {
        DynamicIslandExpandedRegion(.leading){
          
        }
        DynamicIslandExpandedRegion(.trailing){
          ContentCloseView()
        }
        DynamicIslandExpandedRegion(.center){
          ContentView()
        }
        DynamicIslandExpandedRegion(.bottom){
          ActionButtonView()
        }
      } compactLeading: {
        ContentLeftView()
      } compactTrailing: {
        ContentRightView()
      } minimal: {
        ContentView()
      }

    }
  }
}
