//
//  NotificationWidgetBundle.swift
//  NotificationWidget
//
//  Created by Nhật Trần on 16/02/2023.
//

import WidgetKit
import SwiftUI

@main
struct NotificationWidgetBundle: WidgetBundle {
    var body: some Widget {
        NotificationWidget()
        NotificationWidgetLiveActivity()
    }
}
