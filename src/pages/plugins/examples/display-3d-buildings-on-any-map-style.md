---
title: Display 3D buildings on any map style
description: Toggle building layer on and off and can be used with any style.
thumbnail: thumbnailBuilding
topic: getting started
visualExample:
  filename: exampleBuildingPlugin
  fileFormat: png
  rotation: horizontal
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { BuildingPluginActivity } from '../../../example-code/BuildingPluginActivity.js'"
---

Any notes about this example would go here. 

{{
  <CodeLanguageToggle />
  <ToggleableCodeBlock 
    codeSnippet={BuildingPluginActivity}
  />
}}
