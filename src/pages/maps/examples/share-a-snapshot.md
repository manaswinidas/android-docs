---
title: Share a snapshot
description: Send and share a map snapshot image.
thumbnail: thumbnailShareASnapshot
topic: Image generation
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSnapshotShare from '../../../video/example-shareasnapshotimage.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { SnapshotShareActivity } from '../../../example-code/SnapshotShareActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoSnapshotShare}
    rotation="vertical"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={SnapshotShareActivity}
  />
}}
