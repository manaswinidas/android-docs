---
title: "Camera Engine"
description: "Fine grain control over the map camera during your Android app navigation experience with the Mapbox Navigation SDK for Android. Click to learn how."
---

`MapboxNavigation` creates a `SimpleCamera` by default that you can access with the
`MapboxNavigation#getCameraEngine()` method.

`SimpleCamera` extends from `Camera` and is required to provide values for bearing,
tilt, zoom, and a target `Point` given a `RouteInformation`.

A `RouteInformation` object can be created from a `DirectionsRoute`, `Location`, or `RouteProgress`.
Depending on which objects are provided, `SimpleCamera` will return a value for each camera method:

```java
RouteInformation.create(DirectionsRoute route, Location location, RouteProgress routeProgress);
```

For example, if `RouteInformation` has a `Location`, the `SimpleCamera` will return the
`LocationBearing` for the camera bearing. This bearing value represents the GPS system's understanding of where the user is going:

```java
@Override
  public double bearing(RouteInformation routeInformation) {
    if (routeInformation.location() != null) {
      return routeInformation.location().getBearing();
    }
    return 0;
  }
```

You can then use the returned `bearing` to update the `MapboxMap` camera:

```java
double bearing = cameraEngine.bearing(routeInformation);
CameraPosition position = new CameraPosition.Builder()
  .bearing(bearing)
  .build();
mapboxMap.easeCamera(CameraUpdateFactory.newCameraPosition(position));
```

## Creating a custom `Camera`
The Navigation SDK provides a `SimpleCamera` by default. You're also able to create your
own `CameraEngine` and give it to the Navigation SDK like so: `MapboxNavigation#setCameraEngine(CameraEngine cameraEngine)`.

An example of this would be the `DynamicCamera` provided by the `libandroid-navigation-ui`
library. In [`DynamicCamera`](/android-docs/navigation/overview/navigation-ui/#navigationcamera), calculations are being made based on the user's location along the given route.
