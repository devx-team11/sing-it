import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const shareToMessenger = (snippetURI) => () => {

  let message = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements": [{
          "title": "I'll just sing it instead...'",
          "default_action":{
            "type":"web_url",
            "url": snippetURI
          },
          "buttons":[{
            "type":"web_url",
            "url": snippetURI,
            "title": "Listen to my song!"
          }]
        }]
      }
    }
  }

  window.MessengerExtensions.beginShareFlow((share_response) => {
    // User dismissed without error, but did they share the message?
    if(share_response.is_sent){
      // The user actually did share. 
      // Perhaps close the window w/ requestCloseBrowser().
      
      window.MessengerExtensions.requestCloseBrowser(null, null)
    }
  }, (errorCode, errorMessage) => {      
    // An error occurred in the process
    console.log(`Error (#${errorCode}): ${errorMessage}`)
  }, message, "current_thread")
}

export default ({ snippetURI }) => {
  return (<RaisedButton label="Share to Messenger" onClick={shareToMessenger(snippetURI)}/>)
};