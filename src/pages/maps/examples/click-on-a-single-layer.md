---
title: Click on a single layer
description: Click on and highlight a selected a GeoJSON polygon
thumbnail: thumbnailClickOnASingleLayer
topic: User interaction
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoClickOnSingleLayer from '../../../video/example-clickonsinglelayer.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { ClickOnLayerActivity } from '../../../example-code/ClickOnLayerActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoClickOnSingleLayer}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={ClickOnLayerActivity}
  />
}}
