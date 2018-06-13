---
title: "China"
description: "Read official documentation on the Mapbox Android China Plugin which takes the Mapbox Map SDK for Android and configures it to maximize performance inside China."
prependJs:
  - |
    import {
      CHINA_PLUGIN_VERSION
    } from '../../../constants';
---

Traditional map services are either blocked in China or suffer from slow internet connections. Our Mapbox.cn infrastructure allows for unparalleled speed advantages for anyone using our maps in China or through Chinese mobile carriers internationally. This plugin specifically bundles the Mapbox Maps SDK for Android and automatically configures it to ensure the correct endpoints are being called. Additionally, one of the dependencies allows for annotation shifting, which ensures all your overlays and annotations are accurately being depicted on the map.

## Install the China Plugin
You'll need to add the appropriate dependencies inside of your `build.gradle` file to start developing an application using the China Plugin. Both dependencies include the Maps SDK for Android. Version bumps of this plugin tend to follow after a new release of the Maps SDK for Android. All dependencies given below can be found on Bintray.

### Choosing the right dependency
There are two dependency options, or flavors, available. The choice between the two ultimately comes down to the location of the app's end user - whether they are inside or outside of China. Using the Global flavor within China will result in slower speeds and loss of accuracy of coordinates. Using the China flavor corrects for these issues in two major ways. The first is the endpoints the Mapbox APIs get their data from. The China flavor makes all API requests and receives map tiles from within China, making the app up to 10x faster. The second difference is that the China flavor includes the [shift module](#shifting-annotations) allowing you to shift all of your map annotations to be accurately represented on top of the map. These flavors are interchangeable - switching between the two requires no changes in code other than changing the dependency name in the your 'build.gradle' file. This allows you the flexibility to have a single app for inside China, or an app with two equal flavors - one for within China and one for everywhere else.

### Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle`.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Decide on the appropriate flavor inside your App and add it to your dependencies.
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

```groovy
repositories {
  maven { url "https://mapbox.bintray.com/mapbox" }
}

dependencies {
  // China flavor dependency
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-china:{{ CHINA_PLUGIN_VERSION }}'

  // Global flavor dependency
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-china-global:{{ CHINA_PLUGIN_VERSION }}'
}
```

## Shrink dependency size
Android offers solutions to reduce the release size of your APK. The first is to use [ProGuard](https://developer.android.com/studio/build/shrink-code), which removes unused classes and methods from both your app and its dependencies (including this plugin). ProGuard is included inside Android and we highly recommend following the [official documentation](https://developer.android.com/studio/build/shrink-code) to get ProGuard setup.

Another option is to drop the architectures you do not need to support for your app users. The Mapbox SDK ships with four architectures:

- `arm64-v8a`
- `armeabi-v7a`
- `x86`
- `x86_64`

All of these files add up to the resulting APK size. If, for example, your app doesn't need `x86` support, you could drop `x86` and `x86_64` and save some space. This is done using ABI Splitting, a feature that lets you build an APK file for each CPU, only containing the relevant native libraries. This process is described in the [Android Studio Project Site](http://tools.android.com/tech-docs/new-build-system/user-guide/apk-splits#TOC-ABIs-Splits). Aside from the Mapbox Map SDK native libraries, the shift module native code will also be dropped and optionally split up if you set your project up to do so.

## Using the correct objects
The China Plugin for Android has wrapper classes to be used in place of their "typical" counterparts. For example, in the regular Maps SDK for Android, you'd use the `MapView` inside your activities' layouts. When using this plugin, a lint error will appear telling you to use the `ChinaMapView` instead, which wraps the `MapView` object. Under the hood, the `ChinaMapView` class does nothing more but set default values for optimal performance inside China. This includes hitting our inner China servers to serve up map tiles. In the provided chart below, you'll find a list of the objects which you'd typically use in the Map SDK for Android and their counterparts found inside of this plugin.

| Mapbox Map SDK for Android | China Plugin |
| --- | --- |
| `MapView` | `ChinaMapView` |
| `MapboxMapOptions` | `MapboxMapChinaOptions` |
| `MapboxDirections` | `MapboxDirectionsChina` |

As mentioned above, Android Lint will attempt to warn you when you are using the wrong Map classes. This does not occur in every instance, however, so we still recommend manually confirming that you are using the right object each time.

## China Map Styles
Mapbox currently offers 3 government-certified map styles for China that match the look of our equivalent Mapbox Streets, Dark, and Light styles, but with the benefit of upto 10x faster map loading. You can either manually hardcode the style inside your app or use the provided constants found inside this Plugin. The table below lists the Java constant, XML string constant, and the actual URL which can be hardcoded in your app.

| Java Constant | XML String | URL |
| --- | --- | --- |
| `ChinaStyle.MAPBOX_STREETS_CHINESE` | `mapbox_style_mapbox_streets_chinese` | `mapbox://styles/mapbox/streets-zh-v1` |
| `ChinaStyle.MAPBOX_LIGHT_CHINESE` | `mapbox_style_mapbox_dark_chinese` | `mapbox://styles/mapbox/light-zh-v1` |
| `ChinaStyle.MAPBOX_DARK_CHINESE` | `mapbox_style_mapbox_light_chinese` | `mapbox://styles/mapbox/dark-zh-v1` |

When using the constants found in this SDK you'll always be using the latest version of the map style when the plugin gets updated. Conversely, hardcoding allows you to have more control over the map style version and determining when your apps map style gets an update.

## Shifting annotations
In order to comply with the Chinese government's location requirements, we had to shift the base map for our default styles. This means you are required to also shift any annotations you place on top of your map so that it will match the shifted base map coordinate system. the module will convert WGS-84 into GCJ-02 standards. To better understand why shifting is required, we recommend reading [this wiki entry](https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China#The_China_GPS_shift_problem) and [this article](http://www.travelandleisure.com/articles/digital-maps-skewed-china).

In 0.4.0, the shifting of annotations is a manual process which requires you to pass in your `Location`, `LatLng`, or GeoJSON geometry types to the publicly accessible `ShiftForChina.shift(double lon, double lat)` method. The returning object is a `String` representing a JSONObject. Therefore, to convert it back to it's original form, you'll need to write:

```java
Location toLocation = new Location(fromLocation);
try {
  JSONObject jsonObject = new JSONObject(toJson);
  toLocation.setLongitude(jsonObject.getDouble("lon"));
  toLocation.setLatitude(jsonObject.getDouble("lat"));
} catch (JSONException jsonException) {
  jsonException.printStackTrace();
}
```

Do note that as mentioned above, the shift module is only available in the China Flavor of this plugin. This is the one exception to the rule mentioned above that you only need to switch dependency names if you'd like to support both global and China flavors of your app. In the case of a global version of your app, you'll need to remove the code that shifts your annotations. This will change in future releases of this SDK to make shifting much easier.
