---
title: Add an image source with time lapse
description: TBD
thumbnail: thumbnailAddAnImageSourceWithTimeLapse
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoAddAnImageSourceWithTimeLapse from '../../../video/example-showtimelapse.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { ImageSourceTimeLapseActivity } from '../../../example-code/ImageSourceTimeLapseActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoAddAnImageSourceWithTimeLapse}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={ImageSourceTimeLapseActivity}
  />
}}
