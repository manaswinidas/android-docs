---
title: "Location"
description: "Offical documentation about the Mapbox Android Location Layer Plugin. Show the Android device's location on a Mapbox Map in just a few quick steps."
sideNavSections:
  - title: "Install the Location Layer Plugin"
  - title: "Setup permissions"
  - title: "Lifecycles"
  - title: "Enabling or disabling the LocationLayerPlugin"
  - title: "Showing the user location with RenderMode"
  - title: "Following the user location with CameraMode"
  - title: "Usage with navigation"
  - title: "Gesture thresholds to dismiss camera tracking"
  - title: "Customization"
prependJs:
  - |
    import {
      LOCATION_LAYER_PLUGIN_VERSION
    } from '../../../constants';
---
# Location Layer
A popular, often critical feature is showing the users current location as an annotation to give a reference point on the map. This plugin makes use of the latest [runtime styling](/android-docs/map-sdk/overview/runtime-styling/) features to display the location icons/markers within the map itself rather than on top as an Android view. This brings several fixes and performance improvements previously experienced when using the now deprecated `MyLocationView`.

## Install the Location Layer Plugin
To start developing an application using the Location Layer Plugin, you'll need to add the appropriate dependencies inside your `build.gradle` file. This dependency includes the Maps SDK for Android. All dependencies given below can be found on MavenCentral.

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes.

### Add the dependency

1. Start Android Studio.
2. Open up your application's `build.gradle`.
3. Make sure that your project's `minSdkVersion` is API 15 or higher.
4. Under dependencies, add a new build rule for the latest `mapbox-android-plugin-locationlayer`.
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-locationlayer:{{ LOCATION_LAYER_PLUGIN_VERSION }}'
}
```

### Setup permissions
Before using the location layer plugin, you'll need to include either the coarse _or_ fine location permission inside your applications manifest.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.myapp" >
  ...
  <!-- Coarse location -->
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>

  <!-- Or fine location -->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
  ...
</manifest>
```

If your application's targeting Android 6.0 (API 23) or higher, you'll want to use the new permissions model which request permissions at runtime rather than during the installation process. It's important to request the permission either during the application startup or when the location layer gets initialized. [PermissionsManager](/android-docs/telemetry/overview/#permissionsmanager) is a utility offered as part of the Mapbox Java SDK package inside of the Maps SDK. It streamlines the permission request process.

### Lifecycles
It's important to include the location layer `onStart()` and `onStop()` lifecycle events in their respective activity methods. This prevents memory leaks from occurring and reduces battery consumption. The plugin has support for the new `LifecycleObserver` APIs, by adding the plugin as a lifecycle observer in your activity, you won't need to handle the lifecycles manually.

## Add the location layer
To initialize the Location layer plugin, you'll need to pass in both the map view and the `mapboxMap` object. Depending on whether or not you'd like the Location Layer to track the user's location automatically or not, you can either pass in a locationEngine or `null`.

```java
locationLayerPlugin = new LocationLayerPlugin(mapView, mapboxMap, locationEngine);
```

If no location engines provided, you are responsible for updating the location position manually using `LocationLayerPlugin#forceLocationUpdate(@Nullable Location location)`.

### Enabling or disabling the LocationLayerPlugin

There is a single method to either enable or disable the plugin:

- `LocationLayerPlugin#setLocationLayerEnabled(boolean isEnabled)`
- When disabled, this method will hide the icon showing the user location and cease map camera animations from occurring.
- The plugin is enabled by default.

### Showing the user location with RenderMode

`LocationLayerPlugin#setLocationLayerEnabled()` has now been replaced with `LocationLayerPlugin#setRenderMode(@RenderMode.Mode int renderMode)`.  This new method is not in charge of enabling or disabling the plugin.  If you change the render mode while the plugin is disabled, nothing will happen with regard to how the location is rendered.

There are three types of `RenderMode`:

| `RenderMode` | Description |
| --- | --- |
| `NORMAL` | This mode shows the user location, ignoring both compass and GPS bearing (no arrow rendered). |
| `COMPASS` | This mode shows the user location, as well as an arrow that is considering the compass of the device.  |
| `GPS` | This mode shows the user location with the icon bearing updated from the `Location` updates being provided to the plugin. |

`RenderMode.NORMAL`

{{
<AppropriateImage imageId="locationLayerNormal" className="block mx-auto pt18" />
}}

`RenderMode.COMPASS`

{{
<AppropriateImage imageId="locationLayerCompass" className="block mx-auto pt18" />
}}

`RenderMode.GPS`

{{
<AppropriateImage imageId="locationLayerGps" className="block mx-auto pt18" />
}}

**Note:** the `Drawable` icon for `RenderMode.GPS` is customizable via `LocationLayerOptions#foregroundDrawable()`

### Following the user location with CameraMode

The method `LocationLayerPlugin#setCameraMode(@CameraMode.Mode int cameraMode)` allows developers to track `Location` updates with the `MapboxMap` camera.  
There are currently 7 modes available:

| `CameraMode` | Description |
| --- | --- |
| `NONE` | No camera tracking. |
| `NONE_COMPASS` | Camera does not track location, but does track compass bearing. |
| `NONE_GPS` | Camera does not track location, but does track GPS `Location` bearing. |
| `TRACKING` | Camera tracks the user location, no bearing is considered. |
| `TRACKING_COMPASS` | Camera tracks the user location, tracking bearing provided by the device compass. |
| `TRACKING_GPS` | Camera tracks the user location, with bearing provided by a normalized `Location#getBearing()`. |
| `TRACKING_GPS_NORTH` | Camera tracks the user location, with bearing always set to north (0). |

Here are a few examples from [`LocationLayerModesActivity`](https://github.com/mapbox/mapbox-plugins-android/blob/master/app/src/main/java/com/mapbox/mapboxsdk/plugins/testapp/activity/location/LocationLayerModesActivity.java) in the plugin test application:

`CameraMode.NORMAL`

{{
<AppropriateImage imageId="locationLayerNormalGif" className="block mx-auto pt18" />
}}

`CameraMode.COMPASS`

{{
<AppropriateImage imageId="locationLayerCompassGif" className="block mx-auto pt18" />
}}

`CameraMode.GPS`

{{
<AppropriateImage imageId="locationLayerGpsGif" className="block mx-auto pt18" />
}}

### Gesture thresholds to dismiss camera tracking

This release includes integration with our new gesture library and options to adjust thresholds for tracking a user’s interaction with the map and subsequently, breaking camera tracking if the threshold is exceeded:

- `LocationLayerOptions#trackingInitialMoveThreshold(float)` adjusts the minimum single pointer movement in pixels required to break camera tracking.
- `LocationLayerOptions#trackingMultiFingerMoveThreshold(float)` adjusts minimum multi pointer movement in pixels required to break camera tracking (for example during scale gesture).
- If either of these thresholds are exceeded and tracking is dismissed, developers can listen to this with a `OnCameraTrackingChangedListener`:

```
  locationLayerPlugin.addOnCameraTrackingChangedListener(new OnCameraTrackingChangedListener() {
    @Override
    public void onCameraTrackingDismissed() {
      // Tracking has been dismissed
    }

    @Override
    public void onCameraTrackingChanged(int currentMode) {
      // CameraMode has been updated
    }
  });
```

## Usage with navigation
Once a navigation session's started using the [Mapbox Navigation SDK](/android-docs/navigation/overview/), a few adjustments will need to be made to the Location Layer plugin to improve the performance and behavior.

If you plan to use the snapped location provided by the navigation SDK, you'll need to use `locationLayerPlugin.setLocationEngine()` to `null` to prevent location coordinates that aren't snapped to update the icon location. Instead, you'll need to add `forceLocationUpdate()` inside the navigation SDKs `onProgressChange()` callback which _does_ provided the snapped location.

## Customization
The plugin allows for several customizations such as drawables, opacities, and more by passing in a style either while constructing the plugin or using the provided `applyStyle()` API. For example, if you'd like to change the location layer icon from the default blue to red, I'd first need to generate a new icon drawable showing the change, add the drawable to my project, and then create a new style with the parentLayout being `LocationLayer`. The snippet below shows all the currently customizable attributes.

```xml
<style name="CustomLocationLayer" parent="LocationLayer">
  <item name="foregroundDrawable">@drawable/custom_user_icon</item>
  <item name="backgroundDrawable">@drawable/mapbox_user_stroke_icon</item>
  <item name="bearingDrawable">@drawable/mapbox_user_bearing_icon</item>
  <item name="navigationDrawable">@drawable/mapbox_user_puck_icon</item>
  <item name="accuracyAlpha">0.15</item>
  <item name="accuracyColor">@color/mapbox_plugin_location_layer_blue</item>
</style>
```
