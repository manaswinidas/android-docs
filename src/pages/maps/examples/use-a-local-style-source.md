---
title: Use a local style source
description: Example loads the map style via a locally stored style JSON file or custom raster style.
thumbnail: thumbnailUseALocalStyleSource
topic: Set a map style
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoUseALocalStyleSource from '../../../video/example-localstyleorcustomrasterstyle.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { LocalStyleSourceActivity } from '../../../example-code/LocalStyleSourceActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoUseALocalStyleSource}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={LocalStyleSourceActivity}
  />
}}
