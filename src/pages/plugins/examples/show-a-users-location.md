---
title: Show a user's location
description: Example showing how to setup the location layer plugin to indicate the users current location on the map
thumbnail: thumbnailLocationLayer
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoShowAUsersLocation from '../../../video/example-showauserslocation.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { LocationPluginActivity } from '../../../example-code/LocationPluginActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoShowAUsersLocation}
    rotation="vertical"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={LocationPluginActivity}
  />
}}
