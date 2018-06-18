---
title: Show and hide layers
description: Create a custom layer switcher to display different datasets.
thumbnail: thumbnailShowAndHideLayers
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoShowAndHideLayers from '../../../video/example-showandhidelayers.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { ShowHideLayersActivity } from '../../../example-code/ShowHideLayersActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoShowAndHideLayers}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={ShowHideLayersActivity}
  />
}}
