---
title: Get a travel time matrix
description: Calculate travel times between many points.
thumbnail: thumbnailMatrix
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoGetATravelTimeMatrix from '../../../video/example-directionsmatrixapi.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { MatrixApiActivity } from '../../../example-code/MatrixApiActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoGetATravelTimeMatrix}
    rotation="vertical"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={MatrixApiActivity}
  />
}}
