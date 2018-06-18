---
title: Set up offline manager
description: Download, view, navigate to, and delete an offline region.
thumbnail: thumbnailSetUpOfflineManager
topic: Offline
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoOfflineManager from '../../../video/example-offlinemanager.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { OfflineManagerActivity } from '../../../example-code/OfflineManagerActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoOfflineManager}
    rotation="vertical"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={OfflineManagerActivity}
  />
}}
