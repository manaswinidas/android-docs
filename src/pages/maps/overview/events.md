---
title: "Events"
description: "Documentation about map events within the Mapbox Maps SDK for Android. Read about map clicking, flinging, scrolling, and other Mapbox map events."
---

The Maps SDK provides various ways to listen to map events. The majority of listeners that the SDK offers are listed below. However, you'll occasionally find other listeners specific to their corresponding API inside other overview documents.

## Map click & long click events

Click (tap) events can be set up through the `MapboxMap` object and invoke a callback each time that the event occurs. In both cases, the callback provides a `LatLng` of where the user click occurred on the map. To add an onClick listener to your map, insert the following snippet inside your application's code:

```java
mapboxMap.setOnMapClickListener(new MapboxMap.OnMapClickListener() {
  @Override
  public void onMapClick(@NonNull LatLng point) {
    String string = String.format(Locale.US, "User clicked at: %s", point.toString())
    Toast.makeText(MainActivity.this, string, Toast.LENGTH_LONG).show();
  }
});
```

### Convert from screen pixel

In occasions when you need to know the corresponding location on the screen where the user gesture occurred, you can convert the LatLng point to screen pixels. The MapboxMap object provides the `Projection` from the map which allows you to convert between `LatLng` coordinates to screen pixel using `mapboxMap.getProjection().toScreenLocation(<LatLng>);`. The reverse is available when you have a screen location in pixels and need to convert it to a corresponding `LatLng` object.

A common use case for converting the values between `LatLng` and pixel coordinates is when you'd like to query a map layer or source to, for example, determine whether or not the users clicked on a POI. You can read more on how to do this in the [Query map features](/android-docs/map-sdk/overview/query/) documentation.

## Camera change events

The map's camera represents the view looking down on the maps flat plane. In almost all cases, you'll be interacting with the camera to adjust the map's starting zoom and target position. The user also can manipulate the camera by performing gestures on the map such as pinch-to-zoom, two-finger scroll to tilt, and single finger moves to adjust the position.

The Map SDK provides a handful of camera change listeners which can notify you of any or specific camera movements. Different camera listeners are given to determine if the camera movement was caused by a user gesture, built-in API animations, or a developer-controlled movement. The snippet below shows the various camera listeners available:

```java
mapboxMap.setOnCameraMoveStartedistener(new MapboxMap.OnCameraMoveStartedListener() {

  private final String[] REASONS = {"REASON_API_GESTURE", "REASON_DEVELOPER_ANIMATION", "REASON_API_ANIMATION"};

  @Override
  public void onCameraMoveStarted(int reason) {
    String string = String.format(Locale.US, "OnCameraMoveStarted: %s", REASONS[reason - 1])
    Toast.makeText(MainActivity.this, string, Toast.LENGTH_LONG).show();
  }
});

mapboxMap.setOnCameraMoveListener(new MapboxMap.OnCameraMoveListener() {
  @Override
  public void onCameraMove() {  
    Toast.makeText(MainActivity.this, "onCameraMove", Toast.LENGTH_LONG).show();
  }
});

mapboxMap.setOnCameraMoveCancelListener(new MapboxMap.OnCameraMoveCanceledListener() {
  @Override
  public void onCameraMoveCanceled() {
    Toast.makeText(MainActivity.this, "onCameraMoveCanceled", Toast.LENGTH_LONG).show();
  }
});

mapboxMap.setOnCameraIdleListener(new MapboxMap.OnCameraIdleListener() {
  @Override
  public void onCameraIdle() {
    Toast.makeText(MainActivity.this, "onCameraIdle", Toast.LENGTH_LONG).show();
  }
});
```

## On fling & on scroll events

Besides the camera change listeners, the `MapboxMap` object allows you to listen into when the user scrolls or flings the map. A scroll event occurs when the user drags a single finger across the screen causing the camera position to change. A similar action from the user will cause the `onFling` callback to be invoked, but the user performs the gesture with more momentum. Only one of these events will be fired once when the user performs the particular gesture.

```java
mapboxMap.setOnScrollListener(new MapboxMap.OnScrollListener() {
  @Override
  public void onScroll() {
    Toast.makeText(MainActivity.this, "onScroll", Toast.LENGTH_LONG).show();
  }
});

mapboxMap.setOnFlingListener(new MapboxMap.OnFlingListener() {
  @Override
  public void onFling() {
    Toast.makeText(MainActivity.this, "onFling", Toast.LENGTH_LONG).show();
  }
});
```

## Marker and info window events

The Maps SDK provides a handy listener for capturing when a user taps on a marker. By default, all markers come with an onMarkerClick event listener for displaying and hiding info windows. You can override this default event listener and set your own with the `setOnMarkerClickListener` method.

To display a toast message with the clicked marker’s title, listen for a click event with `setOnMarkerClickListener` and finally call Toast.makeText(). To prevent displaying a toast message and an info window at the same time, return true at the end:

```java
mapboxMap.setOnMarkerClickListener(new MapboxMap.OnMarkerClickListener() {
  @Override
  public boolean onMarkerClick(@NonNull Marker marker) {
    Toast.makeText(MainActivity.this, marker.getTitle(), Toast.LENGTH_LONG).show();
    return true;
  }
});
```

In a similar case, the info window offers a handful of listeners for being notified when an info windows clicked, long clicked, or when a user closes the window.

```java
mapboxMap.setOnInfoWindowLongClickListener(OnInfoWindowLongClickListener);
mapboxMap.setOnInfoWindowCloseListener(OnInfoWindowCloseListener);

mapboxMap.setOnInfoWindowClickListener(new MapboxMap.OnInfoWindowClickListener() {
  @Override
  public boolean onInfoWindowClick(@NonNull Marker marker) {
    return false;
  }
});
```

## Map change events

The map view goes through a series of events while building/changing the map. The `OnMapChangedListener` provided can be used to notify you when one or multiple events occur you're interested in. This includes knowing when the map starts and finishes loading the map style or when frames are finished rendering.

Instead of adding the listener through the `MapboxMap` object, the listeners added using the `MapView`, `mapView.addOnMapChangedListener(OnMapChangedListener());`. When a new map change occurs, the `onMapChanged` callback is invoked. This provides the constant, as an integer, as the parameter which you can then use to match up with one of the constants listed in the table below.

| MapChange Constants                       | Description |
|-------------------------------------------|--------|
| `REGION_WILL_CHANGE`                        | This event is triggered whenever the currently displayed map region is about to change without an animation. |
| `REGION_WILL_CHANGE_ANIMATED`               | This event is triggered whenever the currently displayed map region is about to change with an animation. |
| `REGION_IS_CHANGING`                        | This event is triggered whenever the currently displayed map region is changing. |
| `REGION_DID_CHANGE`                         | This event is triggered whenever the currently displayed map region finished changing without an animation. |
| `REGION_DID_CHANGE_ANIMATED`                | This event is triggered whenever the currently displayed map region finished changing with an animation. |
| `WILL_START_LOADING_MAP`                    | This event is triggered when the map is about to start loading a new map style. |
| `DID_FINISH_LOADING_MAP`                    | This is triggered when the map has successfully loaded a new map style. |
| `DID_FAIL_LOADING_MAP`                      | This event is triggered when the map has failed to load a new map style. |
| `WILL_START_RENDERING_FRAME`                | This event is triggered when the map will start rendering a frame. |
| `DID_FINISH_RENDERING_FRAME`                | This event is triggered when the map finished rendering a frame. |
| `DID_FINISH_RENDERING_FRAME_FULLY_RENDERED` | This event is triggered when the map finished rendering the frame fully. |
| `WILL_START_RENDERING_MAP`                  | This event is triggered when the map will start rendering the map. |
| `DID_FINISH_RENDERING_MAP`                  | This event is triggered when the map finished rendering the map. |
| `DID_FINISH_RENDERING_MAP_FULLY_RENDERED`   | This event is triggered when the map is fully rendered. |
| `DID_FINISH_LOADING_STYLE`                  | Triggered when a style has finished loading. |
| `SOURCE_DID_CHANGE`                         | Triggered when a source attribution changes. |

When the event that you were interested in actually occurs and you no longer need to listen to the map change events, `mapView.removeOnMapChangedListener(mapChangeListener)` can be used to remove the listener.
