---
title: "Navigation Options"
description: "Mapbox documentation about navigation options within the Mapbox Navigation SDK for Android. Custom notifications, off-route thresholds, and even more."
---

The Navigation SDK for Android has default constants used during navigation, such as the duration or distance an event must occur. However, you might find yourself wanting to adjust these values to your liking in some situations. The `MapboxNavigtionOptions` object allows for tweaking all of the default values for maneuver zone thresholds, tolerance for offline, etc. The `MapboxNavigation` object constructor optionally takes in an instance of the `MapboxNavigtionOptions` object and uses the values set inside of the options class until `MapboxNavigation`'s destroyed.

The `MapboxNavigationOptions` class uses a `builder()` to set any required default values.
You can then adjust any variables needed in the class before passing your options to `MapboxNavigation`.
```java
MapboxNavigationOptions options = MapboxNavigationOptions.builder()
  .maneuverZoneRadius(70)
  .build();

navigation = new MapboxNavigation(this, Mapbox.getAccessToken(), options);
```

Here is additional information on _some_ of the APIs that are exposed inside of the options object and that allow tweaking of the navigation behavior.

## Adjusting step completion thresholds

Two heuristics are considered when the user has completed the current step and is on the next step. The first value that's adjustable is the `ManeuverZoneRadius` which the user must enter to count as completing a step. _The value to set should be in unit meters_. The other determining factor is the `MaxTurnCompletionOffset`. Adjusting this value to a smaller acceptable degree angle narrows the scope. Increasing the value also increases the scope.

## Off-route threshold

Part of the off-route detection involves measuring the distance between the user's exact location and the snapped-to-route location. The user is potentially considered off route if the distance is greater then the set `MaximumDistanceOffRoute`. This threshold can also be adjusted using the `MapboxNavigationOptions` object. You can also adjust the seconds before a re-route occurs by using the `setSecondsBeforeReroute()` API. The default is three seconds.

## Creating a custom notification

You can also pass in a custom notification when creating `MapboxNavigtionOptions`. This notificiation will show once navigation begins.

```java
CustomNavigationNotification customNavigationNotification = new CustomNavigationNotification(this);
MapboxNavigationOptions options = MapboxNavigationOptions.builder()
  .navigationNotification(customNavigationNotification)
  .build();
```

Your notification must implement `NavigationNotification`:

```java
public class CustomNavigationNotification implements NavigationNotification {

  private static final int CUSTOM_NOTIFICATION_ID = 91234821;

  private Notification customNotification;
  private NotificationCompat.Builder customNotificationBuilder;
  private NotificationManager notificationManager;
  private int numberOfUpdates;

  public CustomNavigationNotification(Context context) {
    // Get the notification manager to update your notification
    notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

    // Store the builder to update later
    customNotificationBuilder = new NotificationCompat.Builder(context, NAVIGATION_NOTIFICATION_CHANNEL)
      .setSmallIcon(R.drawable.ic_navigation)
      .setContentTitle("Custom Navigation Notification")
      .setContentText("Display your own content here!");

    // Build the notification
    customNotification = customNotificationBuilder.build();
  }

  @Override
  public Notification getNotification() {
    return customNotification;
  }

  @Override
  public int getNotificationId() {
    return CUSTOM_NOTIFICATION_ID;
  }

  @Override
  public void updateNotification(RouteProgress routeProgress) {
    // Update the builder with a new number of updates
    customNotificationBuilder.setContentText("Number of updates: " + numberOfUpdates++);

    // Notify the notification manager
    notificationManager.notify(CUSTOM_NOTIFICATION_ID, customNotificationBuilder.build());
  }
}
```

The method `NavigationNotification#updateNotification(RouteProgress routeProgress)` will be called
every time that the Navigation SDK creates a new `RouteProgress` update. This is your opportunity
to change anything in your notification that you'd like to update. Use a `NotificationManager` and
your notification ID to notify the manager.

## Adjusting location validation thresholds

`MapboxNavigationOptions` also gives you the ability to adjust the thresholds that determine valid or invalid
`Location` updates that come from the device.  

There are 4 variables that can be adjusted:

- `locationAcceptableAccuracyInMetersThreshold`:  This variable is used to determine if a `Location` update is considered acceptable or not based on `Location#getAccuracy()`. The accuracy is measured in meters. The remaining checks do not execute if the location accuracy is below this threshold. For example, the update will be considered _valid_ if an update is received with an accuracy of `20` and
the threshold is set to `50`.
- `locationAccuracyPercentThreshold`: This variable is used when an update is received that has _worse_ accuracy.  It defines, based on
a percentage, how much worse the next `Location` update may be to still be considered valid.  If this variable is set to `10`, an update with
an accuracy that is less than `10` percent worse compared to the previous, will still be considered valid.  
- `locationUpdateTimeInMillisThreshold`: This variable is used as the maximum amount of time that the Navigation SDK will discard invalid updates if continuously given inaccurate updates. If set to `5` and the phone receives a series of inaccurate updates, `5` seconds will pass, then the next update will be considered valid regardless of its accuracy.  
- `locationVelocityInMetersPerSecondThreshold`:  This variable is used to define the maximum velocity that the Navigation SDK considers valid. If the device receives a rogue location update that is far from the last update, the velocity, measured in meters-per-second, will be invalid / will detect the jump from the rogue update. The velocity is calculated from the previous to the new update (that is being validated).
