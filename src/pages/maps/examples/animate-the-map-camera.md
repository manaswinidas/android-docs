---
title: Animate the map camera
description: Animate the map's camera position, tilt, bearing, and zoom.
thumbnail: thumbnailAnimateTheMapCamera
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoAnimateTheMapCamera from '../../../video/example-animatethemapcamera.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { AnimateMapCameraActivity } from '../../../example-code/AnimateMapCameraActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoAnimateTheMapCamera}
    rotation="vertical"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={AnimateMapCameraActivity}
  />
}}
