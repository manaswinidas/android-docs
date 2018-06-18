---
title: Query a map feature
description: Click the map to add a marker at the location and display the maps property information for this feature.
thumbnail: thumbnailQueryAMapFeature
topic: User interaction
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoQueryAMapFeature from '../../../video/example-queryamapfeature.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { QueryFeatureActivity } from '../../../example-code/QueryFeatureActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoQueryAMapFeature}
    rotation="vertical"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={QueryFeatureActivity}
  />
}}
