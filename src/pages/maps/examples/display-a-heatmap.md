---
title: Display a heatmap
description: Add and customize a heatmap to visualize data.
thumbnail: thumbnailDisplayAHeatmap
topic: Data visualization
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoDisplayAHeatmap from '../../../video/example-showheatmapdata.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { HeatmapActivity } from '../../../example-code/HeatmapActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoDisplayAHeatmap}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={HeatmapActivity}
  />
}}
