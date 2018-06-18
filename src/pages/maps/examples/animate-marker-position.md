---
title: Animate marker position
description: Animate the marker to a new position on the map.
thumbnail: thumbnailAnimateMarkerPosition
topic: Add markers and infoWindows to the map
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoAnimateMarkerPosition from '../../../video/example-animatemarkerposition.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { AnimatedMarkerActivity } from '../../../example-code/AnimatedMarkerActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoAnimateMarkerPosition}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={AnimatedMarkerActivity}
  />
}}
