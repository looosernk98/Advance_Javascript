/*
  Cookies in JavaScript are small pieces of data stored on the user's computer 
  by their web browser while they are browsing a website. They are primarily 
  used to store user-specific information to improve the user experience

  Cookies are key-value pairs that a web server sends to the browser. These 
  cookies are then stored locally by the browser and sent back to the server 
  with each subsequent request to the same domain. 

   NOTE: cookies are stored in RAM. Cookies location can be vary depending on 
         browsers.For chrome , cookies location is
         C:\users\user_name\AppData\local\Google\Chrome\userData\Default

  Cookies are part of the HTTP protocol and can be set and accessed using 
  JavaScript or HTTP header


  They are commonly used for:
  1. Session management: Keeping users logged in, managing shopping cart contents, etc.
  2. Personalization: Storing user preferences, such as theme or language.
  3. Tracking: Analyzing user behavior for analytics and targeted advertising.


  JavaScript provides a way to read, write, and delete cookies using the 
  document.cookie property.

*/

//********************** Working with cookies *********************************/

/*
 1. Reading Cookies:
    The document.cookie property allows you to access all cookies available for 
    the current domain. It returns a single string containing all cookies, 
    separated by semicolons

    console.log(document.cookie);
    // Output: "username=Niranjan; theme=dark; isLoggedIn=true"

 2. Writing Cookies:
    You can set a cookie using the document.cookie property

    syntax =>  document.cookie = "key=value; expires=DATE; path=PATH";

    document.cookie = "username=Niranjan; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/";

    -> key=value: The key-value pair for the cookie.
    -> expires: Sets an expiration date for the cookie. If omitted, the cookie 
       becomes a session cookie and is deleted when the browser is closed.
    -> path: Specifies the URL path the cookie is valid for. Defaults to the 
       current path.

3. Deleting Cookies:
   To delete a cookie, set its expiration date to a past date:

   document.cookie = "username=Niranjan; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

4. Modifying Cookies:
   You can overwrite an existing cookie by setting it again with the same name 
   and path.

*/

//*********************** Attributes in cookies ********************************/

/*
 1. ;domain=domain : The host to which the cookie will be sent. If not specified, 
                    this defaults to the host portion of the current document 
                    location and the cookie is not available on subdomains. If a 
                    domain is specified, subdomains are always included. Contrary 
                    to earlier specifications, leading dots in domain names are 
                    ignored, but browsers may decline to set the cookie containing 
                    such dots.
    Note: The domain must match the domain of the JavaScript origin. Setting 
          cookies to foreign domains will be silently ignored.

2. ;expires=date-in-UTCString-format: The expiry date of the cookie. If neither 
           expires nor max-age is specified, it will expire at the end of session.

3. ;max-age=max-age-in-seconds: The maximum age of the cookie in seconds 
                               (e.g., 60*60*24*365 or 31536000 for a year).

4. ;partitioned: Indicates that the cookie should be stored using partitioned 
                 storage. See Cookies Having Independent Partitioned State (CHIPS) 
                 for more details.

5. ;samesite: The SameSite attribute of a Set-Cookie header can be set by a server 
              to specify when the cookie will be sent. Possible values are lax, 
              strict or none (see also Controlling third-party cookies with 
              SameSite).

    -> lax: The lax value will send the cookie for all same-site requests and 
            top-level navigation GET requests. This is sufficient for user 
            tracking, but it will prevent many Cross-Site Request Forgery 
            (CSRF) attacks. This is the default value in modern browsers.

    -> strict: The strict value will prevent the cookie from being sent by the 
              browser to the target site in all cross-site browsing contexts, 
              even when following a regular link.

    -> none: The none value explicitly states no restrictions will be applied. 
            The cookie will be sent in all requests—both cross-site and same-site.


6. ;secure: Specifies that the cookie should only be transmitted over a secure 
            protocol.


Some user agent implementations support the following cookie prefixes:

__Secure:  Signals to the browser that it should only include the cookie in 
           requests transmitted over a secure channel.

__Host:  Signals to the browser that in addition to the restriction to only use 
         the cookie from a secure origin, the scope of the cookie is limited to a 
         path attribute passed down by the server. If the server omits the path 
         attribute the "directory" of the request URI is used. It also signals 
         that the domain attribute must not be present, which prevents the cookie 
         from being sent to other domains. For Chrome the path attribute must 
         always be the origin.
         
Note: These flags are only settable with the secure attribute.
*/

//********************** Key Features & limitations ************************************/

/*
 Key Features of Cookies:

 1. Size: A single cookie can hold up to 4 KB of data.
 2. Scope: Cookies are domain-specific and can also be path-specific, meaning 
           they are sent only to the pages within the defined scope.
 3. Expiration: Cookies can have an expiration date after which they are 
               automatically deleted.
 4. Security: Cookies can be marked as Secure (sent only over HTTPS) or
              HttpOnly (accessible only to the server, not JavaScript).


Limitations of Cookies:

1. Storage Size: Limited to around 4 KB per cookie.
2. Performance: Cookies are sent with every HTTP request, which can increase 
               bandwidth usage for large cookies.
3. Security: Cookies can be susceptible to cross-site scripting (XSS) attacks if 
             not handled properly.
*/


//***************************** Security *************************************/
/*
 It is important to note that the path attribute does not protect against 
 unauthorized reading of the cookie from a different path. It can be easily 
 bypassed using the DOM, for example by creating a hidden <iframe> element with 
 the path of the cookie, then accessing this iframe's contentDocument.cookie 
 property. The only way to protect the cookie is by using a different domain or 
 subdomain, due to the same origin policy.

 Cookies are often used in web applications to identify a user and their 
 authenticated session. Stealing a cookie from a web application leads to 
 hijacking the authenticated user's session. Common ways to steal cookies include 
 using social engineering or by exploiting a cross-site scripting (XSS) 
 vulnerability in the application
*/

// The server tells the client to store a cookie
/*
    HTTP/1.0 200 OK
    Content-type: text/html
    Set-Cookie: cookie_name1=cookie_value1
    Set-Cookie: cookie_name2=cookie_value2; expires=Sun, 16 Jul 3567 06:23:41 GMT
*/

// The client sends back to the server its cookies previously stored

/*
 GET /sample_page.html HTTP/1.1
 Host: www.example.org
 Cookie: cookie_name1=cookie_value1; cookie_name2=cookie_value2
 Accept: /
*/

/*
 An HttpOnly cookie is a type of cookie that cannot be accessed via JavaScript 
 (e.g., document.cookie). It is only sent in HTTP requests to the server.

 The main reason: Security — it protects the cookie from cross-site scripting 
 (XSS) attacks.

 With HttpOnly, sensitive cookies like authentication tokens are not visible, 
 even if the attacker injects a script.
*/