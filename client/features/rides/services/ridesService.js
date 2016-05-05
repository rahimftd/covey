angular.module('covey.rides')
.service('ridesHelpers', function () {
  // this.getUsersRide = (ride) => {
  //   let ridingWith = 'No rides organized yet.';
  //   // for (let i = 0; i < rides.length; i++) {
  //   //   console.log('RIDE OBJECT: ', rides[i]);
  //   //   if (rides[i].passengers.indexOf(user) > -1) {
  //   //     ridingWith = `You're riding in ${rides[i].driverName}'s car.`;
  //   //     break;
  //   //   } else if (rides[i].driverName === user) {
  //   //     ridingWith = 'You\'re driving!';
  //   //     break;
  //   //   }
  //   // }
  //   return ridingWith;
  // };

  this.checkPassenger = (driver, rides) => {
    let isPassenger = null;
    rides.forEach((ride) => {
      if (ride.passengers.indexOf(driver) > -1) {
        isPassenger = ride.id;
      }
    });
    return isPassenger;
  };
})
.service('ridesHttp', function ($http, $routeParams) {
  this.getAllRides = () => {
    return $http.get(`/api/rides/${$routeParams.coveyId}`)
    .then((rides) => rides.data, (error) => {
      console.error(error);
    });
  };

  this.addRide = (newRide) => {
    newRide.coveyId = $routeParams.coveyId;
    console.log('READY TO POST NEW RIDE: ', newRide);
    return $http.post('/api/rides', newRide)
      .then((response) => response, (error) => {
        console.error(error);
      });
  };

  this.getAllRiders = (rideId) => {
    return $http.get(`/api/riders/${rideId}`)
    .then((riders) => riders.data, (error) => {
      console.error(error);
    });
  };

  this.addPassenger = (rideId, userId) => {
    return $http.post(
      `/api/riders/${rideId}/${userId}`,
      {
        rider: userId,
      }
    ).then((response) => response, (error) => {
      console.error(error);
    });
  };
});
