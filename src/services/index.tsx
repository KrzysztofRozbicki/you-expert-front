const facebookAppId =
  process.env.REACT_APP_FACEBOOK_APP_ID;

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

// let FB = window.FB

export function initFacebookSdk() {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) return null;
  return new Promise((resolve) => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v11.0'
      });
      window.FB.getLoginStatus((authResponse) => {
        if (authResponse.status === 'unknown') {
          // window.FB.login(function(response){
          //     // handle the response
          //   });
        }
        if (authResponse.authResponse === null) {
        }
        if (authResponse) {
          // accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
        } else {
          resolve(authResponse);
        }
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
}
