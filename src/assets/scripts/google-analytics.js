import {environment} from "../../environments/environment";

/*
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-151517869-1"></script>
<script>
  // window.dataLayer = window.dataLayer || [];
  // function gtag(){dataLayer.push(arguments);}
  // gtag('js', new Date());
  //
  // gtag('config', 'UA-151517869-1');
</script>
*/

export function googleAnalyticsHeadScripts() {
  const head = document.getElementsByTagName('head')[0];
  const googleAnalyticsFirstScript = document.createElement('script');

  googleAnalyticsFirstScript.async = true;
  googleAnalyticsFirstScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.analytics.code;

  const googleAnalyticsSecondScript = document.createElement('script');
  googleAnalyticsSecondScript.innerHTML = 'window.dataLayer = window.dataLayer || [];\n' +
    '    function gtag(){dataLayer.push(arguments);}\n' +
    '    gtag(\'js\', new Date());\n' +
    '\n' +
    '    gtag(\'config\', \'' + environment.analytics.code + '\');';

  head.insertBefore(googleAnalyticsSecondScript, head.firstChild);
  head.insertBefore(googleAnalyticsFirstScript, head.firstChild);
}

export function googleAnalytics(url) {
  gtag('config', environment.analytics.code, {'page_path': url});
}
