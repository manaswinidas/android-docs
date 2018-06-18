---
title: Draw a marker
description: Create a default marker with an InfoWindow.
thumbnail: thumbnailDrawAMarker
topic: Add markers and infoWindows to the map
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoDrawAMarker from '../../../video/example-drawamarker.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { DrawMarkerActivity } from '../../../example-code/DrawMarkerActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoDrawAMarker}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={DrawMarkerActivity}
  />
}}
