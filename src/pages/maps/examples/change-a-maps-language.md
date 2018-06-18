---
title: Change a map's language
description: Switch the map's language dynamically.
thumbnail: thumbnailChangeAMapsLanguage
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoChangeAMapsLanguage from '../../../video/example-changeamapslanguage.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { LanguageSwitchActivity } from '../../../example-code/LanguageSwitchActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoChangeAMapsLanguage}
    rotation="horizontal"
    device="pixel-2"
  />
}}


<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={LanguageSwitchActivity}
  />
}}
