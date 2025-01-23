/*


Cross-Origin Resource Sharing (CORS) is a security feature implemented by web 
browsers to restrict web applications from making requests to domains other 
than their own. Let's delve into the details of CORS:

CORS is a mechanism that allows servers to specify who can access their 
resources by adding specific HTTP headers to their responses.
It provides a way for servers to declare which origins are allowed to access 
their resources and which HTTP methods are permitted for cross-origin requests.

Same-Origin Policy:
Before CORS, web browsers enforced the Same-Origin Policy, which restricts web 
pages from making requests to domains other than the one from which they 
originated.
This policy prevents malicious websites from accessing sensitive data or 
executing unauthorized actions on behalf of users.

Cross-Origin Requests:
A cross-origin request occurs when a web page hosted on one domain makes a 
request to a resource hosted on another domain.
These requests include XMLHttpRequest (XHR) or Fetch API requests initiated by 
client-side JavaScript code.

CORS Workflow:
When a web application makes a cross-origin request, the browser sends a 
preflight request (OPTIONS) to the server to determine if the actual request 
(GET, POST, etc.) is allowed.
The server responds with CORS headers indicating whether the request is allowed 
from the specified origin, HTTP methods, and other relevant information.
If the preflight request is successful and the server allows the request, the 
actual request is sent.

CORS Headers:
CORS headers are included in HTTP responses to control access to resources 
from different origins.
The primary CORS headers include:

Access-Control-Allow-Origin: Specifies which origins are allowed to access the 
resource. It can be a specific origin, "*", or null.

Access-Control-Allow-Methods: Indicates which HTTP methods (GET, POST, etc.) are 
permitted for cross-origin requests.

Access-Control-Allow-Headers: Lists the HTTP headers that can be used in the 
actual request.

Access-Control-Allow-Credentials: Specifies whether cookies and other credentials 
should be included in cross-origin requests.

Handling CORS Errors:
If a cross-origin request is made without proper CORS headers or is not allowed 
by the server, the browser blocks the request and generates a CORS error.
Developers can handle CORS errors by configuring the server to include 
appropriate CORS headers or by proxying requests through their own server.

Security Implications:
CORS helps mitigate security risks associated with cross-origin requests by 
providing a mechanism for servers to control access to their resources.
Properly configuring CORS policies helps prevent unauthorized access to 
sensitive data and resources, reducing the risk of Cross-Site Scripting (XSS) 
and Cross-Site Request Forgery (CSRF) attacks.


*/