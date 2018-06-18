---
title: Add multiple heatmap styles
description: Gain minute control over heat map coloring, size, density, and other styling.
thumbnail: thumbnailAddMultipleHeatmapStyles
topic: Data visualization
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoAddMultipleHeatmapStyles from '../../../video/example-stylingheatmaps.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { MultipleHeatmapStylingActivity } from '../../../example-code/MultipleHeatmapStylingActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoAddMultipleHeatmapStyles}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={MultipleHeatmapStylingActivity}
  />
}}
