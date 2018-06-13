---
title: "Introduction"
description: "Overview of the Mapbox Core Libraries for Android. Easily handle telemetry, device location, and connectivity for any app."
sideNavSections:
  - title: "Installation"
  - title: "ConnectivityReceiver"
  - title: "PermissionsManager"
  - title: "LocationEngine"
overviewHeaderProps:
  imageId: overviewCoreLibSdk
  sdk: Core Libraries
  versionConstant: CORE_VERSION
  changelogLink: "https://github.com/mapbox/mapbox-events-android/blob/master/CHANGELOG.md"
  ghLink: "https://github.com/mapbox/mapbox-events-android"
  sdkFeatures:
    - "Real-time device location"
    - "Checking and requesting permissions"
    - "Connectivity"
  newFeature:
    - false
    - false
    - false
prependJs:
  - "import { CORE_VERSION } from '../../../constants';"
---

# Core Libraries

The Mapbox Core Libraries for Android are a set of utilities that help you with permissions, device location, and connectivity within your Android project. With these libraries, you can:

- Check for, request, and respond to any number of Android system permissions such as device location or camera.
- Check for and respond to a change in the device's internet connectivity status.
- Retrieve a device's real-time location.

This core module has no dependencies on any of the other Mapbox Java modules and only depends on having the Android API plugin inside your project.


## Installation

### Gradle

1. Open Android Studio.
2. Open up your application's `build.gradle` file.
3. Make sure that your project's `minSdkVersion` is at API 14 or higher.
4. Under dependencies, add a new build rule for the latest `mapbox-android-core` version (see below).
5. Click on `Sync Project with Gradle Files` near the toolbar in Android Studio.

```groovy
implementation 'com.mapbox.mapboxsdk:mapbox-android-core:{{ CORE_VERSION }}'
```

_**Note:** ProGuard directives are included in the Android dependencies to preserve the required classes._

## ConnectivityReceiver

[`ConnectivityReceiver`](https://github.com/mapbox/mapbox-events-android/blob/39bd70151bded5413fa6db8378ba9e5d349b01d5/libcore/src/main/java/com/mapbox/android/core/connectivity/ConnectivityReceiver.java) is a `BroadcastReceiver` that helps you keep track of the device's connectivity status. When used statically by calling `getSystemConnectivity()`, the `ConnectivityReceiver` will always return the connectivity status as reported by the Android system. You have the option to set a `connectedFlag` when instantiating `ConnectivityReceiver`.

You can override the connectivity value reported by the system by setting this flag to `true` or `false`. If left in its default value (`null`), `ConnectivityReceiver` will report the system value. `ConnectivityReceiver` also lets you subscribe to connectivity changes using a `ConnectivityListener` interface.

### ConnectivityListener

`ConnectivityListener` is a callback that is used with the `ConnectivityReceiver`. You can implement the `ConnectivityListener` interface where you'd like and then will need to override its `onConnectivityChanged()` method. This method returns a `boolean`, which represents whether the device's new connectivity state is connected or not.

## PermissionsManager

If your Android project is built targeting API level 23 or higher your application will need to request permission during runtime. Handling this directly in your activity produces boilerplate code and can often be hard to manage. That's where the `PermissionsManager` class comes into play. With the `PermissionsManager` class, you can check whether the user has granted location permission and request permissions if the user hasn't granted them yet. You can use `PermissionsManager permissionsManager = new PermissionsManager(this);` if you're implementing `PermissionsListener`.

Once you have set up your permissions manager, you will still need to override `onRequestPermissionsResult()` and call the `permissionsManager`'s same method.

_**Note:** The `PermissionsManager` can be used for requesting other permissions in addition to location._

```java
PermissionsManager permissionsManager = new PermissionsManager(this);

if (PermissionsManager.areLocationPermissionsGranted(this)) {
  
} else {
  permissionsManager = new PermissionsManager(this);
  permissionsManager.requestLocationPermissions(this);
}

@Override
public void onRequestPermissionsResult(
int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
  permissionsManager.onRequestPermissionsResult(requestCode, permissions, grantResults);
}
```

### PermissionsListener

The `PermissionsListener` is an interface that needs to be set up and passed into the `PermissionsManager`'s constructor. You can use `permissionsManager = new PermissionsManager(this);` if you're implementing `PermissionsListener`. You'll notice that `PermissionsListener` overrides the `onExplanationNeeded()` and `onPermissionResult()` methods. An explanation isn't required but strongly encouraged to allow the user to understand why you are requesting this permission. 

The permission result is invoked once the user decides whether to allow or deny the permission. A boolean value is given, which you can then use to write an `if` statement. Both cases should be handled correctly. Continue with your permission-sensitive logic if the user approves. Otherwise, if the user denies, we recommend displaying a message that tells the user that the permission is required for your application to work.

```java
PermissionsListener permissionsListener = new PermissionsListener() {
  @Override
  public void onExplanationNeeded(List<String> permissionsToExplain) {

  }

  @Override
  public void onPermissionResult(boolean granted) {
    if (granted) {
      // Permission sensitive logic called here
    } else {
      // User denied the permission
    }
  }
};
```

## LocationEngine

If your application needs location information, the `LocationEngine` class can help you get this information while also simplifying the process and being flexible enough to use different services. The `LocationEngine` found in the core module now supports the following location providers:

- [LOST](https://github.com/mapzen/lost/)
- Google Play Services
- Android Location

If you are using the Mapbox Maps SDK for Android, create a `LocationEngine` object using: 

```java
LocationEngine locationEngine = new LocationEngineProvider(this).obtainBestLocationEngineAvailable();
```

This will obtain the best location engine that is available and eliminate the need to create a new `LocationEngine` from scratch.

### Getting location updates

It's required to either include the `mapbox-android-core` dependency or copy over the [LostLocationEngine class](https://github.com/mapbox/mapbox-events-android/blob/c4e28e8ec737fbbad543d495b084b5da86cf1b80/liblocation/src/main/java/com/mapbox/android/core/location/LostLocationEngine.java) into your project. You'll then want to initialize a new instance of `LocationEngine`, activate it, and optionally add a location listener. Inside `onConnected()`, you can begin requesting location updates or wait for the proper time to do so.

```java
LocationEngine locationEngine = new LocationEngineProvider(this).obtainBestLocationEngineAvailable();
locationEngine.activate();
locationEngine.addLocationEngineListener(new LocationEngineListener() {
  @Override
  public void onConnected() {
    locationEngine.requestLocationUpdates();
  }

  @Override
  public void onLocationChanged(Location location) {

  }
});
```

Rather than adding the `LocationEngineListener` like above, you can also implement the `LocationEngineListener` interface and override `onConnected()` and `onLocationChanged()`.

To prevent your application from having a memory leak, it is a good idea to stop requesting location updates inside of your activity's `onStop()` method and continue requesting them in `onStart()`.

```java
@Override
  protected void onStart() {
    super.onStart();
    
    mapView.onStart();

    if (locationEngine != null) {
      locationEngine.requestLocationUpdates();
    }
}

@Override
  protected void onStop() {
    super.onStop();
    
    if (locationEngine != null) {
      locationEngine.removeLocationUpdates();
    }
    
    mapView.onStop();
}
```

### Last location

If your application needs to quickly get a user's location, you can call the `getLastLocation()` which will return the user's last known position. `getLastLocation()` returns a `Location` object, which you can then use however you'd like.

_**Note:** Be careful when requesting the user's last location because it is possible for the last location to be `null`._

```java
Location lastLocation = locationEngine.getLastLocation();

if (lastLocation != null) {
  // Location logic here
  
}
```
