---
title: Color dependent on zoom level
description: Make a property depend on the map zoom level, in this case, the water layers fill color.
thumbnail: thumbnailDdsColorZoom
topic: dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoColorDependentOnZoomLevel from '../../../video/example-colordependentonzoomlevel.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { ZoomDependentFillColorActivity } from '../../../example-code/ZoomDependentFillColorActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoColorDependentOnZoomLevel}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={ZoomDependentFillColorActivity}
  />
}}
