---
title: Select a building
description: Use the query feature to select a building, get its geometry and draw a polygon highlighting it.
thumbnail: thumbnailSelectABuilding
topic: User interaction
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSelectABuilding from '../../../video/example-selectabuilding.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { SelectBuildingActivity } from '../../../example-code/SelectBuildingActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoSelectABuilding}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={SelectBuildingActivity}
  />
}}
