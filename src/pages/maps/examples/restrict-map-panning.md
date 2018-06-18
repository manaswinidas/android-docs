---
title: Restrict map panning
description: Prevent a map from being panned to a different place.
thumbnail: thumbnailRestrictMapPanning
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoRestrictMapPanning from '../../../video/example-restrictmappanning.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { RestrictCameraActivity } from '../../../example-code/RestrictCameraActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoRestrictMapPanning}
    rotation="vertical"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={RestrictCameraActivity}
  />
}}
