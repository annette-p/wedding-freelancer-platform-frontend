# Wedding Freelancer Platform

## Demo

A live website of the application can be found here:

* **Frontend** (React framework): https://practical-kare-5c381b.netlify.app/
* **Backend** (node.js/Express and MongoDB): https://annette-p-freelancer-platform.herokuapp.com/

Setup instructions: [Frontend](DEVELOPMENT.md) | [Backend](https://github.com/annette-p/wedding-freelancer-platform-backend/blob/main/README.md)

## Company and Product Summary

### Company and user goal

|   |Key stakeholders|Goals|
|---|---|---|
|**Owner**|Online pre-wedding rental business|• Treat this (freelancer platform) as separate business entity for data collection and future business expansion.<br>• Solve customer’s pain points (both freelancer and customer who are looking to engage the service).<br>• Brand awareness (indirectly promote the existing rental brand).<br>• Potential of turning this platform into marketplace and monetize in future.|
|**Users**|Freelancer – (photographer, videographer, make-up artist)|• Platform to promote themselves, persona business and the services|
|**Users**|Customers|• Alternative to reduce the risks of getting bad services for one of their most important day<br>• Choices of selection and with rating & review makes decision easier|

### Product goal

Provide platform for photographer, videographer, and makeup-artist to list their profile and service, show case of their past portfolios and etc. Connect the freelancers with the potential customers through the platform. User content creation from both listing added by freelances and reviews/rating contributed by customers. 

## Product & Features

|Features|Benefits to Users|Benefits to Company|
|---|---|---|
|**Listing**|Ability to add listing to promote their services:<br>o showcase of their past portfolios<br>o provide their social media account for references an to gain more follower.<br>o	Contact details for potential customers to contact directly for job engagement.<br>o Possibility to connect to more client through the platform and start making money from their talents.<br>o The higher rating and good review received is, the higher visibility and credibility on the profile will be.<br>o The customer who are looking to engage photography/videography/makeup-artist will be benefit from many listings provided, to find the choices of freelancers with the budget they have. |o Address both freelancers and customer’s pain points<br>o The more listing being listed on the site, the more reviews and rating and other type of content being contribute by users, the increase in traffic and site visit will be.<br>o More listing, reviews and other type of content being contribute by users, the more data being collected for future development and improvement or pivot to new ideas in future.<br>o Potential of turning this platform into marketplace and monetize in future|
|**Review and rating contribution**|o The customers who engaged the services of any freelancers can provide rating and reviews to inform other customers of the services they had received.<br>o The freelancers will be able to boost up their profile from those review contribute by other customers.<br>o Those reviews and rating will help other customers in making decision with ease and makes their choices easier.|o Address both freelancers and customer’s pain points<br>o The more listing being listed on the site, the more reviews and rating and other type of content being contribute by users, the increase in traffic and site visit will be.<br>o More listing, reviews and other type of content being contribute by users, the more data being collected for future development and improvement or pivot to new ideas in future.<br>o Potential of turning this platform into marketplace and monetize in future|
|**Search and filtering**|o Ability to perform search on the listing by any key words. The system will match those key words to existing record in database across freelancer profile, portfolios, description and reviews.<br>o Ability to select the pre-defined filtering provided by platform (e.g. filter by rate range per hour or session).|o Provide better UX of the products. With better UX, will be more usage on the platform. |
|**Feedback form**|o Both customers are freelancers can send feedback to the site owner on whatever suggestion or request they might have or wish to improve the usability.|o Ability to collect more data through feedback and suggestion (this includes the data of customers deciding to delete the account) for any future improvement or new business idea.|
|**Account and profile creation**|o Provide choices for freelancer to create their account (user credential) and profile in the platform with ability to perform update or manage their profile in the future (edit listing, change or update portfolio, etc)|o Allow full data collection of the freelancers and ability to keep up to date data when freelancer updated their profile.|
|**Just create profile (listing) without account creation**|o Freelancers have options to just list their profile details on the platform and leave the listing on the platform to continue advertised their services without create any user login credential.<br>o No ability to modify or delete the listing|o This to serve benefit for site owner to collect data. Data will still be collected by the platform.|
|**Deletion of the account and the listing**|o Freelancers can delete their account and profile when they decided not to use the platform for any reason.|o The account will be removed from the platform DB<br>o The data provided for the reason to leave the platform will be collected and stored separately for future revision.|

### Listing page

TO ADD IMAGE

Overview:

* On the listing page, display all freelancers profile at a quick glance .
* Show their rate charge, total reviews, average rating.
* Display overall profile (name, linkable to each of their social media accounts, the type of services they provide).
* Buttons to view more details of the profile and to give the review to each respective freelancer.
* Ability to perform search by keywords or select the pre-defined filtering provided (e.g rat range).

### View Profile page

TO ADD IMAGE

Overview: 

* To see more details of that respective freelancer.
* Display contact details so customer can contact the freelancer directly for any gig engagement.
* Bio of that respective freelancer to tell customer about them.
* Portfolios images and cations to tell more about their past work experiences. Those are being **automatically displayed one by one into carousel display.**
* Include the ratings that each customer reviews on this respective freelancer.
* Buttons to give review to this freelancer. **Customers are able to give the review from this page.**
* **The reviews and rating are sticky managed by admin of the site. The freelancers are unable to modify nor delete the reviews. This is to maintain the integrity and authentic of the review. However, freelancers are able to send in the request to remove the review.**

### Give Review page

TO ADD IMAGE

### Feedback page

TO ADD IMAGE

### Registration page

TO ADD IMAGE

Overview: 

* To serve the requirement of the site owner (business) and the customers (freelancer), the registrations are done in two options: 

**Create account and Profile**

* Create account (user credential) and profile listing in the same form. But **implement function to extract/remove the login credential to store them separately**
* So, only the profile details section to display on the listing page
* This provides **ability to perform update or manage their profile in the future (edit listing, change or update portfolio, etc)**
* **For the site owner, this allows full data collection of the freelancers and ability to keep up to date data when freelancer updated their profile.**
* For **security reason, perform password encryption before storing into DB. So, when retrieve password, using the function to encrypted the given password and compare with the encrypted password in DB (bcrypt.compare)**

**Create Profile**

* This is just to create listing. To list profile details on the platform and leave the listing on the platform to **continue advertised the services without create any user login credential.**
* This provides **ability to still listing and when the user do not fully trust on the site yet.**
* **For the site owner, this allows data collection. Data will still be collected by the platform.**

### Login page

TO ADD IMAGE

Overview:

* Use browser session storage to keep track of the authenticated freelancer. The browser will store the authenticated freelancer as an object (the profile data being retrieve but no login credential will be shown or capture in browser

### Manage Profile page

TO ADD IMAGE

Overview:

* Breakdown into several section for good UX because it is unlikely that we will want to change all part of our profile. Freelancer can choose to update their profile in any section anytime. 
* Each section will display the form accordingly with existing data auto populated. 
* They can perform update of the profile, change password and delete account. 
* The successful message or failure message will be displayed accordingly as per validation setup from react and express. 

## UX/UI

### Users

|Users|Description|
|---|---|
|**Freelancer**|(Photographer, videographer, make-up artist)<br>Individual photographer, videographer and make-up artist who are specialized in wedding filed, looking to promote their services and gain more projects over completive marketplace.|
|**Customer**|Someone who is looking to engage either photographer, videographer, make-up artist for their important event with some level of trust and verification on the reviews by other customers.|
|**Events**|Such as engagement day, proposal, pre-wedding, wedding/ROM, maternity photography and new-born photography. |

### User Needs and Pain Points

|   |Needs|Pain Points|
|---|---|---|
|**Freelancer**|o To promote themselves or services to attract more clients|o Not well-known enough and need to build up profile fast.<br>o Too little freelance Work, need more clients.|
|**Customer**|o	To get good services and the result that delivered the actual promised outcome (__what I get__ vs __what I expected__, must be match)<br>o Want to get the reliable and trusted reviews that helps making decision better.|oThe outcome of the services (make-up, photo or video) is not closed to what has been discussed.<br>o This (highly) potentially ruin the important day and the unhappiness that last after that.|

### Wireframe

For full details of wireframe, refer [here]().  **TO UPDATE**

### Surface Plane

**Responsiveness**

This website is responsive to small, medium and large screen sizes. It is a mobile first approach application. And it is single page application.

### Colours

TO ADD IMAGE

_See attached pdf for more_

**Pink and grey combination**: use this combination as the theme and the branding mood and tone for the platform. Pink represents sweetness, femininity, romantic, youth, innocent and playfulness. While grey represents neutrality and balance. Grey has a very soothing and cooling presence.

Since this is a platform for freelancer that specialized in wedding fields. The platform serves 2 different types of users. Hence, the combination serves the purpose of platform mood and tone. 

### Typography

Using **google font (Montserrat, sans-serif)**: its simple geometric letters which make the design appealing and have a large X-height. It provides the vibes of trust and can go best with maximum fonts. The font has a charming tale, features friendly and open curves.  This makes for a more natural reading rhythm more commonly found in humanist and serif types.

### Layout

**Collapsible Tab** is used to make sure the map can be viewed unobstructed across devices of all sizes and user can hide and show the search options as desired. 

**Stackable column** is applied to smaller screen size for better UX and readability. 

## Technologies Used

### Frontend

|Technology|Description|
|---|---|
|**HTML 5**|To structure the content of the website.|
|**CSS**|To add stylistic touches to the website.|
|**Bootstrap 5.1**|To structure the layout of the website (i.e. cards, modal, interactive container) and ensure website is mobile responsiveness.|
|**React  Bootstrap v2.0.0<br>(Bootstrap 5.1)**|To use Navbar, collapse tools that compatible with React framework. |
|**GoogleFonts**|To style the typography on the website to enhance the visual experience of users.|
|**FontAwesome**|Uses the icons provided by FontAwesome to enhance the user experience by making user interaction with the application more intuitive.|
|**React Framework**|To create component-based interactive UIs.|
|**Email JS**|To securely send email from Javascript. In this contact, mainly use to receive feedback from user submission through this _"freelancer platform"_ application. |

### API & DB

|Technology|Description|
|---|---|
|**node.js / Express**|Backend web application framework for Node.js to build web applications and APIs. To connect the react frontend to MongoDB. |
|**MongoDB**|Cross-platform document-oriented database (NoSQL database program). To persistent data storage.|

## Software Application Development

Here are some test cases of some features available on this application as to demonstration 

### User Story, Test Case and Acceptance Criteria 

|Test Case Scenario|Test Scope|User Story|Acceptance Criteria|Failure Criteria|
|---|---|---|---|---|
|Listing|View listing|As user, I want to be able to view all freelancer listing at one glance so that I know what are my choices to browse through.<br>As user, I want to be able to know quickly of how many reviews each respective freelancer has, their average reviews and service rate so that I can make quick decision.|o	List of freelancer profiles display on the listing page in a card by rows and columns<br>o The indication of specialisation, rate charge per hour or session, their showcase image, number of reviews, average rating must be shown on each freelancer card listing<br>o The social media account icon must be clickable and link to that respective social media account provided by freelancer<br>o The card must have button to view more details about the respective freelancer.|o List of freelancer’s profiles are not displayed properly in card or some information are missing and are not being arrange properly by rows and columns<br>o The useful information that help users to be able to make quick decision are missing or not being displayed properly<br>o The social media icons are not able to route to that respective social media account.<br>o The button to view more details about freelancer profile is missing or not workable. Unable to click to view more details.|
|Listing|Search|As user, I want to be able to quickly search using some keywords such as name of freelancer or type of service/past portfolio so that I can quickly filter and save time not to go through each individual list.|Search input bar on the top of application together with the navbar.<br>o It must be able to type in key words into search input and display search result accordingly.<br>o The system must setup to find match those key words in freelancer profile (name, bio, showcase, portfolio, description, reviews)|o Search input bar is not appeared on the top of the application in the navbar.<br>o Unable to type key words into the search input or not to display the result.<br>o The system are fail to match the finding of those key words in freelancer profile (name, bio, showcase, portfolio, description, reviews).|
|Listing|Filter Search|As user, I want to be able to filter the search range by rate that suit my budget so that I can quickly see how many choices do I have.|o The filtering search options as the drop-down list must be available for selection.<br>o The filtering lists must have a choice of selection by service type, the specialization and filter by rate range such as lesser than $50, between $50-100 or more than $100.<br>o When the filter is applied, the list of freelancer profiles that being displayed or render are according to the filter criteria.|o The filter search options are not available or drop-down lists are missing not no value displayed.<br>o	No filtering choices or some of the filtering choice options are missing.<br>o Unable to filter by rate range.<br>o When filtering is applied, the number of freelancers being rendering incorrectly, wrong matching an not according to the filter criteria.|

## Testing 

Refer to the attach for step-by-step instructions for the following fields below: 

* Search and Filter 
* Create account and profile 
* Login 
* Update profile 
* Change password 
* Delete account 
* Submit feedback form 

## Future development features

**Login**

* To implement registration confirmation via link sent to registered email address
* To implement user/password reset (authentication through URL sent to registered email address)
* Implement federated login (Gmail, Facebook, Instagram, Tiktok).

**Profile** 

* To implement dashboard summary (comment / rating / engagement).
* Portfolio: to implement the comment based on each portfolio rather than as a whole profile. 

## References

* Device simulator application
  * http://www.responsinator.com/

* Color schemes generator
  * https://coolors.co/

* Images are from: 
  * https://unsplash.com/photos
  * https://www.pexels.com/search
