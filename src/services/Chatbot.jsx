import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.type = "text/javascript";

    // Define the script content
    script.innerHTML = `
      (function(d, t) {
        var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
        v.onload = function() {
          window.voiceflow.chat.load({
            verify: { projectID: '672236b610df1f272c356750' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production'
          });
        }
        v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; 
        v.type = "text/javascript"; 
        s.parentNode.insertBefore(v, s);
      })(document, 'script');
    `;

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Chatbot;