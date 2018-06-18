---
title: Display 3D buildings on any map style
description: Toggle building layer on and off and can be used with any style.
thumbnail: thumbnailBuilding
topic: Getting started
prependJs:
  - "import AppropriateImage from '../../../components/appropriate-image'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { BuildingPluginActivity } from '../../../example-code/BuildingPluginActivity.js'"

---

{{
  <AppropriateImage imageId="exampleDisplayBuildingsIn3d" />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    codeSnippet={BuildingPluginActivity}
  />
}}
