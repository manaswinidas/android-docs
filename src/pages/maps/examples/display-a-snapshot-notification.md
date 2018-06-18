---
title: Display a snapshot notification
description: TBD
thumbnail: thumbnailDisplayASnapshotNotification
topic: Image generation
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoDisplayASnapshotNotification from '../../../video/example-snapshotnotification.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { SnapshotNotificationActivity } from '../../../example-code/SnapshotNotificationActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoDisplayASnapshotNotification}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={SnapshotNotificationActivity}
  />
}}
